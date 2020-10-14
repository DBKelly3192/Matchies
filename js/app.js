// CREATING GAME CLASS
class Game {
  constructor () {
    this.clicked = []
    this.clickedID = []
    this.correct = 0
    this.incorrect = 0
    this.deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    this.options = [
      {foo: "lobster", bar: "LOBSTER"},
      {foo: "zany_face", bar: "GRINNING FACE WITH ONE LARGE AND ONE SMALL EYE"},
      {foo: "zombie", bar: "ZOMBIE"},
      {foo: "sandwich", bar: "SANDWICH"},
      {foo: "sauropod", bar: "SAUROPOD"},
      {foo: "recycle", bar: "BLACK UNIVERSAL RECYCLING SYMBOL"},
      {foo: "penguin", bar: "PENGUIN"},
      {foo: "mosque", bar: "MOSQUE"},
      {foo: "mask", bar: "FACE WITH MEDICAL MASK"},
      {foo: "jack_o_lantern", bar: "JACK-O-LANTERN"},
      {foo: "ferris_wheel", bar: "FERRIS WHEEL"},
      {foo: "bear", bar: "BEAR FACE"}
    ]
  }
  // RANDOMIZES AN ARRAY OF NUMBERS
  // NUMBERS USED TO INDEX THE CARD IMAGES
  // CALLS FUNCTION THAT CREATES AUTOMATES THE INTRO
  shuffleDeck() {

    for (let i = matching.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [matching.deck[i], matching.deck[j]] = [matching.deck[j], matching.deck[i]];
    }

    matching.delayedGratification()
  }
  // VARIOUS SETTIMEOUT STATEMENTS ESSENTIALLY AUTOMATE THE INTRO TO THE GAME
  // CALLS FUNCTION THAT CREATES THE CARDS
  delayedGratification() {

    setTimeout(() => {this.flipCenterCard()}, 1000)

    for (let i = 0; i < 24; i++) {
      setTimeout((index) => {this.initializeCards(i)}, 3000 + (250 * i), i)
    }

    setTimeout(() => {this.flipCenterCard()}, 3000)

    for (let i = 0; i < 24; i++) {
      setTimeout((index) => {this.flipAllCards(i)}, 9000 + (250 * i), i)
    }

    setTimeout(() => {$('#message').text('MATCH\nDEES!')}, 15250)
    setTimeout(() => {this.flipCenterCard()}, 15000)
    setTimeout(() => {this.flipCenterCard()}, 18000)
  }
  // CREATES THE CARDS
  initializeCards(index) {

      const $div1 = $('<div class="scene scene--card"></div>')
      const $div2 = $('<div class="card is-flipped"></div>')
      const $div3 = $('<div class="card__face card__face--front"></div>')
      const $div4 = $(`<div class="card__face card__face--back"></div>`)
      const $icon = $(`<i class="em-svg em-${this.options[this.deck[index]].foo}" aria-role="presentation" aria-label="${this.options[this.deck[index]].bar}"></i>`)

      $div4.append($icon)
      $div2.append($div3).append($div4)
      $div1.append($div2)
      $(`#cell${index}`).append($div1)
  }
  // FLIPS THE CENTER CARD, USED FOR GAME INFO DISPLAY
  flipCenterCard() {

    $('#cellCenter').find('.centerCard').toggleClass('is-flipped')
  }
  // FLIPS ALL PLAYABLE CARDS
  flipAllCards(index) {

    $(`#cell${index}`).find('.card').toggleClass('is-flipped')
  }
  // FLIPS THE CARD ATTACHED TO THE EVENT
  // CALLED FROM AN EVENT LISTENER
  // CALLS FUNCTION THAT STORES THE VALUE FROM EACH CLICKED CARD
  flipCard() {

    $(event.currentTarget).toggleClass('is-flipped')
    $(event.currentTarget).off('click')

    matching.storeCard()
  }
  // STORES THE VALUE FROM EACH CLICKED CARD
  // ONCE TWO VALUES ARE STORED CALLS COMPARE FUNCTION
  storeCard() {

    this.clicked.push($(event.currentTarget).children().last().html())
    this.clickedID.push($(event.currentTarget))

    if (this.clicked.length === 2) {
      matching.compareCards()
    }
  }
  // COMPARES THE CARDS THAT HAVE BEEN CLICKED
  // FLIPS NONMATCH PAIRS
  // TRACKS CORRECT & INCORRECT PAIRS
  // END GAME CONDITIONAL
  compareCards() {

    if (this.clicked[0] === this.clicked[1]) {

      for(let i = 0; i < 2; i++) {
          this.clickedID[i].off('click')
          this.correct++

          if (this.correct === 24) {
            setTimeout(() => {this.endGame()}, 2000)
          }
        }
      } else {

        for(let i = 0; i < 2; i++) {

          setTimeout((cardToFlip) => {cardToFlip.toggleClass('is-flipped')}, 1000, this.clickedID[i])
          this.clickedID[i].on('click', matching.flipCard)
          this.incorrect++
        }
      }

    matching.clearArray()
  }
  // CLEARS ARRAYS OF SELECTED CARDS
  clearArray() {

    this.clicked = []
    this.clickedID = []
  }
  // CALLS FUNCTION THAT CLEARS ALL CARDS
  // CALLS FUNCTION THAT AUTOMATS OUTTRO
  endGame() {

    for (let i = 0; i < 24; i++) {
      setTimeout((index) => {matching.clearCards(i)}, 250 * i, i)
    }

    this.moreDelayedGratification()
  }
  // CLEARS ALL CARDS
  clearCards(index) {

    const $cell = $(`#cell${index}`)
    $cell.empty();
  }
  // VARIOUS SETTIMEOUT STATEMENTS ESSENTIALLY AUTOMATE THE OUTTRO TO THE GAME
  moreDelayedGratification() {

    $('#message').text('YOU\nWON!')
    setTimeout(() => {this.flipCenterCard()}, 6000)
    setTimeout(() => {this.flipCenterCard()}, 9000)

    setTimeout(() => {$('#message').text('MISSED\n' + this.incorrect/2 + '\nTIMES!')}, 10000)
    setTimeout(() => {this.flipCenterCard()}, 11000)
    setTimeout(() => {this.flipCenterCard()}, 14000)

    setTimeout(() => {$('#message').text('THANK\nU4\nPLAYIN!')}, 15000)
    setTimeout(() => {this.flipCenterCard()}, 16000)
  }
}
// CREATING AN INSTANCE OF OUR CLASS
const matching = new Game
// BEINGS THE GAME
matching.shuffleDeck()

$(() => {
  // EVENT LISTENER SET TO LISTEN TO ALL CARDS
  // SETTIMEOUT STATEMENT ENSURES THAT CARDS CANNOT BE CLICKED UNTIL THEY HAVE BEEN DEALT AND FLIPPED
  setTimeout((func) => {$('.card').on('click', func)}, 15000, matching.flipCard)

})
