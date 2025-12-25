export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data = await context.request.json();

    const { name, email, message } = data;

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: ["hi@omid.dev"],
        subject: `New message from ${name}`,
        reply_to: email,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
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
