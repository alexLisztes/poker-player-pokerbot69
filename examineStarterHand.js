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

  static getValueOfStarterHand(){
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

  static isPairInHand(){
    return cards[0].rank === cards[1].rank;
  }
}

function defineFirstBet(){
  let highValue = 20;
  if (StarterHandExaminer.isPairInHand() && StarterHandExaminer.getValueOfStarterHand() > highValue){
    //High bet
  } else if (StarterHandExaminer.isPairInHand() || StarterHandExaminer.getValueOfStarterHand() > highValue) {
    //Medium bet
  } else {
    //Small bet
  }
}


  let cards = Parser.startinghand();
  let charSuits = ["J", "Q", "K", "A"];
