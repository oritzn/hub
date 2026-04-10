const imageInput = document.querySelector('#fileInput');
let uploadedImage = "";
let uploadedFile = null;

imageInput.addEventListener("change", function() {
    uploadedFile = this.files[0];

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
    if(!uploadedFile) {
        console.log("Kein Bild ausgewählt!");
        return;
    }

    const formData = new FormData();
    formData.append("bild", uploadedFile);

    //Sendet Daten an server
    fetch("/image/upload", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(response => console.log(response));
}