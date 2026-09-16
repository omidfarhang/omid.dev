---
title: 'Mastering Concurrency in Rust: Tokio Structured Concurrency and Async Patterns'
date: 2024-06-15T18:12:21+03:30
lastmod: 2026-09-16T15:48:00+03:30
description: "tokio::spawn detaches work. Structured concurrency in Tokio means owning that work with JoinSet, join!/select!, and cooperative cancellation so tasks cannot outlive the scope that started them."
layout: single
author_profile: true
url: 2024/06/15/mastering-concurrency-in-rust/
shortlink: https://g.omid.dev/XrIzoQD
keywords:
  - rust structured concurrency
  - tokio JoinSet
  - tokio spawn vs JoinSet
  - tokio cancellation
  - rust async await
tags:
  - Rust
  - Tokio
categories:
  - TechBlog
seeAlso:
  - /2024/06/13/building-high-performance-web-applications-leveraging-webassembly-and-rust/
---

`tokio::spawn` looks like structured concurrency. It is not.

You get a `JoinHandle`. If you await it, you wait for that one task. If you drop it, the task keeps running on the runtime. If the function that spawned it returns, the work is still there. That is unstructured concurrency: the child is not owned by the scope that created it.

Structured concurrency is the opposite rule. Child tasks belong to a scope. Leaving the scope waits for them or cancels them. Tokio does not give you Kotlin-style `coroutineScope`, but it does give you the pieces: `JoinSet` (abort-on-drop), `join!` / `try_join!` / `select!` for futures in the current task, and `CancellationToken` when abort is too blunt.

```mermaid {caption="tokio::spawn detaches a task onto the runtime. JoinSet keeps those tasks owned by the caller, so leaving the scope waits for them or aborts them."}
flowchart TD
  spawnCaller[Caller] -->|tokio::spawn| detached[Task on runtime]
  spawnCaller -->|returns without join| leaked[Task keeps running]
  setCaller[Caller] -->|JoinSet::spawn| owned[Task in JoinSet]
  setCaller -->|drop or shutdown| aborted[Remaining tasks aborted]
```

## Spawn detaches. Dropping the handle does not cancel.

This is the failure mode that tutorial `spawn` + `await` samples hide:

```rust
use tokio::time::{sleep, Duration};

async fn kick_off() {
    let _handle = tokio::spawn(async {
        sleep(Duration::from_secs(10)).await;
        println!("still running after kick_off returned");
    });
    // Dropping `_handle` does not abort the task.
}

#[tokio::main]
async fn main() {
    kick_off().await;
    sleep(Duration::from_millis(50)).await;
    println!("main is still here; so is the background task");
}
```

The task is on the runtime, not in `kick_off`. Rust’s ownership model will not save you here: `JoinHandle` does not own the work the way a `JoinSet` does. When `main` finally returns, the runtime shuts down and leftover tasks get aborted. That is process teardown, not a scope.

Awaiting one handle is the minimum join, and it is still not a scope:

```rust
let handle = tokio::spawn(fetch_one());
let result = handle.await.unwrap();
```

Two siblings make the hole obvious. If the first handle fails and you `return` before awaiting the second, the second task keeps running. If the parent is cancelled by `select!`, dropping the handles does not abort the children. A panic in the parent does not abort them either. You have to `abort()` each handle, or put the tasks in something that aborts on drop.

{{< alert type="warning" title="JoinHandle is not a scope" >}}
`handle.await` waits for one task. It does not bind siblings, does not cancel on early return, and does not cancel when the parent is dropped. Treat a bare `spawn` as “this may outlive me.”
{{< /alert >}}

## JoinSet is the scope Tokio actually has

[`JoinSet`](https://docs.rs/tokio/latest/tokio/task/struct.JoinSet.html) is a collection of tasks spawned on the runtime. You insert with `spawn`, you collect results in completion order with `join_next`, and **dropping the set immediately aborts every task still in it**. That abort-on-drop is the structured part.

```rust
use tokio::task::JoinSet;
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let mut set = JoinSet::new();

    for i in 0..5u64 {
        set.spawn(async move {
            sleep(Duration::from_millis(40 * i)).await;
            i
        });
    }

    while let Some(res) = set.join_next().await {
        println!("finished: {}", res.unwrap());
    }
}
```

`join_next` is cancel-safe: if you use it as a `select!` branch and another branch wins, no completed task is lost from the set.

Leaving the set without draining it is the other half of the contract:

```rust
async fn fan_out_then_give_up() {
    let mut set = JoinSet::new();
    set.spawn(sleep(Duration::from_secs(10)));
    set.spawn(sleep(Duration::from_secs(10)));
    // No join. Dropping `set` aborts both tasks immediately.
}
```

`shutdown().await` is the explicit version of the same idea: abort everything still in the set, then wait until those aborts have finished. Use it when the caller needs the tasks gone *before* the next line runs.

`detach_all()` is the escape hatch. It removes the tasks from the set without aborting them. After that, drop is a no-op and you are back to unstructured spawn. Call it only when you mean “these should outlive this scope.”

{{< alert type="tip" title="Abort is not a kill -9" >}}
Tokio cancels a task by dropping its future at the next `.await`. A tight CPU loop with no await will not stop. For that work, `spawn_blocking` plus your own cooperative check, or do not spawn it in the first place.
{{< /alert >}}

## `join!`, `try_join!`, and `select!` are scopes for futures, not for spawned tasks

These macros structure **futures in the current task**. They drop the futures they are no longer waiting on, and dropping a future cancels it. That is structured concurrency. It is not the same as spawning.

`join!` waits for every branch.

`try_join!` waits for every branch and, on the first error, drops the rest so they cancel:

```rust
async fn load_page() -> Result<Page, FetchError> {
    let (user, feed) = tokio::try_join!(fetch_user(), fetch_feed())?;
    Ok(Page { user, feed })
}
```

If `fetch_user()` fails, `fetch_feed()` is cancelled. Both futures ran in the caller. No detached tasks.

`select!` races branches and cancels the losers by dropping them:

```rust
tokio::select! {
    result = fetch_user() => handle(result),
    _ = tokio::time::sleep(Duration::from_secs(2)) => {
        return Err(FetchError::Timeout);
    }
}
```

The trap is mixing this with `spawn`. `select!` on two `JoinHandle`s cancels the *await*, not the *tasks*. Dropping a `JoinHandle` does not abort. If you race spawned work, abort the losers yourself or keep them in a `JoinSet` and `shutdown()` the set.

```rust
// Wrong: the other task keeps running.
tokio::select! {
    a = handle_a => a,
    b = handle_b => b,
}

// Right: the set owns both; dropping it aborts the loser.
let mut set = JoinSet::new();
set.spawn(fetch_a());
set.spawn(fetch_b());
let winner = set.join_next().await;
drop(set);
```

## Abort vs cooperative shutdown

Abort is the right default when the leftover work is cheap to throw away: an in-flight read, a speculative fetch, a timeout. The task is dropped at `.await`. It does not get a chance to flush a buffer or send a goodbye on a socket.

When cleanup matters, signal the workers and wait. [`CancellationToken`](https://docs.rs/tokio-util/latest/tokio_util/sync/struct.CancellationToken.html) from `tokio-util` is the usual signal (`tokio-util = "0.7"`). Clone the token into each task. `cancel()` notifies every clone. Tasks observe `cancelled()` in a `select!`, do their cleanup, and return.

```rust
use std::time::Duration;
use tokio::time::sleep;
use tokio_util::sync::CancellationToken;

#[tokio::main]
async fn main() {
    let token = CancellationToken::new();
    let worker_token = token.clone();

    let worker = tokio::spawn(async move {
        loop {
            tokio::select! {
                _ = worker_token.cancelled() => {
                    // flush, close, then return
                    break;
                }
                _ = sleep(Duration::from_millis(100)) => {
                    // one unit of work
                }
            }
        }
    });

    sleep(Duration::from_secs(1)).await;
    token.cancel();
    worker.await.unwrap();
}
```

That snippet still uses a bare `spawn`. The token is the shutdown protocol; it is not a scope. Pair it with a `JoinSet` if abort-on-drop is acceptable after the signal, or with [`TaskTracker`](https://docs.rs/tokio-util/latest/tokio_util/task/struct.TaskTracker.html) when it is not.

`TaskTracker` exists for the case `JoinSet` gets wrong: a long-running service that keeps spawning, must not abort on drop, and must not accumulate join results in memory. Dropping a `TaskTracker` does **not** abort its tasks. You `cancel()` a token, `close()` the tracker, then `wait().await`. Use it for graceful process shutdown. Use `JoinSet` for a bounded fan-out that should die with the caller.

## Shared state last

Channels first. If tasks are a pipeline, `tokio::sync::mpsc` is the ownership boundary: the producer owns sending, the consumer owns the values. You do not need a mutex to pass data along.

Use `tokio::sync::Mutex` when several tasks must mutate the same in-memory value and a channel would be a worse fit. Hold the lock only for the mutation. Do not `.await` on I/O while you still hold the guard — every other task that needs the lock will stall until that I/O finishes.

```rust
use std::sync::Arc;
use tokio::sync::Mutex;

async fn bump(counter: Arc<Mutex<u64>>) {
    {
        let mut n = counter.lock().await;
        *n += 1;
    }
    persist().await; // lock is already dropped
}
```

CPU-bound work does not belong on the async worker threads. `tokio::task::spawn_blocking` moves it off the runtime. If that blocking work must be cancellable, it needs its own cooperative check; aborting the `JoinHandle` will not interrupt a `std` loop that never awaits.

## A deadline over a fan-out

This is the pattern the rest of the post has been building: spawn a bounded set of I/O jobs, collect whatever finishes before a deadline, abort the rest, then continue. No HTTP stack. No leftover tasks.

```toml
[dependencies]
tokio = { version = "1", features = ["rt-multi-thread", "macros", "time"] }
```

```rust
use std::time::Duration;
use tokio::task::JoinSet;
use tokio::time::sleep;

#[tokio::main]
async fn main() {
    let jobs = [
        ("users", 20_u64),
        ("orders", 40),
        ("inventory", 120),
        ("recommendations", 200),
    ];

    let mut set = JoinSet::new();
    for (name, delay_ms) in jobs {
        set.spawn(async move {
            sleep(Duration::from_millis(delay_ms)).await;
            name
        });
    }

    let deadline = sleep(Duration::from_millis(80));
    tokio::pin!(deadline);

    let mut completed = Vec::new();
    loop {
        tokio::select! {
            _ = &mut deadline => {
                set.shutdown().await;
                break;
            }
            next = set.join_next() => {
                match next {
                    Some(Ok(name)) => completed.push(name),
                    Some(Err(err)) => eprintln!("task failed: {err}"),
                    None => break,
                }
            }
        }
    }

    println!("completed before deadline: {completed:?}");
}
```

With those delays, `users` and `orders` make the deadline. `inventory` and `recommendations` are aborted by `shutdown()`. If every job finishes early, `join_next` returns `None` and you never hit the deadline branch.

That is structured concurrency in Tokio: the tasks are owned by `set`, the race is owned by `select!`, and leaving the loop does not leak work onto the runtime.

## Further reading

- [JoinSet](https://docs.rs/tokio/latest/tokio/task/struct.JoinSet.html) — abort-on-drop, `join_next`, `shutdown`, `detach_all`
- [Graceful shutdown](https://tokio.rs/tokio/topics/shutdown) — `CancellationToken` and waiting for workers
- [The Rust Async Book](https://rust-lang.github.io/async-book/) — futures, cancellation, and why `.await` is the yield point

## Conclusion

Do not treat `tokio::spawn` as a scope. It detaches work. Await a `JoinHandle` when you have exactly one child and you will not return early. For a dynamic set, put the tasks in a `JoinSet` so drop or `shutdown()` aborts what you did not collect. Use `join!` / `try_join!` / `select!` for futures in the current task, and remember that racing `JoinHandle`s does not cancel the losers. When abort is too blunt, cancel cooperatively and wait.

The runtime will run whatever you detach. Structured concurrency is the habit of not detaching anything you cannot afford to leak.
