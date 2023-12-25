document.getElementById("select-dir").addEventListener("click", () => {
  window.electron.send("open-directory-dialog");
});

window.electron.receive("directory-data", (data) => {
  if (data.error) {
    document.getElementById("output").innerText = `Error: ${data.error}`;
  } else {
    document.getElementById("output").innerText = JSON.stringify(
      data.dirs,
      null,
      2
    );
  }
});

document.getElementById("select-file").addEventListener("click", () => {
  window.electron.send("open-file-dialog");
});

window.electron.receive("file-data", (data) => {
  if (data.error) {
    document.getElementById("file-contents").innerText = `Error: ${data.error}`;
  } else {
    document.getElementById("file-contents").innerText = data.content;
  }
});