const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const yesButton = document.querySelector(".yes");
const noButton = document.querySelector(".no");

const wrapperRect = wrapper.getBoundingClientRect();
const noButtonRect = noButton.getBoundingClientRect();

// Removing the current Image
function removeImage() {
  var duduFlower = document.querySelector(".dudu-flower");
  duduFlower.style.display = "none";
}

// Replacing the image with another image
function changeImage() {
  var yesImage = document.createElement("img");
  yesImage.src = "/images/bubu-bear-kiss.gif";
  document.querySelector(".wrapper").prepend(yesImage);
}

// Change Image when clicking on "Yes"
yesButton.addEventListener("click", () => {
  question.innerHTML = "Woohoo! Thanks :)";
  document.querySelector(".yes").disabled = true;
  changeImage();
  removeImage();
});

// Can't click on "No" button
noButton.addEventListener("mouseover", () => {
  const i = Math.floor(
    Math.random() * (wrapperRect.width - noButtonRect.width) + 1
  );
  const j = Math.floor(
    Math.random() * (wrapperRect.height - noButtonRect.height) + 1
  );

  noButton.style.left = i + "px";
  noButton.style.top = j + "px";
});

// Refresh page
function refresh() {
  window.location.reload();
}
