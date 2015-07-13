angular.module('wordsApp.directives', [])
.directive('onKeydown', function(Letters) {
  return {
    restrict: 'A',
    scope: {
      data: "="
    },
    link: function(scope, elem, attrs) {
      elem.on('keydown', function(e){
        // on the keydown event, check if the key is a backspace or a letter
        if(e.which === 8){
          //for backspace keypress, update the chars hash by increasing the letter count
          //erase the last character of the guess string
          //add the deleted character to the scrambledWord string
          e.preventDefault();
          var deletedChar = scope.data.guess[scope.data.guess.length-1];
          scope.data.chars[deletedChar]++;
          scope.data.guess = scope.data.guess.slice(0, scope.data.guess.length-1);
          if(deletedChar){
            scope.data.scrambledWord = ""+deletedChar+scope.data.scrambledWord;
          }
        } else if(e.which >= 65 && e.which <= 90){
          //if the pressed key is a letter in chars hash and its count is more than 0
          //then add it to our guess string
          //remove that character from the scrambledWord string
          var letter = String.fromCharCode(e.which).toLowerCase();
          if (scope.data.chars[letter] && scope.data.chars[letter] > 0){
            scope.data.guess += letter;
            scope.data.chars[letter]--;
            scope.data.scrambledWord = Letters.removeCharacter(scope.data.scrambledWord, letter);
          }
        }
      });
    }
  };
});