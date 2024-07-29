import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { service } from '@ember/service';

export default class Board extends Component {
  @service gameInitialData;
  @tracked board = A(['', '', '', '', '', '', '', '', '']);
  //TODO give the option to change the first to move
  @tracked turn = this.gameInitialData.gameInfo.first;
  @tracked movesPlayed = 0;
  @tracked boardDisabled = false;
  //When the game is over, if this remains false, then the game tied
  @tracked winner = false;

  winningStates = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
  ];

  @action handleClick(square) {
    if (this.board[square] == '' && !this.boardDisabled) {
      if (this.turn == 'X') {
        this.makeMove(square, 'X');
      } else {
        this.makeMove(square, 'O');
      }
    }
    // return this.boardDisabled;
  }

  //make the move, check if there is a winner, check if tied, continue play
  makeMove = (square, player) => {
    this.board.replace(square, 1, [player]);
    //Check is there is a winner
    if (this.checkWinner(player)) {
      console.log('Winner is ' + player);
      this.winner = true;
      this.disableBoard();
    }
    this.movesPlayed++;
    //Check if the game is tied
    if (this.movesPlayed == 9) {
      console.log('Game is tied');
      this.disableBoard();
    }
    //Game is not over
    if (!this.boardDisabled) {
      this.turn = player == 'X' ? 'O' : 'X';
    } else {
      //Game is over, persist on database
      this.postGame(player);
    }
  };
  checkWinner = (player) => {
    let won = false;
    //Create array with the current player's positions
    let currentBoard = this.board
      .map((e, i) => {
        if (e == player) {
          return i;
        } else {
          return;
        }
      })
      .join('')
      .split('');

    //No winner if there is no 3 plays of the same player on the board
    if (currentBoard.length < 3) return false;

    //Check if the current player has a winning board on his array
    this.winningStates.every((winningArray) => {
      let count = 0;
      if (won) {
        return false;
      }
      //The every() function behaves exactly like forEach(), except it stops iterating through the array whenever the callback function returns a falsy value.
      winningArray.every((e) => {
        if (!currentBoard.includes(e)) {
          return false;
        } else {
          count++;
          won = count == 3 ? true : false;
          return true;
        }
      });
      return true;
    });
    return won;
  };

  @action resetBoard() {
    this.board = A(['', '', '', '', '', '', '', '', '']);
    this.turn = this.gameInitialData.gameInfo.first;
    this.movesPlayed = 0;
    this.winner = false;
    this.enableBoard();
  }
  disableBoard = () => {
    this.boardDisabled = true;
  };
  enableBoard = () => {
    this.boardDisabled = false;
  };

  //Set the Horizontal board lines
  isHorizontal = (index) => {
    if ([3, 4, 5].includes(index)) {
      return true;
    } else {
      return false;
    }
  };

  //Set the Vertical board lines
  isVertical = (index) => {
    if ([1, 4, 7].includes(index)) {
      return true;
    } else {
      return false;
    }
  };

  //Gets a player name by it's "symbol" (X or O)
  getPlayerName = (p) => {
    return p == 'X'
      ? this.gameInitialData.gameInfo.playerX != ''
        ? this.gameInitialData.gameInfo.playerX
        : 'Player X'
      : this.gameInitialData.gameInfo.playerO != ''
        ? this.gameInitialData.gameInfo.playerO
        : 'Player O';
  };

  postGame = async (player) => {
    try {
      const response = await fetch('http://localhost:3000/games', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          winner: this.winner ? this.getPlayerName(player) : null,
          loser: this.winner
            ? player == 'X'
              ? this.getPlayerName('O')
              : this.getPlayerName('X')
            : null,
          moves: this.movesPlayed,
          draw: this.winner
            ? null
            : [this.getPlayerName('X'), this.getPlayerName('O')].join(', '),
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
}
