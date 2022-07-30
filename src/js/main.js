window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Modal

  const btn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    closeMod = document.querySelector("[data-close]");

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  function showModalByScroll() {
    if (
      document.documentElement
        .scrollTop /* можно также воспользоваться свойством window.pageYOffset */ +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
    }
    window.removeEventListener("scroll", showModalByScroll);
  }

  btn.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  closeMod.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 5000);

  window.addEventListener("scroll", showModalByScroll);
});
