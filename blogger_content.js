var CSS_SELECTOR_LABELS_TEXTAREA = "[aria-label='Enter a list of labels separated by comma.']";
var CSS_SELECTOR_PERMALINK_LABEL = "a.PXLWASD-Rb-a"
var CSS_SELECTOR_PERMALINK_TEXTBOX = "input.PXLWASD-ac-b.textInput"
								

function closeTextarea(e) {
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 13) { // enter
    document.querySelector(".optionHolder").querySelector("button.blogg-button").click();
    getNodeByText("Permalink").click();
    document.querySelector("#custom-filename").click(); // select Custom Permalink
    document.querySelector("label[for='custom-filename']").parentNode.querySelector("input[type='text']").focus(); // focus .html text box
    // document.querySelectorAll(CSS_SELECTOR_PERMALINK_TEXTBOX)[0].focus(); // focus .html text box
  }
}

/**
* <a class="PXLWASD-Qb-a" href="javascript:void(0);" kind="click">
*   <div class="PXLWASD-Qb-f">
*     <span class="PXLWASD-Qb-c PXLWASD-S-a"></span>
*     <span>Labels</span>
*   </div>
* </a>
*/
function getNodeByText(textContent){
  var nodes = document.querySelectorAll("a div span");
  for(var i = 0; i < nodes.length; i++){
    var parentNode = nodes[i].parentNode;
    var spans = parentNode.querySelectorAll("span");
    for(var j = 0; j < spans.length; j++){
      if(spans[j].textContent == textContent){
        return parentNode.parentNode;
      }
    }
  }
  console.error(textContent + " could not be found");
  
}

function openLabels(e){
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 76) { // l
    getNodeByText("Labels").click();
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

