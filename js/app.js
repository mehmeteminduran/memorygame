// Variables
const distinctCardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
const cardMatchClassName = 'match';
const showCardClassName = 'show';
const openCardClassName = 'open';
const cardClassName = 'card';
let listOfOpenedCards = [];
let moveCount = 0,notMatchedMoveCount = 0;
let moves = document.querySelector('.moves');
let isStarted, isFinished = false;
let startTime, endTime;
let stars = document.getElementsByClassName('fa-star');
let rates = document.getElementsByClassName('fa-star-o');
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

// Create html of deck
createDeck();
// Add listener for restart button
let restartDiv = document.querySelector('.restart');
restartDiv.addEventListener('click', onRestartClicked);
// Calculate time in every 1 second after game begin
let timer = setInterval(gameTimer, 1000);

function createDeck() {
	// Get list of cards which are doubled and shuffled.
	let listOfCardTypes = shuffle(doubleArrayElements(distinctCardTypes));
	// Find container element 
	let container = document.querySelector('.container');
	// Add unordered list to container
	let unorderedList = document.createElement('ul');
	unorderedList.className = 'deck';
	// add each card's HTML to unordered list
	for (const cardType of listOfCardTypes) {
		let card = createCardElement(cardType);
		unorderedList.appendChild(card);
	}
	container.appendChild(unorderedList);
}

// Create card's html
function createCardElement(cardClassName) {
	let element = document.createElement('li');
	element.className = 'card';
	element.addEventListener('click', onCardClicked);
	let cardText = document.createElement('i');
	cardText.classList.add('fa');
	cardText.classList.add(cardClassName);
	element.appendChild(cardText);
	return element;
}

// This function from doubles up each element in a array
function doubleArrayElements(originalArray) {
	let tempArray = [];
	originalArray.forEach(function(el) {
		tempArray.push(el, el);
	});
	return tempArray;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Card click Event
function onCardClicked(event) {
	if (!isStarted) {
		isStarted = true;
		startTime = performance.now();
	}
	if (isCardOpenOrMatched(event.target)) {
		return;
	} else {
		increaseMoveCount();
		displayCardSymbol(event.target);
		setTimeout(function() {
			addToOpenedCardList(event.target.firstElementChild.className);
		}, 300);
	}
}

// Check whether element or parent element has open or match class .İf so, do nothing.
function isCardOpenOrMatched(target) {
	return target.classList.contains(openCardClassName) || target.classList.contains(cardMatchClassName) || target.parentElement.classList.contains(openCardClassName) || target.parentElement.classList.contains(cardMatchClassName);
}

// open and show card
function displayCardSymbol(target) {
	target.classList.add(showCardClassName);
	target.classList.add(openCardClassName);
}

// İf opened cards are same lock the cards,otherwise close cards.
function addToOpenedCardList(childElementClassName) {
	listOfOpenedCards.push(childElementClassName);
	if (listOfOpenedCards != null && listOfOpenedCards.length == 2) {
		let openedCards = document.getElementsByClassName(openCardClassName);
		if (allTheSame(listOfOpenedCards)) {
			lockOpenedCards(openedCards);
		} else {
			closeOpenedCards(openedCards);
			notMatchedMoveCount++;
			reduceStars();
		}
		listOfOpenedCards = [];
	}
}

function reduceStars() {
	if ((stars.length == 5 && notMatchedMoveCount >= 5 && notMatchedMoveCount < 10) || (stars.length == 4 && notMatchedMoveCount >= 10 && notMatchedMoveCount < 15) || (stars.length == 3 && notMatchedMoveCount >= 15 && notMatchedMoveCount < 20) || (stars.length == 2 && notMatchedMoveCount >= 20)) {
		stars[0].className = 'fa fa-star-o';
	}
}

// Check All elements in a array are all same
function allTheSame(array) {
	var first = array[0];
	return array.every(function(element) {
		return element === first;
	});
}

// Set opened cards as matched.
function lockOpenedCards(openedCards) {
	debugger;
	for (let i = 0; openedCards.length; i++) {
		openedCards[0].classList.add(cardMatchClassName);
		openedCards[0].classList.remove(showCardClassName);
		openedCards[0].classList.remove(openCardClassName);
	}
	if (isAllCardsMatched()) {
		isFinished = true;
		const starCount = stars.length;
		let modalContent = document.getElementById('modal-description');
		modalContent.textContent = modalContent.textContent.replace('{0}', moveCount).replace('{1}', stars.length);
		toggleModal();
	}
}

// Check whether all cards are matched
function isAllCardsMatched() {
	const cardClassCount = document.getElementsByClassName(cardClassName).length;
	const matchedCardClassCount = document.getElementsByClassName(cardMatchClassName).length;
	return cardClassCount == matchedCardClassCount;
}

// Close opened cards if not same
function closeOpenedCards(openedCards) {
	debugger;
	for (let i = 0; openedCards.length; i++) {
		openedCards[0].classList.remove(showCardClassName);
		openedCards[0].classList.remove(openCardClassName);
	}
}

// Increase move count
function increaseMoveCount() {
	moveCount++;
	moves.textContent = moveCount;
}

// Restart the game
function onRestartClicked() {
	// Remove deck
	var deck = document.querySelector('.deck');
	deck.parentNode.removeChild(deck);
	// Create deck
	createDeck();
	// Refresh move count
	moveCount = 0;
	moves.textContent = moveCount;
	notMatchedMoveCount = 0;
	//Refresh star rating
	for (let i = 0; rates.length; i++) {
		rates[0].className = 'fa fa-star';
	}
	// Refresh Timer
	startTime = 0;
	endTime = 0;
	isStarted = false;
	isFinished = false;
	document.getElementById("timer").textContent = '';
}

// Convert miliseconds to day,hour,minute,second
function milisecondToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = parseInt((duration / 1000) % 60),
		minutes = parseInt((duration / (1000 * 60)) % 60),
		hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}

function gameTimer() {
	if (isStarted && !isFinished) {
		endTime = performance.now();
		let distance = endTime - startTime;
		document.getElementById("timer").innerHTML = '<b>Time</b> : ' + milisecondToTime(distance);
	}
}

function toggleModal() {
	modal.classList.toggle("show-modal");
}

closeButton.onclick = function() {
	toggleModal();
};