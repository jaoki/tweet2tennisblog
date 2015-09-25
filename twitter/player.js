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

