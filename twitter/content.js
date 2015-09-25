

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

  if (e.keyCode == 13) { // enter
    playerAggregator.addPlayers(players);
    var uniqueActingPlayers = playerAggregator.aggregateAllUniquePlayers();
    refreshOutputHtmlTextarea(uniqueActingPlayers);
  }
}

var SELECTOR_EMBED_TWEET_TEXTAREA = "textarea.embed-destination.js-initial-focus";

function refreshOutputHtmlTextarea(uniqueActingPlayers){
  var embedTweetTextarea = document.querySelector(SELECTOR_EMBED_TWEET_TEXTAREA);

  var htmlNames = "";
  var labelString = "";
  for(var id in uniqueActingPlayers){
    htmlNames += htmlName = "<a target='_blank' href=" + uniqueActingPlayers[id].getBlogUrl() + ">" + uniqueActingPlayers[id].japanese + "</a><br/>\n";
    labelString += uniqueActingPlayers[id].japanese + ",";
  }

  var processedTemplate = TEMPLATE.replace(__REPLACE_WITH_ACTING_PLAYERS__, htmlNames);

  var outputHtmlTextArea = document.querySelector("#outputHtmlTextArea");
  outputHtmlTextArea.value = "<!-- embed tweet \n" + 
      labelString + 
      "\n-->\n" +
      embedTweetTextarea.value + "\n" +
      "<!-- embed tweet -->\n" +
      processedTemplate;
}

function PlayerAggregator(){
  this.additionalPlayers = [];
}

PlayerAggregator.prototype.addPlayers = function(players){
  this.additionalPlayers = this.additionalPlayers.concat(players);
}

PlayerAggregator.prototype.aggregateAllUniquePlayers = function(){

  // Collect all twitter IDs.
  var actingPlayerList = [];
  var twitterId = getTwitterID();
  if(playerManager.existByWord(twitterId)){
    actingPlayerList = actingPlayerList.concat(playerManager.getPlayersByWord(twitterId));
  }

  words = findWordsFromContext();
  for(var i = 0; i < words.length; i++){
    if(playerManager.existByWord(words[i])){
      actingPlayerList = actingPlayerList.concat(playerManager.getPlayersByWord(words[i]));
    }
  }

  actingPlayerList = actingPlayerList.concat(this.additionalPlayers);

  // filter duplicate
  var uniqueActingPlayers = {};
  for(var i = 0; i < actingPlayerList.length; i++){
    uniqueActingPlayers[actingPlayerList[i].twitterId] = actingPlayerList[i]
  }

  return uniqueActingPlayers;
}

var playerAggregator = new PlayerAggregator();


function processEmbedTweet(){
  var parentOfTextarea = document.querySelector(SELECTOR_EMBED_TWEET_TEXTAREA).parentElement;

  var addtional_player_name_text = document.createElement("input");
  addtional_player_name_text.addEventListener("keyup", translatePlayerName);
  parentOfTextarea.appendChild(addtional_player_name_text);

  var translated_player_name_text  = document.createElement("input");
  translated_player_name_text.setAttribute("id", "translated_player_name_text");
  parentOfTextarea.appendChild(translated_player_name_text);

  var outputHtmlTextArea = document.createElement("textarea");
  outputHtmlTextArea.setAttribute("id", "outputHtmlTextArea");
  outputHtmlTextArea.style.height="200px";
  outputHtmlTextArea.rows="30";
  parentOfTextarea.appendChild(outputHtmlTextArea);

  var uniqueActingPlayers = playerAggregator.aggregateAllUniquePlayers();

  refreshOutputHtmlTextarea(uniqueActingPlayers);

}

function waitUntilEmbedTweetTextShowsUp(callback){
  var embedTweetTextarea = document.querySelector(SELECTOR_EMBED_TWEET_TEXTAREA);
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
