CSS_SELECTOR_LABELS_TEXTAREA = "[aria-label='Enter a list of labels separated by comma.']";

function closeTextarea(e) {
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 13) { // enter
    document.querySelector(".optionHolder").querySelector("button.blogg-button").click();
    document.querySelectorAll("a.PXLWASD-Qb-a")[2].click(); // open Permalink
    document.querySelector("#custom-filename").click(); // select Custom Permalink
    document.querySelectorAll(".PXLWASD-Zb-b.textInput")[0].focus(); // focus .html text box
  }
}

function openLabels(e){
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 76) { // l
    document.querySelector("a.PXLWASD-Qb-a").click();
    event.preventDefault(); 
  }
}

function waitUntilLoaded(callback){
  var targetExists = document.querySelector(CSS_SELECTOR_LABELS_TEXTAREA) != null;
  if(targetExists){
    callback();
  }else{
    window.setTimeout("waitUntilLoaded(" + callback.name + ");", 1000);
  }
}

function process(){
  document.querySelector(CSS_SELECTOR_LABELS_TEXTAREA).addEventListener("keyup", closeTextarea);
  window.addEventListener("keydown", openLabels);
}

function main(){
  // document.querySelector("[aria-label='Enter a list of labels separated by comma.']").addEventListener("keyup", closeTextarea);
  waitUntilLoaded(process);
}

main();

