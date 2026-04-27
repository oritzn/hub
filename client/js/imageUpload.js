const imageInput = document.querySelector('#fileInput');
const dropZone = document.querySelector('#dropZone');
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

//Bild löschen
preview.addEventListener("click", (event) => {
    if (event.target.classList.contains("deletePreviewImage")) {
        const wrapper = event.target.closest(".imagePreviewWrapper");
        const index = parseInt(wrapper.dataset.index);

        wrapper.remove();
        uploadedFiles.splice(index, 1);
    }
});

async function loadPath() {
  const response = await fetch('/image/path');
  const data = await response.json();
  
  document.getElementById("pathInput").value = data.path;
}

function handleFiles(files) {
    uploadedFiles = Array.from(files);
    preview.innerHTML = "";
    let count = 1;

    uploadedFiles.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const wrapper = document.createElement("div");

        wrapper.className = "imagePreviewWrapper";
        wrapper.dataset.index = index;

        wrapper.innerHTML = `
            <div class="deletePreviewimageWrapper">
                <img class="deletePreviewImage" src="../img/delete.png">
            </div>
            <img class="previewImage" src="${url}">
        `;
        
        // Cleanup wenn Bild entladen wird
        wrapper.querySelector(".previewImage").onload = () => {
            // optional: URL.revokeObjectURL(url) wenn du es nicht mehr brauchst
        };

        preview.appendChild(wrapper);
        count++;
    });

    preview.classList.add("visible");
}

imageInput.addEventListener("change", function() {
    handleFiles(this.files);
});


function sendData() {
    const lengthUploadedFiles = uploadedFiles.length;

    if (lengthUploadedFiles === 0) {
        console.log("Kein Bild ausgewählt!");
        return;
    }

    const path = document.getElementById("pathInput").value;

    fetch("/image/uploadPath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path })
    })
        .then(res => res.json())
        .then(response => {
            if (!response.exists) {
                alert("Pfad existiert nicht!");
                return;
            }

            const formData = new FormData();
            formData.append("path", path);
            uploadedFiles.forEach(file => {
                formData.append("bilder", file);
            });

            return fetch("/image/upload", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    clearPreview();
                    alert(response.count + " Images sent");
                });
        });
}


function clearPreview() {
    preview.innerHTML = "";
    uploadedFiles = "";
}