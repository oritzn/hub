const dropZone = document.getElementsById("drop-zone");

dropZone.addEventListener("drop", dropHandler);

window.addEventListener("drop", (e) => {
  if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
    e.preventDefault();
  }
});
