var guessesRemaing = document.getElementById("guesses-remaining")
var lettersGuessed = document.getElementById("letters-guessed");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var currentWord = document.getElementById("current-word"); 

var Game = {
	wins: 0,
	losses: 0,
	lettersGuessed: [],
	guessesRemaining: 10,
	currentWord : "",
	wordWithUnderscores: [],
	possibleWords : [
		"artichoke",
		"asparagus",
		"beets",
		"broccoli",
		"brussel sprouts",
		"cabbage",
		"carrot",
		"celery",
		"corn",
		"cucumber",
		"eggplant",
		"kale",
		"mushrooms",
		"onions"
	],
	startGame : function() {	
		this.guessesRemaining = 10;
		this.lettersGuessed = [];
		this.wordWithUnderscores = [];
		this.currentWord = this.newWord();
		this.displayLetters();
		this.displayGameValues();
		
	},
	newWord : function() {
		return this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)]
	},
	displayLetters : function() {
		for(var i = 0; i < this.currentWord.length; i++){
			this.wordWithUnderscores.push("_ ");
		}
		var currentWord = document.getElementById("current-word");
		currentWord.textContent = this.wordWithUnderscores.join("");
	},
	displayGameValues : function() {
		guessesRemaing.textContent = this.guessesRemaining;
		lettersGuessed.textContent = this.lettersGuessed;
		wins.textContent = this.wins;
		losses.textContent = this.losses;
		currentWord.textContent = this.wordWithUnderscores.join("");
	},
	checkLetter : function (letter) {
		if(this.wordWithUnderscores.indexOf(letter) > -1 || this.lettersGuessed.indexOf(letter) > -1 ){
			return;
		}
		if(this.currentWord.indexOf(letter) > -1){
			for(var i = 0; i < this.currentWord.length; i++) {
				if(this.currentWord[i] === letter){
					this.wordWithUnderscores[i] = letter;
				}
			}
			this.displayGameValues();
			if(this.currentWord === this.wordWithUnderscores.join("")){
				this.gameWon();
			}
		}
		else {
			this.guessesRemaining --;
			this.lettersGuessed.push(letter);
			this.displayGameValues();
			if(this.guessesRemaining === 0){
				this.gameover();
			}
		}
	},
	gameover : function() {
		this.losses ++;
		alert("Better Luck next time bucko!");
		this.startGame();
	},
	gameWon : function() {
		this.wins ++;
		alert("Congradulations, let's do that again!");
		this.startGame();
	}
}
Game.startGame();

document.onkeyup = function(event){
	var letterGuessed = event.key;
	if(event.keyCode >= 65 && event.keyCode <= 90){
		Game.checkLetter(letterGuessed)
	}
}