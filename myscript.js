function Player(twitterId, japanese, synonyms){
  this.twitterId = twitterId.toLowerCase();
  this.japanese = japanese;
  this.synonyms = [];
  for(var i = 0; i < synonyms.length; i++){
    this.synonyms.push(synonyms[i].toLowerCase());
  }
};

Player.prototype.getBlogUrl = function(){
  return "http://tennis-scrapbook.blogspot.com/search/label/" + encodeURI(this.japanese);
}

function PlayerManager(){
  this.players = {};
}

PlayerManager.prototype.add = function(player){
  this.players[player.twitterId.toLowerCase()] = player;
}

PlayerManager.prototype.get = function(twitterId){
  return this.players[twitterId.toLowerCase()];
}

PlayerManager.prototype.exists = function(twitterId){
  return twitterId.toLowerCase() in this.players;
}

playerManager = new PlayerManager();

playerManager.add(new Player("MariaSharapova", "マリア・シャラポワ"));
playerManager.add(new Player("lleytonhewitt", "レイトン・ヒューイット"));
playerManager.add(new Player("NickKyrgios", "ニック・キリオス"));
playerManager.add(new Player("usopen", "USオープン"));
playerManager.add(new Player("rogerfederer", "ロジャー・フェデラー"));

var __REPLACE_WITH_ACTING_PLAYERS__ = "__REPLACE_WITH_ACTING_PLAYERS__";

var TEMPLATE = "<br />\n" +
"<div class=\"tennis-scrap comment\">\n" +
__REPLACE_WITH_ACTING_PLAYERS__ + "\n" +
"<div class=\"tennis-scrap quote\">\n" +
"__quote__ </div>\n" +
"__description__\n" +
"</div>\n" +
"<br />\n" +
"<br />\n" +
"<script async=\"\" src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n" +
"<!-- tennis-responsive -->\n" +
"<br />\n" +
"<ins class=\"adsbygoogle\" data-ad-client=\"ca-pub-0293494487488769\" data-ad-format=\"auto\" data-ad-slot=\"1623937253\" style=\"display: block;\"></ins><script>\n" +
"(adsbygoogle = window.adsbygoogle || []).push({});\n" +
"</script>\n";

function findTwitterIdsFromContext(){
  ids = [];
  links = document.querySelector("p.tweet-text").querySelectorAll("a.pretty-link");
  // for(link in links){
  for(var i = 0; i < links.length; i++ ){
    plainid = links[i].querySelector("b").innerHTML;
    ids.push(plainid);
  }
  return ids;
}

function backup_findTwitterIdsFromContext(text){
  ids = [];
  for(var i = 0; i < text.length; i++){
    if(text[i] == "@"){
      var start = i;
      i++;
      for(; i < text.length; i++){
        if(text[i] == " " || text[i] == ","){
          var end = i;
        }
      }
      ids.push(text.substring(start, end));
    }
  }
  return ids;
}


function getTwitterID(){
  return window.location.href.replace("https://twitter.com/", "").replace(/\/status\/.*/g, "")
}

function processEmbedTweet(){
  var embedTweetTextarea = document.querySelector("textarea.embed-destination.js-initial-focus");
  var parentOfTextarea = embedTweetTextarea.parentElement;
  var newTextarea = document.createElement("textarea");
  newTextarea.style.height="300px";
  newTextarea.rows="30";
  parentOfTextarea.appendChild(newTextarea);

  // Collect all twitter IDs.
  var actingPlayers = [];
  var twitterId = getTwitterID();
  if(playerManager.exists(twitterId)){
    actingPlayers.push(playerManager.get(twitterId));
    // console.log(playerManager.get(twitterId).japanese);
  // }else{
    // console.log(twitterId + " does not exist");
  }
  
  ids = findTwitterIdsFromContext();
  for(var i = 0; i < ids.length; i++){
    if(playerManager.exists(ids[i])){
      actingPlayers.push(playerManager.get(ids[i]));
    }
  }

  var embedTweet = embedTweetTextarea.value;

  var htmlNames = "";
  var labelString = "";
  for(var i = 0; i < actingPlayers.length; i++){
    htmlNames += htmlName = "<a href=" + actingPlayers[i].getBlogUrl() + ">" + actingPlayers[i].japanese + "</a><br/>\n";
    labelString += actingPlayers[i].japanese + ",";
  }
  var processedTemplate = TEMPLATE.replace(__REPLACE_WITH_ACTING_PLAYERS__, htmlNames);

  newTextarea.value = "<!-- embed tweet \n" + 
      labelString + 
      "\n-->\n" +
      embedTweet + "\n" +
      "<!-- embed tweet -->\n" +
      processedTemplate;
}

function waitUntilEmbedTweetTextShowsUp(callback){
  var embedTweetTextarea = document.querySelector("textarea.embed-destination.js-initial-focus");
  var embedTweet = embedTweetTextarea.value;
  
  if(embedTweet.length < 3){
    window.setTimeout("waitUntilEmbedTweetTextShowsUp(" + callback.name + ");", 1000);
  }else{
    callback();
  }
}

function openEmbedTweetDialog(){
  document.querySelector(".ProfileTweet-action--more").querySelector(".dropdown").querySelector("button").click();
  document.querySelector(".embed-link.js-actionEmbedTweet").click();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.tweet2blog == "tweet2blog")
      openEmbedTweetDialog();
      waitUntilEmbedTweetTextShowsUp(processEmbedTweet);
      sendResponse({executionStatus: "ok"});
});

