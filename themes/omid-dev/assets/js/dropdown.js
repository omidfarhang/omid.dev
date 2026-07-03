const OPEN_CLASS = "active";

function setExpanded(dropdown, open) {
  const trigger = dropdown.querySelector(".dropdown__trigger");
  if (trigger) {
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }
}

function closeDropdown(dropdown) {
  dropdown.classList.remove(OPEN_CLASS);
  setExpanded(dropdown, false);
}

function closeAllDropdowns() {
  document.querySelectorAll(`.dropdown.${OPEN_CLASS}`).forEach(closeDropdown);
}

function openDropdown(dropdown) {
  dropdown.classList.add(OPEN_CLASS);
  setExpanded(dropdown, true);
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".dropdown__trigger");
  const dropdown = trigger?.closest(".dropdown");

  if (dropdown) {
    const wasOpen = dropdown.classList.contains(OPEN_CLASS);
    closeAllDropdowns();
    if (!wasOpen) {
      openDropdown(dropdown);
    }
    return;
  }

  document.querySelectorAll(`.dropdown.${OPEN_CLASS}`).forEach((item) => {
    if (!item.contains(event.target)) {
      closeDropdown(item);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllDropdowns();
  }
});

document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".dropdown__trigger");
  if (trigger && !trigger.hasAttribute("aria-expanded")) {
    trigger.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-native-share]").forEach((link) => {
  if (navigator.share) {
    link.hidden = false;
  }
});
