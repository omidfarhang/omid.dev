---
title: 'Chaos Engineering for Backend and Infrastructure'
date: 2024-07-07T10:00:00+03:30
lastmod: 2026-06-24T18:00:00+03:30
description: "Run backend chaos experiments with steady-state hypotheses, failure domains from pods to queues, Chaos Mesh and Toxiproxy walkthroughs, SLO measurement, and CI automation."
layout: single
author_profile: true
url: 2024/07/07/chaos-engineering-backend-and-infrastructure/
shortlink: https://g.omid.dev/UhhOJIL
tags:
  - Chaos Engineering
  - System Resilience
  - Failure Testing
  - DevOps
  - Site Reliability Engineering
  - Software Robustness
  - Reliability Testing
  - Software Architecture

categories:
  - TechBlog
series:
  id: chaos-engineering
  title: "Chaos Engineering"
  order: 2
  label: "Chaos Engineering for Backend and Infrastructure"
  role: part
---
Backend chaos engineering assumes you control the runtime — VMs, containers, networks, managed databases — which makes fault injection precise. You choose exactly which pod, zone, or dependency to disrupt. This guide covers steady state for microservices, failure domains from compute to messaging, resilience patterns to validate, Chaos Mesh and Toxiproxy walkthroughs, SLO measurement, CI automation, game-day execution, and tooling.

If you are new to the discipline, start with [Chaos Engineering: Principles and Practice](/2024/06/06/chaos-engineering/) for the experiment loop, blast-radius controls, and game-day concepts. For how the same mindset applies in the browser, see [Chaos Engineering for Frontend Applications](/2024/07/01/chaos-engineering-in-frontend-development/).

{{< companion
  repo="omidfarhang/example-projects"
  path="chaos-resilience-lab"
  demoSlug="chaos-resilience-lab"
  description="Inject payment faults and watch fragile vs resilient checkout side by side — the user-visible outcome of backend failures."
>}}

The companion lab includes an optional docker-compose stack with Toxiproxy for injecting latency on real HTTP services without Kubernetes.

## Defining Steady State for Backend Services

Before injecting any failure, establish what "normal" looks like. Steady state is a set of measurable signals that indicate healthy operation — not merely "the service responds to health checks."

For a typical microservice, steady state might include:

- **Latency**: p50 and p99 request duration within SLO budget (e.g., checkout API p99 under 500 ms)
- **Throughput**: requests per second within expected range for current traffic
- **Error rate**: HTTP 5xx and business-level failures below a threshold (e.g., under 0.1%)
- **Saturation**: CPU, memory, connection pool, and queue depth within safe bounds
- **Downstream health**: dependency call success rates and circuit-breaker state

Instrument these in your observability stack before the experiment starts. Prometheus metrics, distributed traces in Jaeger or Tempo, and structured logs with correlation IDs give you the baseline to compare against during and after fault injection. An experiment without pre-existing metrics produces anecdotes, not evidence.

Every backend experiment follows the [chaos engineering loop](/2024/06/06/chaos-engineering/#the-chaos-engineering-loop). A backend-specific hypothesis might read: "When one of three payment-service pods is terminated, the remaining replicas handle traffic within 10 seconds, checkout p99 latency stays below 800 ms, and the error rate stays below 0.5%."

## Failure Domains in Practice

Backend chaos experiments are organized by what you break. Each domain below describes what to test, why it matters, and how teams typically inject it.

### Compute and Instance Failures

The simplest experiment is also the most revealing: kill a running instance and watch what happens. Netflix built an entire culture around this with Chaos Monkey. In Kubernetes, the equivalent is deleting a pod and verifying the ReplicaSet recovers, load balancers drain gracefully, and in-flight requests complete or retry correctly.

The hypothesis should cover more than "a new pod starts." Check whether clients retry aggressively enough to cause a thundering herd, whether session affinity breaks user flows, and whether your autoscaling reacts to the brief capacity drop or overcompensates afterward.

### Network Failures

Network chaos exposes assumptions hidden in happy-path development. Inject latency, packet loss, or complete partitions between services. A catalog API that works at 5 ms may cascade failures across the stack at 500 ms if callers lack timeouts and circuit breakers.

In Kubernetes, Chaos Mesh `NetworkChaos` resources target traffic between specific pods:

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: checkout-to-payment-delay
  namespace: production
spec:
  action: delay
  mode: all
  selector:
    labelSelectors:
      app: checkout-api
  target:
    selector:
      labelSelectors:
        app: payment-service
    mode: all
  delay:
    latency: "500ms"
    jitter: "100ms"
  duration: "3m"
```

Run this in staging first. Assert that checkout returns within your timeout budget, that circuit breakers open when payment latency exceeds threshold, and that users see a clear degraded response rather than a hung request.

### Dependency and Datastore Failures

Most outages are dependency outages. Simulate primary database failover, read-replica lag, cache unavailability, or a third-party API returning intermittent 503 responses.

The experiment succeeds when the service degrades predictably: reads fall back to cache, writes queue for retry, or the API returns a structured error with a retry-after header. It fails when the service blocks all threads waiting on the dead dependency, returns corrupt data from a stale cache, or enters a retry storm that takes down the dependency's remaining capacity.

### Resource Exhaustion

CPU throttling, memory pressure, and disk I/O saturation mimic real production conditions that load tests often miss because they ramp traffic uniformly. A memory leak that takes hours to manifest will not appear in a fifteen-minute load test, but a controlled memory stress experiment on one pod might reveal OOMKill behavior and whether your orchestrator reschedules cleanly.

Gremlin and similar platforms inject host-level resource stress. In Kubernetes, `StressChaos` in Chaos Mesh fills memory or burns CPU on selected pods. Watch whether HPA scales out, whether liveness probes correctly restart unhealthy pods, and whether noisy-neighbor effects spill into co-located workloads.

### Messaging and Queue Failures

Event-driven backends fail differently from request/response APIs. A slow consumer does not always show up as HTTP 5xx — it shows up as growing queue depth, poison messages, and consumers stuck in retry loops.

Experiments worth running:

- **Broker loss** — terminate one Kafka broker or RabbitMQ node and verify producers buffer, consumers reconnect, and no messages are silently dropped
- **Consumer lag** — throttle a downstream service so consumers fall behind; verify backpressure, dead-letter queues, and alerting before lag hits days
- **Duplicate delivery** — replay a partition or force at-least-once redelivery; verify idempotent handlers and deduplication keys
- **Schema or format mismatch** — publish a malformed event to a staging topic; verify the consumer rejects, quarantines, or routes to DLQ instead of crash-looping

Hypothesis example: "When one of three Kafka brokers is unavailable for two minutes, checkout-event consumers lag by no more than 30 seconds and no order events are lost."

### DNS, Service Discovery, and Configuration Drift

Not every outage is a dead pod. Stale DNS records, misconfigured service mesh routes, and wrong connection strings produce failures that look like application bugs.

Test whether services survive:

- **DNS resolution delay or failure** — block or slow lookups to a dependency hostname
- **Wrong endpoint in config** — point a staging service at a read-only replica and verify writes fail safely
- **Certificate expiry or mTLS misconfiguration** — rotate certs during an experiment window and verify graceful reconnect, not silent TLS failures in logs only
- **Feature flag or config reload mid-traffic** — flip a timeout or pool size while load is running; verify hot reload does not drain connection pools incorrectly

These experiments expose gaps that pod-kill tests miss entirely.

### Deployment and Rollout Chaos

Failures often arrive during change, not steady state. Combine chaos with deployment mechanics:

- Run a **rolling update** while injecting network latency to the old version's pods — do in-flight requests drain cleanly?
- Trigger a **failed readiness probe** on new pods — does the rollout pause instead of routing traffic to half-started instances?
- Kill a pod **during** a database migration job — does the migration resume, roll back, or leave schema half-applied?

The hypothesis should include deployment state: "During a rolling restart of checkout-api, p99 latency stays below 1 s and no 5xx spike exceeds 0.5% for the duration."

## Resilience Patterns to Validate Under Fault

Chaos engineering is how you prove that resilience patterns actually work — not just that they exist in a diagram.

| Pattern | What chaos should prove |
| --- | --- |
| **Timeouts** | A slow dependency does not hold threads or connections indefinitely; callers fail fast within budget |
| **Retries with backoff** | Transient failures recover without thundering herd on the recovering service |
| **Circuit breaker** | After error threshold, calls fail fast locally; half-open probes restore traffic gradually |
| **Bulkhead** | Failure in one pool (e.g., payment calls) does not exhaust threads for unrelated work (e.g., catalog reads) |
| **Fallback / cache** | Degraded reads return stale-but-safe data or a structured "unavailable" response |
| **Idempotency** | Duplicate requests from client retries or message redelivery do not double-charge or double-write |

When an experiment fails, map the surprise to a missing or misconfigured pattern. "Checkout hung for 45 seconds" usually means no timeout or a timeout longer than the load balancer's. "Payment service recovered but error rate stayed elevated" often means retries without jitter overloaded it during recovery.

## A Walkthrough: Pod Failure with Chaos Mesh

The following example walks through a complete experiment — hypothesis through re-run — against a payment service running in Kubernetes.

**Hypothesis:** Terminating one payment-service pod for 30 seconds does not increase checkout error rate above 0.5% or p99 latency above 800 ms.

**Prerequisites:** Prometheus scraping `http_request_duration_seconds` and `http_requests_total` for checkout-api and payment-service. An alert or dashboard panel showing current p99 and error rate.

**Experiment manifest:**

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: payment-pod-kill
  namespace: staging
spec:
  action: pod-kill
  mode: one
  duration: "30s"
  selector:
    namespaces:
      - staging
    labelSelectors:
      app: payment-service
```

Apply the manifest, generate checkout traffic with a load tool (k6, Locust, or your existing synthetic monitors), and watch metrics for the experiment window. Record whether Kubernetes rescheduled the pod within your pod-disruption budget, whether checkout-api retried successfully, and whether any alerts fired.

If error rate spiked because checkout-api retried without backoff, add exponential backoff and a circuit breaker, then re-run the same experiment. The loop closes when the hypothesis holds under the same fault.

LitmusChaos follows a similar model with pre-built experiments (`pod-delete`, `network-latency`, `disk-fill`) that integrate with CI pipelines and emit structured results for pass/fail gates.

## A Walkthrough: HTTP Fault Injection with Toxiproxy

You do not need Kubernetes to run meaningful backend chaos. [Toxiproxy](https://github.com/Shopify/toxiproxy) sits between services and injects latency, timeouts, and connection resets on TCP routes — ideal for local stacks and CI jobs without a cluster.

The [chaos-resilience-lab](https://github.com/omidfarhang/example-projects/tree/master/examples/chaos-resilience-lab) companion includes a docker-compose stack: a checkout API proxies to a payment API through Toxiproxy. Start it with `npm run docker:up` and apply the proxy setup script, then inject latency on the payment route:

```bash
curl -X POST http://localhost:8474/proxies/payment/toxics \
  -H 'Content-Type: application/json' \
  -d '{"name":"latency","type":"latency","attributes":{"latency":3000,"jitter":0}}'
```

**Hypothesis:** Adding 3 s latency on the payment path does not cause checkout-api to exceed its upstream timeout; clients receive a structured error or degraded response within 5 s.

Generate traffic against `http://localhost:3000/api/payment` and watch checkout-api logs and metrics. If the BFF blocks until the payment service completes, you have found a missing timeout or missing circuit breaker — the same class of bug Chaos Mesh would surface in Kubernetes, without kubectl in the loop.

Other Toxiproxy toxics worth scripting: `timeout` (connection hangs), `reset_peer` (RST mid-request), and `limit_data` (partial response). Remove toxics after each experiment so the next run starts clean.

## Observability During Experiments

Chaos experiments are worthless without measurement. Before your first game day, verify you can answer these questions from dashboards alone:

- Which service broke first when the fault was injected downstream?
- How long until steady-state metrics returned to baseline?
- Did the failure propagate across service boundaries or stay contained?
- Were alerts actionable, or did they fire after users already noticed?

Distributed tracing is especially valuable. A trace that spans checkout-api → payment-service → postgres shows exactly where latency accumulated when you injected network delay. Without traces, you are guessing from aggregate metrics.

Define abort criteria before the experiment starts and wire automated halt hooks — Chaos Mesh deadlines, Gremlin halt conditions, or a human on call with kubectl delete access. See [blast radius and game days](/2024/06/06/chaos-engineering/#blast-radius-and-production-game-days) for how to scope production experiments safely.

### Measuring Experiments Against SLOs

Tie every experiment to an SLO you already track — otherwise "success" is subjective.

| Signal | Example steady-state target | Example abort threshold |
| --- | --- | --- |
| Checkout p99 latency | < 500 ms | > 2 s for 60 s |
| HTTP 5xx rate | < 0.1% | > 2% for 60 s |
| Payment dependency error rate | < 0.5% | > 5% for 30 s |
| Kafka consumer lag | < 1 min | > 10 min |

Record error-budget burn during the experiment window. A passing hypothesis might still be unacceptable if it consumed a week's budget in five minutes — that informs whether the degradation mode is safe enough for production traffic during real incidents.

Annotate dashboards and traces with experiment start/end timestamps. Without annotations, on-call engineers cannot distinguish chaos from a real outage — and post-mortems become arguments about correlation.

### An Experiment Log Template

Document each run in a shared log (Notion, GitHub issue, or markdown in the repo):

```
Experiment: payment-pod-kill-staging-2024-07-15
Hypothesis: One pod kill does not raise checkout 5xx above 0.5%
Scope: staging / payment-service / 30 s / single pod
Steady state before: p99 210 ms, 5xx 0.02%
Observed: p99 spiked to 1.2 s at T+8 s; 5xx 0.8% for 22 s
Root cause: checkout-api retried 5× with no backoff
Fix: exponential backoff + circuit breaker PR #482
Re-run result: PASS — p99 380 ms max, 5xx 0.04%
```

This log becomes the resilience playbook the anchor post describes — searchable evidence, not tribal knowledge.

## Automating Chaos in CI and Staging Pipelines

Experiments that run only during quarterly game days rot quickly. Automate recurring chaos in staging as part of CI/CD.

A practical pattern: spin up a disposable Kubernetes cluster (kind, k3d, or a dedicated staging namespace), deploy the application under test, run smoke tests to establish steady state, apply a Chaos Mesh or Litmus experiment manifest, re-run smoke tests, and fail the pipeline if error rate or latency exceeds threshold.

```yaml
# Simplified GitHub Actions sketch
jobs:
  chaos-resilience:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start kind cluster
        run: kind create cluster --config kind.yaml
      - name: Deploy application
        run: kubectl apply -k deploy/staging/
      - name: Wait for ready
        run: kubectl wait --for=condition=available deployment --all --timeout=120s
      - name: Baseline smoke test
        run: k6 run tests/smoke.js
      - name: Inject pod failure
        run: kubectl apply -f chaos/pod-kill.yaml && sleep 45
      - name: Resilience smoke test
        run: k6 run tests/smoke.js --env MAX_ERROR_RATE=0.01
      - name: Cleanup
        if: always()
        run: kind delete cluster
```

Not every experiment belongs in CI — resource exhaustion and multi-service partitions are better suited to scheduled staging runs with human oversight. But pod-kill and network-delay tests against critical paths catch regressions in retry logic and timeout configuration on every merge.

### What Belongs in CI vs Scheduled Runs

| Experiment type | CI on every PR | Nightly / weekly staging | Production game day |
| --- | --- | --- | --- |
| Single pod kill | ✓ | ✓ | ✓ (scoped) |
| Network delay between two services | ✓ | ✓ | ✓ (scoped) |
| Dependency 503 simulation | ✓ | ✓ | Rarely |
| Memory / CPU stress | ✗ | ✓ | ✗ |
| AZ or zone failure | ✗ | ✓ | ✓ (planned) |
| Broker termination | ✗ | ✓ | ✓ (planned) |
| Database failover | ✗ | ✓ | ✓ (maintenance window) |

Keep CI experiments short, deterministic, and isolated in disposable environments. Fail the build on SLO threshold breach, archive metrics artifacts, and link the run to the experiment manifest commit SHA so you can reproduce it.

## Tools for Backend Chaos Engineering

Teams assemble a toolkit by layer rather than picking one product.

**Instance termination.** Chaos Monkey (and AWS Fault Injection Simulator for cloud-native workloads) validates that auto-scaling groups and load balancers handle instance loss. In Kubernetes, PodChaos from Chaos Mesh or Litmus `pod-delete` experiments serve the same role.

**Platform chaos.** Gremlin provides a commercial control plane for host-level and service-level faults across cloud and on-prem environments, with RBAC, scheduling, and halt buttons built in. Chaos Mesh and LitmusChaos are open-source Kubernetes-native alternatives with CRD-based experiment definitions and Grafana integration.

**Cloud provider fault injection.** AWS FIS, Azure Chaos Studio, and Google Cloud's fault injection for GKE let you terminate instances, inject API throttling, and simulate AZ failures within cloud-native guardrails.

**Observability.** Prometheus and Grafana for metrics, OpenTelemetry and Jaeger for traces, PagerDuty or Opsgenie for alert routing. Chaos tools tell you what broke; observability tells you whether it mattered.

**Local and pre-Kubernetes fault paths.** Toxiproxy for TCP-level latency and resets between HTTP services; `tc` (traffic control) on Linux for network shaping; `docker kill` and compose health-check overrides for container-level failures. Useful before the team has a staging cluster or for reproducing production traces locally.

## Backend Game Day Execution

When staging experiments pass repeatedly, a backend game day validates the full stack under human observation. Tactical checklist:

1. **Pre-brief (30 min)** — hypothesis, steady-state metrics, abort criteria, roles (injector, metrics watcher, comms), rollback commands ready
2. **Announce** — status page or internal channel: "controlled experiment in progress, not an incident"
3. **Baseline capture** — screenshot or export dashboards at T−5 min
4. **Inject** — one fault at a time; never stack unknown failures on day one
5. **Observe (experiment duration + 10 min recovery)** — traces, logs, user-facing symptoms if a canary frontend is in path
6. **Abort or complete** — halt via Chaos Mesh deadline, Gremlin button, or `kubectl delete chaos`
7. **Post-mortem (same day)** — surprises, SLO impact, tickets filed with owners; re-run date scheduled for fixes

Invite the team that owns the dependency you break — database, platform, or payments — so shared infrastructure experiments do not become cross-team surprises.

## Backend-Specific Considerations

Shared dependencies require coordination. Injecting latency into a database used by twenty teams affects more than your hypothesis scope. Run shared-infrastructure experiments in maintenance windows or dedicated test environments.

Cost and noise in non-production environments can limit fidelity. A staging cluster with one replica per service will not reveal load-balancer behavior under partial failure. Invest in staging parity proportional to the risk you are validating.

Write experiments as code — Chaos Mesh manifests, Litmus workflows, and Gremlin scenarios checked into version control are reviewable, repeatable, and diffable like application code.

## Further Reading

- [Chaos Mesh Documentation](https://chaos-mesh.org/docs/)
- [LitmusChaos Experiments](https://docs.litmuschaos.io/)
- [Chaos Engineering: Principles and Practice](/2024/06/06/chaos-engineering/) — experiment loop, blast radius, and game days
- [Chaos Engineering for Frontend Applications](/2024/07/01/chaos-engineering-in-frontend-development/) — browser-side companion

## Conclusion

Backend chaos engineering builds evidence that your services absorb slow dependencies, dead pods, partitioned networks, and exhausted resources before those failures arrive uninvited.

Start with a steady-state hypothesis on your most critical service. Kill one pod in staging, measure what happens, fix what surprises you, and re-run until the numbers hold. Automate the experiment in CI so the fix does not regress. When staging results are boring, schedule a game day with strict blast-radius controls and cross-functional observers.

The user-visible outcome of backend failures often surfaces in the browser — throttled networks, hung requests, malformed payloads. Continue with [Chaos Engineering for Frontend Applications](/2024/07/01/chaos-engineering-in-frontend-development/) for the client-side half of the same checkout journey.
