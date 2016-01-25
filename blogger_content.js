var CSS_SELECTOR_LABELS_TEXTAREA = "[aria-label='Enter a list of labels separated by comma.']";
var CSS_SELECTOR_LABELS = "a.PXLWASD-Rb-a"
var CSS_SELECTOR_PERMALINK_LABEL = "a.PXLWASD-Rb-a"
var CSS_SELECTOR_PERMALINK_TEXTBOX = "input.PXLWASD-ac-b.textInput"
								

function closeTextarea(e) {
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 13) { // enter
    document.querySelector(".optionHolder").querySelector("button.blogg-button").click();
    document.querySelectorAll(CSS_SELECTOR_PERMALINK_LABEL)[2].click(); // open Permalink
    document.querySelector("#custom-filename").click(); // select Custom Permalink
    document.querySelectorAll(CSS_SELECTOR_PERMALINK_TEXTBOX)[0].focus(); // focus .html text box
  }
}

function openLabels(e){
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 76) { // l
    document.querySelector(CSS_SELECTOR_LABELS).click();
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

