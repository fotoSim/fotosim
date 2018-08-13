let imageIndex = 0;
const numOfImages = 15;
const timeout = 10000;

let figure = document.querySelector("figure");
let images = figure.children;
let imageIndexArray = new Array();

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

  // Start gallery showcase animation immediately
  startAnimation();
}

function getImageSource(index) {
  return `img/showcase-${index}.jpg`;
}

function getNextImage() {
  let imageSrc = getImageSource(imageIndex);
  imageIndex = (imageIndex + 1) % numOfImages;
  return imageSrc;
}

function getRandomImage() {
  // If image index array is empty, fill it with integers 0..numOfImages
  if (imageIndexArray.length == 0) {
    for (let i = 0; i < numOfImages; i++) {
      imageIndexArray.push(i);
    }
  }

  // Get a random index into the imageIndexArray and get the integer there
  const randomIndex = Math.floor(Math.random() * imageIndexArray.length);
  const index = imageIndexArray[randomIndex];

  // Filter imageIndexArray to remove chosen index
  imageIndexArray = imageIndexArray.filter(element => element != index);

  // return filename for random index
  return getImageSource(index);
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
  images[0].src = getRandomImage(); // getNextImage();
  images[1].src = getRandomImage(); // getNextImage();
  images[2].src = getRandomImage(); // getNextImage();

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
