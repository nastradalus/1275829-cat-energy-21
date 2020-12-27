/* MENU */

(function () {
  let menu = document.querySelector(".page-header__nav");
  let menuHidden = "page-header__nav--hidden";
  let menuToggle = document.querySelector(".page-header__menu-toggle");
  let menuToggleLoaded = "page-header__menu-toggle--loaded";
  let menuToggleClose = "page-header__menu-toggle--close";

  if (menu == null || menuToggle == null) return;

  menu.classList.add(menuHidden);
  menuToggle.classList.add(menuToggleLoaded);

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle(menuHidden);
    menuToggle.classList.toggle(menuToggleClose);
  });
})();


/* SHOW ALL CATALOG */

(function () {
  let productCards = document.querySelectorAll(".product-catalog__item--hidden");
  let cardDisplay = "product-catalog__item--shown";
  let cardHidden = "product-catalog__item--hidden";
  let productMoreCard = document.querySelector(".product-more");
  let productsDisplayButton = document.querySelector(".product-more__button");

  if (productCards == null || productMoreCard == null || productsDisplayButton == null) return;

  productsDisplayButton.addEventListener("click", function (event) {
    event.preventDefault();
    productCards.forEach(card => card.classList.add(cardDisplay));
    productMoreCard.classList.add(cardHidden);
  });
})();

/* BEFORE-AFTER SLIDER */

(function () {
  let slider = document.querySelector(".slider");

  if (slider == null) return;

  let sliderDrag = slider.querySelector(".slider__button-dot");
  let sliderDragBefore = "slider__button-dot--before";
  let sliderDragAfter = "slider__button-dot--after";
  let sliderTrack = slider.querySelector(".slider__progress");
  let slideBefore = slider.querySelector(".slider__item--before");
  let sliderBeforeButton = slider.querySelector(".slider__button-arrow--before");
  let sliderAfterButton = slider.querySelector(".slider__button-arrow--after");

  let showBefore = new Event("showBefore");

  sliderDrag.addEventListener("mousedown", function (event) {
    event.preventDefault();

    let shiftX = event.clientX - sliderDrag.getBoundingClientRect().left;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - sliderTrack.getBoundingClientRect().left;
      let rightEdge = sliderTrack.offsetWidth - sliderDrag.offsetWidth;
      let sliderDifference = sliderTrack.getBoundingClientRect().left - slideBefore.getBoundingClientRect().left + sliderDrag.offsetWidth / 2;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      sliderDrag.style.left = newLeft + "px";
      slideBefore.style.width = (newLeft + sliderDifference) + "px";
    }

    function onMouseUp() {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }

  });

  sliderDrag.ondragstart = function () {
    return false;
  };

  sliderBeforeButton.addEventListener("showBefore", function () {
    slideBefore.style.width = "100%";
    sliderDrag.removeAttribute("style");
    sliderDrag.classList.remove(sliderDragAfter);
    sliderDrag.classList.add(sliderDragBefore);
  });

  sliderBeforeButton.addEventListener("click", function () {
    sliderBeforeButton.dispatchEvent(showBefore);
  });

  sliderAfterButton.addEventListener("click", function () {
    slideBefore.style.width = "0%";
    sliderDrag.removeAttribute("style");
    sliderDrag.classList.remove(sliderDragBefore);
    sliderDrag.classList.add(sliderDragAfter);
  });

  window.addEventListener("resize", function () {
    if (document.documentElement.clientWidth < 768) {
      sliderBeforeButton.dispatchEvent(showBefore);
    } else {
      slideBefore.style.width = "50%";
      sliderDrag.classList.remove(sliderDragBefore);
      sliderDrag.classList.remove(sliderDragAfter);
      sliderDrag.removeAttribute("style");
    }
  })
})();
