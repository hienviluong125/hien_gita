function handleZoomOutImage() {
  $("img[data-enlargeable]")
    .addClass("img-enlargeable")
    .click(function () {
      var src = $(this).attr("src");
      var modal;

      function removeModal() {
        modal.remove();
        $("body").off("keyup.modal-close");
      }
      modal = $("<div>")
        .css({
          background: "RGBA(0,0,0,.5) url(" + src + ") no-repeat center",
          backgroundSize: "contain",
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: "10000",
          top: "0",
          left: "0",
          cursor: "zoom-out",
        })
        .click(function () {
          removeModal();
        })
        .appendTo("body");
      //handling ESC
      $("body").on("keyup.modal-close", function (e) {
        if (e.key === "Escape") {
          removeModal();
        }
      });
    });
}

function handleAvatarSlider() {
  let clientCarousel = $("#avatar-slider");

  clientCarousel.owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    items: 5,
    URLhashListener: true,
    startPosition: "rating-1",
    mouseDrag: false,
  });

  outsideItem();
  besideItem();

  clientCarousel.on("change.owl.carousel", function () {
    let activeClass = "#avatar-slider .owl-item.active";
    $(activeClass).find("img").addClass("changing");
  });

  clientCarousel.on("changed.owl.carousel", function () {
    setTimeout(function () {
      let activeClass = "#avatar-slider .owl-item.active";
      let centerEl = $(activeClass).eq(2);
      let centerId = centerEl.find("div").attr("id");

      $(activeClass).find("img").removeClass("changing");
      $(".owl-item").find("img").removeClass("center");
      centerEl.find("img").addClass("center");
      outsideItem();
      besideItem();

      location.hash = "rating-" + centerId;
    }, 500);
  });

  function outsideItem() {
    let activeClass = "#avatar-slider .owl-item.active";
    let firstEl = $(activeClass).eq(0).find("img");
    let lastEl = $(activeClass).eq(4).find("img");
    $(".owl-item").find("img").removeClass("outside");

    firstEl.addClass("outside");
    lastEl.addClass("outside");
  }

  function besideItem() {
    let activeClass = "#avatar-slider .owl-item.active";
    let firstEl = $(activeClass).eq(1).find("img");
    let lastEl = $(activeClass).eq(3).find("img");

    $(".owl-item").find("img").removeClass("beside");

    firstEl.addClass("beside");
    lastEl.addClass("beside");
  }
}

function handleContentSlider() {
  let contentCarousel = $("#rating-slider");

  contentCarousel.owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    items: 1,
    URLhashListener: true,
    startPosition: "rating-1",
    mouseDrag: false,
    dots: false,
  });
}

function handleInfoSlider() {
  let infoCarousel = $("#info-slider");

  infoCarousel.owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    items: 1,
    URLhashListener: true,
    startPosition: "rating-1",
    mouseDrag: false,
    dots: false,
  });
}

function main() {
  handleZoomOutImage();
  handleContentSlider();
  handleAvatarSlider();
  handleInfoSlider();
}
main();
