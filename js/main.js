let imageIndexArray = new Array();

const numOfImages = 15;
const timeout = 6660;
const images = document.querySelector("figure").children;

window.onload = main;

function main() {
  // Add click event to under-construction banner to make it disappear when clicked
  document.getElementById("underConstruction").addEventListener(
    "click",
    event => {
      event.currentTarget.style.display = "none";
    },
    { passive: true }
  );

  // Start gallery showcase animations
  setInterval(() => startAnimation(images[0]), timeout);
  setInterval(() => startAnimation(images[1]), timeout + 666);
  setInterval(() => startAnimation(images[2]), timeout + 666 * 2);
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

function getImageSource(index) {
  return `img/showcase-${index}.jpg`;
}

function startAnimation(image) {
  image.className = "imgDisappear";
  image.addEventListener("animationend", imageDisappeared, { passive: true });
}

function imageDisappeared(event) {
  event.target.removeEventListener("animationend", imageDisappeared);
  event.target.className = "imgInvisible";
  event.target.src = getRandomImage();
  event.target.addEventListener("load", imageLoaded, { passive: true });
}

function imageLoaded(event) {
  event.target.removeEventListener("load", imageLoaded);
  event.target.className = "imgAppear";
}
