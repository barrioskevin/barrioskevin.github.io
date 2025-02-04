document.addEventListener("DOMContentLoaded", () => {
  fetch("../projects/proheader.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch((error) => console.log("error loading reuse header"));
});
