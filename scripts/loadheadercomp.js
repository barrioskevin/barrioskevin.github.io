document.addEventListener("DOMContentLoaded", () => {
  fetch("../comps/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-component").innerHTML = data;
    })
    .catch((error) => console.log("error loading header component"));
});
