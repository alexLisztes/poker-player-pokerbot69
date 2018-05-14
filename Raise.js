class Raise {

  static smallraise(game){
    console.log(Raise.raise(game, 3, 2, 0.5, 2));
    return Raise.raise(game, 3, 2, 0.5, 2);
  }

  static mediumraise(game){
    console.log(Raise.raise(game, 4, 3, 0.7, 3));
    return Raise.raise(game, 4, 3, 0.7, 3);
  }

  static bigraise(game){
    console.log(Raise.raise(game, 5, 4, 1.2, 4));
    return Raise.raise(game, 5, 4, 1.2, 4);
  }

  static allin(game){
    console.log(Raise.raise(game, 1000, 1000, 1000, 1000));
    return Raise.raise(game, 1000, 1000, 1000, 1000);
  }


  static raise(game, preflop_first, preflop_reraise, postflop_first, postflop_reraise) {

    if (Parser.communitycards(game).length === 0){
      if (Parser.to_call(game) === Parser.blinds(game)[1]) {
        return Math.max(Parser.blinds(game)[1] * preflop_first, Parser.min_raise(game));
      } else {
        return Math.max(Parser.to_call(game) * preflop_reraise, Parser.min_raise(game));
      }
    } else {
      if (Parser.to_call() === 0){
        console.log("TEST ALMAFA - To call is up to date, or previous value is stuck");
        return Math.max(Parser.pot(game) * postflop_first, Parser.min_raise(game));
      } else {
        return Math.max(Parser.to_call(game) * postflop_reraise, Parser.min_raise(game));
      }
    }
  }
}

data = {
    "tournament_id": "550d1d68cd7bd10003000003",     // Id of the current tournament

    "game_id": "550da1cb2d909006e90004b1",           // Id of the current sit'n'go game. You can use this to link a
                                                     // sequence of game states together for logging purposes, or to
                                                     // make sure that the same strategy is played for an entire game

    "round": 0,                                      // Index of the current round within a sit'n'go

    "bet_index": 0,                                  // Index of the betting opportunity within a round

    "small_blind": 10,                              // The small blind in the current round. The big blind is twice the
                                                    //     small blind

    "current_buy_in": 320,                          // The amount of the largest current bet from any one player

    "pot": 400,                                     // The size of the pot (sum of the player bets)

    "minimum_raise": 240,                           // Minimum raise amount. To raise you have to return at least:
                                                    //     current_buy_in - players[in_action][bet] + minimum_raise

    "dealer": 1,                                    // The index of the player on the dealer button in this round
                                                    //     The first player is (dealer+1)%(players.length)

    "orbits": 7,                                    // Number of orbits completed. (The number of times the dealer
                                                    //     button returned to the same player.)

    "in_action": 1,                                 // The index of your player, in the players array

    "players": [                                    // An array of the players. The order stays the same during the
      {                                           //     entire tournament

        "id": 0,                                // Id of the player (same as the index)

        "name": "Albert",                       // Name specified in the tournament config

        "status": "active",                     // Status of the player:
                                                //   - active: the player can make bets, and win the current pot
                                                //   - folded: the player folded, and gave up interest in
                                                //       the current pot. They can return in the next round.
                                                //   - out: the player lost all chips, and is out of this sit'n'go

        "version": "Default random player",     // Version identifier returned by the player

        "stack": 1010,                          // Amount of chips still available for the player. (Not including
                                                //     the chips the player bet in this round.)

        "bet": 320                              // The amount of chips the player put into the pot
      },
      {
        "id": 1,                                // Your own player looks similar, with one extension.
        "name": "Bob",
        "status": "active",
        "version": "Default random player",
        "stack": 1590,
        "bet": 80,
        "hole_cards": [                         // The cards of the player. This is only visible for your own player
          //     except after showdown, when cards revealed are also included.
          {
            "rank": "6",                    // Rank of the card. Possible values are numbers 2-10 and J,Q,K,A
            "suit": "hearts"                // Suit of the card. Possible values are: clubs,spades,hearts,diamonds
          },
          {
            "rank": "K",
            "suit": "spades"
          }
        ]
      },
      {
        "id": 2,
        "name": "Chuck",
        "status": "out",
        "version": "Default random player",
        "stack": 0,
        "bet": 0
      }
    ],
    "community_cards": [ ]
  };

Raise.smallraise(data);
