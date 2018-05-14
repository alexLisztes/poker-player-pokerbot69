class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    if (Math.random() > 0.5){
      bet(500);
    }
    else {
      bet(1000);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
