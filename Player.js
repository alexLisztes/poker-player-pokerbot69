class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    let hand = Parser.startinghand(gameState);
    let cards = Parser.fullhand(gameState);

    if (Parser.headsup(gameState)){
      if (Tormentors.status(gameState) === "active"){
        if (StarterHandExaminer.getNumberOfHighValueCards(hand) > 1 || StarterHandExaminer.isPairInHand(hand)) {
          bet(Parser.to_call(gameState));
        } else {
          bet(0);
        }
      }
    }

    if (Parser.communitycards(gameState).length === 0) {

      if (Tormentors.bet(gameState) > Parser.blinds(gameState)[1]) {
        if (StarterHandExaminer.isThereHighPairInHand(hand)) {
          bet(Math.max(Parser.pot(gameState), Parser.min_raise(gameState)));
        } else {
          bet(0);
        }
      }

      if (StarterHandExaminer.isThereHighPairInHand(hand)) {
        bet(Math.max(Parser.pot(gameState), Parser.min_raise(gameState)));
      } else if (StarterHandExaminer.getNumberOfHighValueCards(hand) > 1) {
        bet(Math.max(Parser.pot(gameState), Parser.min_raise(gameState)));
      } else if (StarterHandExaminer.getNumberOfHighValueCards(hand) > 0 &&
        HandEvaluator.isColorSame(hand[0], hand[1]) &&
        Math.abs([0] - hand[1]) < 2){
        bet(Math.max(Parser.pot(gameState), Parser.min_raise(gameState)));
      } else {
        bet(0);
      }
    } else {
      if (HandEvaluator.isThreeOfAKind(cards) ||
          HandEvaluator.isFlush(cards) ||
          StarterHandExaminer.isThereHighPairInHand(hand) ||
          HandEvaluator.isTwoPair(cards)) {
        bet(Math.max(Parser.pot(gameState), Parser.min_raise(gameState)));
      } else {
        bet(0);
      }
    }

  }

  static showdown(gameState) {
  }
}

module.exports = Player;



///////////////////////////////////////////////////////


class Parser {

  static headsup(game){
    let counter = 0;
    for (let i = 0; i < game.players.length; i ++){
      if (game.players[i].status === "out"){
        counter ++;
      }
    }
    if (counter === 4){
      return true;
    } else {
      return false;
    }
  }

  static fullhand(Game){
    console.log(this.startinghand(Game).concat(this.communitycards(Game)));
    return this.startinghand(Game).concat(this.communitycards(Game));

  }

  static communitycards(Game){
    let game = Game;

    let suit;
    let rank;
    let cards = [];

    for (let i = 0; i < game.community_cards.length; i++) {

      suit = game.community_cards[i].suit;
      rank = game.community_cards[i].rank;

      var c = new card(suit, rank);
      cards.push(c);

    }

    return cards;
  }


  static startinghand(Game) {
    let game = Game;

    let suit;
    let rank;
    let hand = [];

    for (let i = 0; i < 2; i++) {

      suit = game.players[game.in_action].hole_cards[i].suit;
      rank = game.players[game.in_action].hole_cards[i].rank;

      var c = new card(suit, rank);
      hand.push(c);

    }
    return hand


  }

  static  min_raise(Game){
    let game = Game;
    return Game.minimum_raise;
  }

  static pot(Game){
    let game = Game;
    return Game.pot;
  }

  static to_call(Game){
    let game = Game;
    return Game.current_buy_in;
  }

  static blinds(Game){
    let game = Game;

    let small_blind = game.small_blind;
    let big_blind = small_blind * 2;
    let blinds = [];
    blinds.push(small_blind);
    blinds.push(big_blind);
    return blinds;
  }
}

function card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

///////////////////////////////////////////////////////


class StarterHandExaminer {


  static convertToValue(rank){
    if (rank === "J"){
      return 11;
    } else if (rank === "Q") {
      return 12;
    } else if (rank === "K") {
      return 13;
    } else if (rank === "A") {
      return 14;
    }
  }

  static getValueOfStarterHand(cards){

    let charSuits = ["J", "Q", "K", "A"];

    let value = 0;
    for (let i = 0; i < 2; i++) {
      let currentRank = cards[i].rank;
      if (charSuits.includes(currentRank)) {
        value += this.convertToValue(currentRank);
      } else {
        value += parseInt(currentRank);
      }
    }
    return value;
  }

  static getNumberOfHighValueCards(cards){
    let numberOfHighValueCards = 0;
    let highRanks = ["10", "J", "Q", "K", "A"];
    for (let i = 0; i < 2; i++) {
      if (highRanks.includes(cards[i].rank)) {
        numberOfHighValueCards++;
      }
    }
    return numberOfHighValueCards;
  }

  static isThereHighPairInHand(cards){
    return StarterHandExaminer.isPairInHand(cards) && StarterHandExaminer.getValueOfStarterHand(cards) >= 20;
  }

  static isPairInHand(cards){
    return cards[0].rank === cards[1].rank;
  }
}

//////////////////////////////////////////////////////////

class HandEvaluator {

  static isHighHand(hand) {
    for (let card of hand) {
      if (["10", "J", "Q", "K", "A"].includes(card.rank)) return true;
    }
    return false;
  }

  static isPair(hand) {
    for (let i = 0; i < hand.length - 1; i++) {
      for (let j = i + 1; j < hand.length; j++) {
        if (this.isRankSame(hand[i], hand[j])) {
          return true;
        }
      }
    }
    return false;
  };

  static isTwoPair(hand) {
    let numberOfPairs = 0
    for (let i = 0; i < hand.length - 1; i++) {
      for (let j = i + 1; j < hand.length; j++) {
        if ((this.isRankSame(hand[i], hand[j]))) {
          numberOfPairs++;
        }
      }
    }
    if (numberOfPairs > 1) {
      return true;
    }
    return false;
  }

  static isThreeOfAKind(hand) {
    for (let i = 0; i < hand.length - 2; i++) {
      for (let j = i + 1; j < hand.length - 1; j++) {
        for (let k = j + 1; k < hand.length; k++) {
          if (this.isRankSameMultiple(hand[i], hand[j], hand[k])) {
            return true;
          }
        }
      }
    }
    return false;
  };

    static isStraight(hand) {

    let nextRank = this.smallestCard(hand).rank;
    let count = 0;
    let ranks = new Array();
    for (let card of hand) {
      ranks.push(card.rank);
    }

    let i = 0;
    while(i < hand.length) {
      if(ranks.includes(nextRank)) {
        count++;
        switch (nextRank) {
          case "10":
            nextRank = "J";
            break;
          case "J":
            nextRank = "Q";
            break;
          case "Q":
            nextRank = "K";
            break;
          case "K":
            nextRank = "A";
            break;
          case "A":
            nextRank = "2";
            break;
          default:
            nextRank = (parseInt(nextRank) + 1);
            nextRank = nextRank.toString();
            break;
        }
      } else {
        return false;
      }
      i++;
      if (count >= 5) return true;
    }

    return false;
  }

  static isFlush(hand) {
    let i = 0;
    while (i < hand.length) {
      let count = 0;
      let currentCardToCompareWith = hand[i];
      for (let j = 0; j < hand.length; j++) {
        if (this.isColorSame(currentCardToCompareWith, hand[j])) {
          count++;
        }
      }
      if (count === 5) return true;
      i++;
    }
    return false;
  }

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

class Pyker {

  static bet(game){
    let pyker;
    for (let i = 0; i < game.players.length; i ++){
      if (game.players[i].name === "pYker"){
        pyker = game.players[i];
      }
    }

    return pyker.bet;
  }
}

class Tormentors {

  static status(game){
    let torment;
    for (let i = 0; i < game.players.length; i ++){
      if (game.players[i].name === "TorMentors"){
        torment = game.players[i];
      }
    }

    return torment.status;
  }

  static bet(game){
    let torment;
    for (let i = 0; i < game.players.length; i ++){
      if (game.players[i].name === "TorMentors"){
        torment = game.players[i];
      }
    }

    return torment.bet;
  }
}


