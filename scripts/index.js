
var addBtn = document.getElementById("add-movie-btn");
var cancelBtn = document.getElementById("cancel-btn");
var coveringDiv = document.getElementById("add-form-container");

function callForm() {
    coveringDiv.style.display = "flex";
}
function closeForm() {
    coveringDiv.style.display = "none";
}

addBtn.addEventListener("click", callForm);
cancelBtn.addEventListener("click", closeForm);
