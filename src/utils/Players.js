class Players {
  constructor(playerId) {
    this.playerId = playerId;
    this.hand = [];
    this.isWinner = false;
  }

  get handCards() {
    return this.hand;
  }

  set handCards(x) {
    this.hand.push(x);
  }

  setWinner() {
    this.isWinner = true;
  }

  isWinning() {
    return this.isWinner;
  }
}

module.exports = Players;
