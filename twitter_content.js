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
//  this.players = {};
  this.words = {};
}

PlayerManager.prototype.add = function(player){
//  this.players[player.twitterId] = player;

  // Add the player by twitter ID
  if(this.words[player.twitterId] == undefined){
    this.words[player.twitterId] = [];
  }
  this.words[player.twitterId].push(player);

  // Add the player by synonyms
  for(var i = 0; i < player.synonyms.length; i++){
    if(this.words[player.synonyms[i]] == undefined){
      this.words[player.synonyms[i]] = [];
    }
    this.words[player.synonyms[i]].push(player);
  }

}

PlayerManager.prototype.getPlayersByWord = function(word){
  return this.words[word.toLowerCase()];
}

PlayerManager.prototype.getPlayersByWordMatch = function(word){

  // get all and duplicate players starts with the word
  var matched_players = [];
  var keys = Object.keys(this.words)
  for(var i = 0; i < keys.length; i++){
    if(keys[i].startsWith(word)){
      matched_players = matched_players.concat(this.words[keys[i]]);
    }
  }

  // filter duplicate
  var result = []
  for(var i = 0; i < matched_players.length; i++){
    if (result.indexOf(matched_players[i]) == -1){
      result.push(matched_players[i]);
    }
  }

  return result;
}

PlayerManager.prototype.existByWord = function(word){
  return word.toLowerCase() in this.words;
}

playerManager = new PlayerManager();

playerManager.add(new Player("MariaSharapova", "マリア・シャラポワ", []));
playerManager.add(new Player("lleytonhewitt", "レイトン・ヒューイット", []));
playerManager.add(new Player("NickKyrgios", "ニック・キリオス", ["Nick", "Kyrgios"]));
playerManager.add(new Player("usopen", "USオープン", []));
playerManager.add(new Player("rogerfederer", "ロジャー・フェデラー", ["Roger", "Federer"]));
playerManager.add(new Player("DjokerNole", "ノバク・ジョコビッチ", ["Novak", "Djokovic"]));
playerManager.add(new Player("xxx_nadal", "ラファエル・ナダル", ["Rafael", "Nadal"]));
playerManager.add(new Player("AndreAgassi", "アンドレ・アガシ", ["Andre", "Agassi"]));
playerManager.add(new Player("CaroWozniacki", "キャロライン・ウォズニアッキ", ["Caroline", "Wozniacki"]));
playerManager.add(new Player("AnaIvanovic", "アナ・イバノビッチ", ["Ana", "Ivanovic"]));
playerManager.add(new Player("AnaIvanovic", "アナ・イバノビッチ", ["Ana", "Ivanovic"]));
playerManager.add(new Player("andy_murray", "アンディ・マレー", ["Andy", "Murray"]));
playerManager.add(new Player("JohnIsner", "ジョン・イズナー", ["John", "Isner"]));
playerManager.add(new Player("MonicaAce93", "モニカ・プイグ", ["Monica", "Puig"]));
playerManager.add(new Player("geniebouchard", "ジニー・ブシャール", ["Genie", "Bouchard"]));
playerManager.add(new Player("JimmyConnors", "ジミー・コナーズ", ["Jimmy", "Connors"]));
playerManager.add(new Player("luciesafarova", "ルーシー・サファロバ", ["Lucie", "Safarova"]));
playerManager.add(new Player("bgtennisnation", "ブラッド・ギルバート", ["Brad", "Gilbert"]));
playerManager.add(new Player("CoCoVandey", "ココ・バンダウェイ", ["Coco", "Vandeweghe"]));
playerManager.add(new Player("richardgasquet1", "リシャール・ガスケ", ["Richard", "Gasquet"]));
playerManager.add(new Player("flavia_pennetta", "フラビア・ペンネッタ", ["Flavia", "Pennetta"]));
playerManager.add(new Player("xxxx", "ロベルタ・ビンチ", ["Roberta", "Vinci"]));
playerManager.add(new Player("TKokkinakis", "タナシ・コキナキス", ["Thanasi", "Kokkinakis"]));
playerManager.add(new Player("outside_theball", "メイリーン・ラミー", ["Mayleen", "Ramey"]));
playerManager.add(new Player("serenawilliams", "セリーナ・ウィリアムズ", ["Serena", "Williams"]));
playerManager.add(new Player("ElinaSvitolina", "エリナ・スビトリーナ", ["Elina", "Svitolina"]));
playerManager.add(new Player("BelindaBencic", "ベリンダ・ベンチッチ", ["Belinda", "Bencic"]));
playerManager.add(new Player("sabinelisicki", "ザビーネ・リシキ", ["sabine", "lisicki"]));
playerManager.add(new Player("ARadwanska", "アグニエシュカ・ラドワンスカ", ["Agnieszka", "Aga", "Radwanska"]));
playerManager.add(new Player("KikiMladenovic", "クリスティーナ・ムラデノビッチ", ["Kiki", "Mladenovic", "kristina"]));
playerManager.add(new Player("JackSock", "ジャック・ソック", ["Jack", "Sock"]));

var __REPLACE_WITH_ACTING_PLAYERS__ = "__REPLACE_WITH_ACTING_PLAYERS__";

var TEMPLATE = "<br />\n" +
"<div class=\"tennis-scrap comment\">\n" +
"content\n" + 
__REPLACE_WITH_ACTING_PLAYERS__ + "\n" +
"<div class=\"tennis-scrap quote\">\n" +
"__quote__ \n</div>\n" +
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

/**
* Find @xxx in tweets
*/
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

function findWordsFromContext(){
  // document.querySelector("p.TweetTextSize").textContent.split(" ");
  _words = document.querySelector("p.TweetTextSize").textContent.match(/\w+/g);
  console.log(_words);
  var words = [];
  for(var i = 0; i < _words.length; i++){
    if(_words[i].length >= 3){
      words.push(_words[i].toLowerCase());
    }
  }
  return words;

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

function translatePlayerName(e){
  if(this.value.length < 3) return;
  var players = playerManager.getPlayersByWordMatch(this.value);
  var playerNames = players.map(function(p){
    return p.japanese;
  });
  var translated_player_name_text = document.querySelector("#translated_player_name_text");
  translated_player_name_text.value = playerNames.join(",");
}

function processEmbedTweet(){
  var embedTweetTextarea = document.querySelector("textarea.embed-destination.js-initial-focus");
  var parentOfTextarea = embedTweetTextarea.parentElement;

  var addtional_player_name_text = document.createElement("input");
  addtional_player_name_text.addEventListener("keyup", translatePlayerName);
  parentOfTextarea.appendChild(addtional_player_name_text);

  var translated_player_name_text  = document.createElement("input");
  translated_player_name_text.setAttribute("id", "translated_player_name_text");
  parentOfTextarea.appendChild(translated_player_name_text);


  var newTextarea = document.createElement("textarea");
  newTextarea.style.height="300px";
  newTextarea.rows="30";
  parentOfTextarea.appendChild(newTextarea);

  // Collect all twitter IDs.
  var actingPlayerList = [];
  var twitterId = getTwitterID();
  if(playerManager.existByWord(twitterId)){
    actingPlayerList = actingPlayerList.concat(playerManager.getPlayersByWord(twitterId));
//    for(var i = 0; i < players.length; i++){
 //     actingPlayerList.push(players[i]);
  //  }
  }
  
  words = findWordsFromContext();
  for(var i = 0; i < words.length; i++){
    if(playerManager.existByWord(words[i])){
      actingPlayerList = actingPlayerList.concat(playerManager.getPlayersByWord(words[i]));
    }
  }

  var uniqueActingPlayers = {};
  for(var i = 0; i < actingPlayerList.length; i++){
    uniqueActingPlayers[actingPlayerList[i].twitterId] = actingPlayerList[i]
  }

  var embedTweet = embedTweetTextarea.value;

  var htmlNames = "";
  var labelString = "";
  // for(var i = 0; i < actingPlayers.length; i++){
    // htmlNames += htmlName = "<a href=" + actingPlayers[i].getBlogUrl() + ">" + actingPlayers[i].japanese + "</a><br/>\n";
    // labelString += actingPlayers[i].japanese + ",";
  // }
  for(var id in uniqueActingPlayers){
    htmlNames += htmlName = "<a target='_blank' href=" + uniqueActingPlayers[id].getBlogUrl() + ">" + uniqueActingPlayers[id].japanese + "</a><br/>\n";
    labelString += uniqueActingPlayers[id].japanese + ",";
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

