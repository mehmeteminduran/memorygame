/*
 * Create a list that holds all of your cards
 */
const distinctCardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
const cardMatchClassName = 'match';
const showCardClassName = 'show';
const openCardClassName = 'open';
let listOfOpenedCards = [];

// Find list of cards which are doubled and shuffled.
let listOfCardTypes = shuffle(doubleArrayElements(distinctCardTypes));

// Find container and 
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

function onCardClicked(event) {
    if (event.target.classList.contains(openCardClassName)) {
        return;
    } else {
        debugger;
        if (listOfOpenedCards.length < 2) {
            displayCardSymbol(event.target);
        }
        
        setTimeout(function () {
            addToOpenedCardList(event.target.firstElementChild.className);
        }, 300);
        

    }
}

function displayCardSymbol(target) {
    debugger;
    target.classList.add(showCardClassName);
    target.classList.add(openCardClassName);
}

function addToOpenedCardList(childElementClassName) {
    listOfOpenedCards.push(childElementClassName);
    if (listOfOpenedCards != null && listOfOpenedCards.length == 2) {
        let openedCards = document.getElementsByClassName(openCardClassName);

        let openedCardSpanElements = [];
        for (const openedCard of openedCards) {
            openedCardSpanElements.push(openedCard.firstElementChild.className);
        }

        if (allTheSame(openedCardSpanElements)) {
            lockOpenedCards(openedCards);
        } else {
            for (const openedCardSpanElement of openedCardSpanElements) {
                listOfOpenedCards.pop(openedCardSpanElement);
            }
            closeOpenedCards(openedCards);
        }
    }
}

function allTheSame(array) {
    var first = array[0];
    return array.every(function (element) {
        return element === first;
    });
}


function lockOpenedCards(openedCards) {
    debugger;
    for (let i = 0; openedCards.length; i++) {
        openedCards[0].classList.remove(showCardClassName);
        openedCards[0].classList.remove(openCardClassName);
        openedCards[0].classList.add(cardMatchClassName);
    }

}

function closeOpenedCards(openedCards) {

    // openedCards.forEach(function(ele, idx) {
    //     ele.classList.remove(showCardClassName);
    //     ele.classList.remove(openCardClassName);  
    //  })

    debugger;
    for (let i = 0; openedCards.length; i++) {
        openedCards[0].classList.remove(showCardClassName);
        openedCards[0].classList.remove(openCardClassName);
    }
    // for (let openedCard of openedCards) {
    //     openedCard.classList.remove(showCardClassName);
    //     openedCard.classList.remove(openCardClassName);  
    // }
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

