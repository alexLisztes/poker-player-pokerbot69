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

  static isThereHighPairInHand(){
    return StarterHandExaminer.isPairInHand(cards) && StarterHandExaminer.getValueOfStarterHand(cards) >= 20;
  }

  static isPairInHand(cards){
    return cards[0].rank === cards[1].rank;
  }
}

