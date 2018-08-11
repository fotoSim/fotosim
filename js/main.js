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
}

function getImageSource(index) {
  return `img/showcase-${index}.jpg`;
}

function getNextImage() {
  let imageSrc = getImageSource(imageIndex);
  imageIndex++;
  imageIndex = imageIndex % numOfImages;
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
// function imgCenterDisappeared(event) {
//   imageDisappeared(event, imgCenterDisappeared);
//   nextImageToDisappear(document.getElementById("imgRight"), imgRightDisappeared);
// }

// function imgLeftDisappeared(event) {
//   imageDisappeared(event, imgLeftDisappeared);
//   nextImageToDisappear(document.getElementById("imgCenter"), imgCenterDisappeared);
// }

// function imgRightDisappeared(event) {
//   imageDisappeared(event, imgRightDisappeared);
//   nextImageToAppear(document.getElementById("imgLeft"), imgLeftAppeared);
// }

// function imgLeftAppeared(event) {
//   imageAppeared(event, imgLeftAppeared);
//   nextImageToAppear(document.getElementById("imgCenter"), imgCenterAppeared);
// }

// function imgCenterAppeared(event) {
//   imageAppeared(event, imgCenterAppeared);
//   nextImageToAppear(document.getElementById("imgRight"), imgRightAppeared);
// }

// function imgRightAppeared(event) {
//   imageAppeared(event, imgRightAppeared);
//   setTimeout(startAnimation, timeout);
// }

// function imageAppeared(event, imgFunction) {
//   event.currentTarget.classList.remove("imgAppear");
//   event.currentTarget.removeEventListener("animationend", imgFunction, false);
// }

// function imageDisappeared(event, imgFunction) {
//   event.currentTarget.style.display = "none";
//   event.currentTarget.classList.remove("imgDisappear");
//   event.currentTarget.removeEventListener("animationend", imgFunction, false);
//   event.currentTarget.src = getNextImageSource();
// }

// function nextImageToDisappear(image, imgFunction) {
//   image.addEventListener("animationend", imgFunction, { passive: true });
//   image.classList.add("imgDisappear");
// }

// function nextImageToAppear(image, imgFunction) {
//   image.addEventListener("animationend", imgFunction, { passive: true });
//   image.classList.add("imgAppear");
//   image.style.display = "block";
// }

// function startAnimation() {
//   nextImageToDisappear(document.getElementById("imgLeft"), imgLeftDisappeared);
// }
