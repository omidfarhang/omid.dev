interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  RATE_LIMIT_KV: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json();

    const { name, email, message, honeypot, 'cf-turnstile-response': turnstileToken } = data;

    // 1. Honeypot check
    if (honeypot) {
      return new Response("Spam detected", { status: 400 });
    }

    // 2. Basic validation
    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const ip = context.request.headers.get('cf-connecting-ip');

    // 3. Rate Limiting (using KV if available)
    const kv = context.env.RATE_LIMIT_KV;
    if (ip && kv) {
      const key = `rate-limit:${ip}`;
      const count = await kv.get(key);
      if (count && parseInt(count) >= 5) { // Limit to 5 messages per hour
        return new Response("Too many requests. Please try again later.", { status: 429 });
      }
      await kv.put(key, (parseInt(count || '0') + 1).toString(), { expirationTtl: 3600 });
    }

    // 4. Turnstile Verification
    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return new Response("CAPTCHA required", { status: 400 });
      }

      const formData = new FormData();
      formData.append('secret', turnstileSecret);
      formData.append('response', turnstileToken);
      formData.append('remoteip', ip || '');

      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const turnstileResult: any = await turnstileRes.json();
      if (!turnstileResult.success) {
        return new Response("CAPTCHA verification failed", { status: 400 });
      }
    }

    // 5. Send Email via Resend
    const formattedMessage = message.replace(/\n/g, '<br>');

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <website@omid.dev>",
        to: ["hi@omid.dev"],
        subject: `New message from ${name}`,
        reply_to: email,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${formattedMessage}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(err, { status: 500 });
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
};
