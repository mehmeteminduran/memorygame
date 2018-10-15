// Variables
const distinctCardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
const cardMatchClassName = 'match';
const showCardClassName = 'show';
const openCardClassName = 'open';
const cardClassName = 'card';
let listOfOpenedCards = [];
let moveCount = 0;
let moves = document.querySelector('.moves');

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
    originalArray.forEach(function (el) { tempArray.push(el, el); });
    return tempArray;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
    if (isCardOpenOrMatched(event.target)) {
        return;
    } else { 
        increaseMoveCount();
        displayCardSymbol(event.target);
        setTimeout(function () {
            addToOpenedCardList(event.target.firstElementChild.className);
        }, 300);
    }
}

// Check whether element or parent element has open or match class .İf so, do nothing.
function isCardOpenOrMatched(target) { 
    return target.classList.contains(openCardClassName) || target.classList.contains(cardMatchClassName)
        || target.parentElement.classList.contains(openCardClassName) || target.parentElement.classList.contains(cardMatchClassName);
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
        }
        listOfOpenedCards = [];
    }
}

// Check All elements in a array are all same
function allTheSame(array) {
    var first = array[0];
    return array.every(function (element) {
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
        alert('All cards are matched');
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

// TODO : Restart and star count