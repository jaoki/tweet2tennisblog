
TEMPLATE = "<br />" +
"<div class=\"tennis-scrap comment\">" +
"<div class=\"tennis-scrap quote\">" +
"__quote__ </div>" +
"__description__" +
"</div>" +
"<br />" +
"<br />" +
"<script async=\"\" src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>" +
"<!-- tennis-responsive -->" +
"<br />" +
"<ins class=\"adsbygoogle\" data-ad-client=\"ca-pub-0293494487488769\" data-ad-format=\"auto\" data-ad-slot=\"1623937253\" style=\"display: block;\"></ins><script>" +
"(adsbygoogle = window.adsbygoogle || []).push({});" +
"</script>";


function getEmbedTweet(){
  value = document.querySelector(".embed-destination.js-initial-focus").value;
  console.log(value + "\n" + TEMPLATE);
}

function waitUntilEmbedTweetTextShowsUp(callback){
  textValue = document.querySelector(".embed-destination.js-initial-focus").value;
  console.log("textValue: " + textValue.length);
  if(textValue.length < 3){
    window.setTimeout("waitUntilEmbedTweetTextShowsUp(" + callback.name + ");", 1000);
  }else{
    callback();
  }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    document.querySelector(".ProfileTweet-action--more").querySelector(".dropdown").querySelector("button").click();
    document.querySelector(".embed-link.js-actionEmbedTweet").click();
    waitUntilEmbedTweetTextShowsUp(getEmbedTweet);

    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});

