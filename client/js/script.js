const imageInput = document.querySelector('#fileInput');
const dropZone = document.querySelector('#drop-zone');
const preview = document.querySelector('#preview');
let uploadedFiles = [];


// Drag & Drop
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length > 0) handleFiles(files);
});


function handleFiles(files) {
    uploadedFiles = Array.from(files);
    preview.innerHTML = "";

    uploadedFiles.forEach(file => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const img = document.createElement("img");
            img.src = reader.result;
            preview.appendChild(img);
        });
        reader.readAsDataURL(file);
    });

    preview.classList.add("visible");
}

imageInput.addEventListener("change", function() {
    handleFiles(this.files);
});


function sendData() {
    if (uploadedFiles.length === 0) {
        console.log("Kein Bild ausgewählt!");
        return;
    }

    const formData = new FormData();
    uploadedFiles.forEach(file => {
        formData.append("bilder", file);
    });

    fetch("/image/upload", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(response => console.log(response));
}
