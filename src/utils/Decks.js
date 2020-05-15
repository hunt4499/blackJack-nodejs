class Decks {
  constructor() {
    this.deck = [];
    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (var i = 0; i < values.length; i++) {
      for (var x = 0; x < suits.length; x++) {
        var weight = parseInt(values[i]);
        if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K') weight = 10;
        if (values[i] == 'A') weight = 11;
        var card = { Value: values[i], Suit: suits[x], Weight: weight };
        this.deck.push(card);
      }
    }
  }

  shuffle() {
    const { deck } = this;
    let m = deck.length, i;
  
    while (m) {
      i = Math.floor(Math.random() * m--);
  
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }
  
    return this.deck;
  }
}

module.exports = Decks;
