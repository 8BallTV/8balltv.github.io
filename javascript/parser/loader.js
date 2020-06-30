let loadingTime = 0;
let loading = false;
let loaderDOM;

export function startLoadingScreen() {
  displayLoaderDOM();
  loading = true;
  setTimeout(incrementLoadingTime, 100);
}

export function endLoadingScreen() {
  hideLoaderDOM();
  console.log("Loading finished, and took " + loadingTime / 1000 + "seconds");
  loading = false;
}

function createLoaderDOM() {
  let parentDOM = document.createElement("div");
  parentDOM.id = "loader";

  let loadingInfo = document.createElement("div");

  let text = document.createElement("span");
  text.innerHTML = "loading";
  parentDOM.appendChild(text);

  let dot1 = document.createElement("span");
  dot1.classList = "dot1";
  dot1.innerHTML = ".";
  parentDOM.appendChild(dot1);

  let dot2 = document.createElement("span");
  dot2.classList = "dot2";
  dot2.innerHTML = ".";
  parentDOM.appendChild(dot2);

  let dot3 = document.createElement("span");
  dot3.classList = "dot3";
  dot3.innerHTML = ".";
  parentDOM.appendChild(dot3);

  loaderDOM = parentDOM;

  document.body.prepend(loaderDOM);
}

function displayLoaderDOM() {
  if (!loaderDOM) {
    createLoaderDOM();
  }
  loaderDOM.style.display = "block";
}

function hideLoaderDOM() {
  loaderDOM.style.display = "none";
}

function incrementLoadingTime() {
  if (loading) {
    loadingTime += 100;
    setTimeout(incrementLoadingTime, 100);
  }
}
