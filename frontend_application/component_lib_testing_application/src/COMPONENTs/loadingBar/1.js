function setProcess() {
  var processbar = document.getElementById("processbar");
  processbar.style.width = parseInt(processbar.style.width) + 1 + "%";
  if (processbar.style.width == "100%") {
    window.clearInterval(bartimer);
  }
}

var bartimer = window.setInterval(function () {
  setProcess();
}, 100);

window.onload = function () {
  bartimer;
};