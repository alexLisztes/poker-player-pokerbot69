class HandEvaluator {

  static isPair(hand) {
    for(let i = 0; i < hand.length-1; i++) {
      for(let j = i+1; j < hand.length; j++) {
        if (this.isRankSame(hand[i], hand[j])) {
          return true;
        }
      }
    }
    return false;
  };

  static isThreeOfAKind(hand) {
    for (let i = 0; i < hand.length-2; i++) {
      for (let j = i+1; j < hand.length-1; j++) {
        for (let k = j+1; k < hand.length; k++) {
          if (this.isRankSameMultiple(hand[i], hand[j], hand[k])){
            return true;
          }
        }
      }
    }
    return false;
  };





  static isColorSame(card1, card2) {
    return card1.suit === card2.suit;
  };

  static isColorSameMultiple(...cards) {
    let same = true;
    let i = 1;
    while (i < cards.length && same) {
      same = cards[i].suit === cards[i-1].suit;
      i++;
    }
    return same;
  }

  static isRankSameMultiple(...cards) {
    let same = true;
    let i = 1;
    while (i < cards.length && same) {
      same = cards[i].rank === cards[i-1].rank;
      i++;
    }
    return same;
  }

  static isRankSame(card1, card2) {
    return card1.rank === card2.rank;
  };
}
