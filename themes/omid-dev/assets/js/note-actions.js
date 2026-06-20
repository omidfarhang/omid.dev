document.querySelectorAll(".note-action--copy").forEach((button) => {
  button.addEventListener("click", () => {
    const url = button.dataset.copyUrl;
    if (!url) return;

    const done = () => {
      if (typeof showToast === "function") {
        showToast("Copied to clipboard!");
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => {});
      return;
    }

    const input = document.createElement("textarea");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      /* ignore */
    }
    document.body.removeChild(input);
  });
});
