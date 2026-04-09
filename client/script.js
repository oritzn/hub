const imageInput = document.querySelector('#fileInput');
let uploadedImage = ""

imageInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
        const preview = document.querySelector("#preview");
        preview.style.backgroundImage = `url(${uploadedImage})`;
        preview.classList.add("visible");
    });
    reader.readAsDataURL(this.files[0]);
})


// script.js
function sendData() {
    const formData = new FormData();
    formData.append("bild", uploadedImage);

    //Sendet Daten an server
    fetch("/image/upload", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(response => console.log(response));
}