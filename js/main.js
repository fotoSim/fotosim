let imageIndex = 0;
const numOfImages = 15;
const timeout = 5000;

let figure = document.querySelector("figure");
let images = figure.children;

window.onload = main;

function main() {
  // Add click event to under-construction banner to close it on click
  document.getElementById("underConstruction").addEventListener(
    "click",
    event => {
      event.currentTarget.style.display = "none";
    },
    { passive: true }
  );

  // Initialise gallery images
  images[0].src = getNextImage();
  images[1].src = getNextImage();
  images[2].src = getNextImage();

  // Start gallery showcase animation immediately
  startAnimation();

  // Reload page every 10 seconds
  let reloadIntervalID = window.setInterval(() => {
    location.reload(true);
  }, timeout * 3);
}

function getImageSource(index) {
  return `img/showcase-${index}.jpg`;
}

function getNextImage() {
  let imageSrc = getImageSource(imageIndex);
  imageIndex = (imageIndex + 1) % numOfImages;
  return imageSrc;
}

function startAnimation() {
  setTimeout(animationDisappear, timeout);
}

function animationDisappear() {
  images[0].className = "slideOutRight";
  images[1].className = "scaleOutWidth";
  images[2].className = "slideOutLeft";

  images[0].addEventListener("animationend", imagesDisappeared, { passive: true });
}

function imagesDisappeared() {
  images[0].src = getNextImage();
  images[1].src = getNextImage();
  images[2].src = getNextImage();

  images[0].className = "slideInRight";
  images[1].className = "scaleInWidth";
  images[2].className = "slideInLeft";

  images[0].removeEventListener("animationend", imagesDisappeared);
  images[0].addEventListener("animationend", imagesAppeared, { passive: true });
}

function imagesAppeared() {
  images[0].removeEventListener("animationend", imagesAppeared);
  startAnimation();
}
