'use strict';

angular.module('wordsApp.services', [])

.factory('Words', function($http){

  var get = function(){
    var getURL = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&excludePartOfSpeech=auxiliary-verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=7&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
    return $http({
      method: 'GET',
      url: getURL
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var check = function(word){
    var getDefinitionURL = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    return $http({
      method: 'GET',
      url: getDefinitionURL,
    })
    .then(function (resp) {
      if(resp.data.length > 0){
        return true;
      }else {
        return false;
      }
    });
  };

  var shuffle = function(str){
    var shuffledArray = str.toLowerCase().split(""),
        counter = shuffledArray.length, 
        temp, 
        index;

    // While there are elements in the shuffledArray
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      temp = shuffledArray[counter];
      shuffledArray[counter] = shuffledArray[index];
      shuffledArray[index] = temp;
    }
    // console.log(shuffledArray);
    return shuffledArray.join("");
  };

  return {
    get: get,
    check: check,
    shuffle: shuffle
  };
})
.factory('Letters', function($http){

  var removeCharacter = function(str, letter){
    var string = "";
    for(var i = 0; i < str.length; i++){
      if(str[i] === letter){
        string += str.slice(0, i);
        string += str.slice(i+1);
        break;
      }
    };
    return string;
  };

  return {
    removeCharacter: removeCharacter
  };
});
