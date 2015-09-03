function closeTextarea(e) {
  var key = e.keyCode;

  if (e.ctrlKey && e.keyCode == 13) { // enter
    document.querySelector(".optionHolder").querySelector("button.blogg-button").click();
  }
}

// function findCorespondingDoneButton(){
  // var devs = document.querySelectorAll(".PXLWASD-Qb-f");
  // for(var i = 0; i < devs.length; i++){
    // if(devs[i].textContent.indexOf("Labels") > -1){
      // break;
    // }
// 
// ;
// document.querySelectorAll("div.PXLWASD-Qb-f")[2].textContent
  // }
// }

function main(){
  document.querySelector("[aria-label='Enter a list of labels separated by comma.']").addEventListener("keyup", closeTextarea);
}

main();

