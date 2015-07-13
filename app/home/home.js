'use strict';

angular.module('wordsApp.home', ['ui.bootstrap'])

.controller('HomeCtrl', function($scope, $interval, $modal, Words){
  var stop;
  $scope.input = {};
  $scope.input.guess = ""; //guess string
  $scope.input.chars = {}; //chars hash will contain all possible letter and occurance
  $scope.input.scrambledWord = "";
  $scope.timeLeft = 6000;
  $scope.score = 0;
  $scope.targetWord = "";
  $scope.error = false;

  $scope.checkMatch = function(guess, word){
    if(guess === word){
      return true;
    } else {
      $scope.error = true;
      return false;
    }
  };

  $scope.checkDefinition = function(word){
    Words.check(word).then(function(resp){
      if(resp){
        $scope.newRound(); //if our word is in the dictionary, start new round
        return true;
      } else {
        return false;
      }
    });
  };

  $scope.checkWord = function(guess, word){
    if($scope.input.guess.length === $scope.targetWord.length){
      if($scope.checkMatch(guess, word)){
        $scope.newRound(); //if our guess string equals our scrambled word, start new round
      } else {
        $scope.checkDefinition(guess); //check if our word is in the dictionary
      }
    } else {
      $scope.error = false;
    }
  };

  $scope.resetTimer = function(){
    $scope.timeLeft = 6000;
  };

  $scope.startTimer = function(){
    if ( angular.isDefined(stop) ){
      $scope.resetTimer();
    };
    
    stop = $interval(function(){
      if($scope.timeLeft > 0){
        $scope.timeLeft--;
        $scope.checkWord($scope.input.guess, $scope.targetWord);
      } else {
        $scope.stopTimer();
      }
    }, 10);
  };

  $scope.stopTimer = function() {
    if(angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
      $scope.openModal();
    }
  };

  $scope.openModal = function (size) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'app/modal/myModalContent.html',
      controller: 'ModalInstanceCtrl', 
      // size: 'sm',
      transclude: true,
      scope: $scope,
      backdrop : 'static',
      keyboard :false
    });

    modalInstance.result.then(function () {
     $scope.newRound();
     $scope.score = 0;
    });
  };

  $scope.getWord = function(){
    Words.get().then(function(resp){
      $scope.targetWord = resp.word;
      console.log(resp.word);
      $scope.input.scrambledWord = Words.shuffle(resp.word);
      $scope.input.scrambledWord.split("").forEach(function(letter){
        //populate the $scope.input.chars hash with each letters and its frequency
        var charactersHash = $scope.input.chars;
        if(!charactersHash[letter]) {
          charactersHash[letter] = 1;
        } else {
          charactersHash[letter]++;
        }
      });
      $scope.startTimer();
    });
  };
  
  $scope.getWord();

  $scope.newRound = function(){
    $scope.score += 10;
    $scope.getWord();
    $scope.input.guess = "";
    $scope.resetTimer();
  };

});