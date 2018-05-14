class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let cards = Parser.fullhand(gameState);

    if (HandEvaluator.isThreeOfAKind(cards)){
      bet(1000);
    } else if (HandEvaluator.isPair(cards)) {
      bet(100);
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
