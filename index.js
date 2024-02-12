import readline from "readline";
import Game from "./game.js";

class GameInterface extends Game {
  constructor(moves) {
    super(moves);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.validateMoves();
    this.startGame();
  }

  validateMoves() {
    if (
      this.moves.length < 3 ||
      this.moves.length % 2 === 0 ||
      new Set(this.moves).size !== this.moves.length
    ) {
      console.log(
        "Incorrect parameters. Please provide an odd number >=3 of non-repeating strings."
      );
      console.log("Example: node game.js rock paper scissors");
      process.exit(1);
    }
  }

  startGame() {
    console.log(`HMAC: ${this.hmac}`);
    this.printMovesMenu();

    this.rl.question("Enter your move: ", (userMoveIndex) => {
      if (userMoveIndex === "?") {
        this.printHelpTable();
        this.rl.close();
        return;
      }

      this.processUserInput(userMoveIndex);
    });
  }

  processUserInput(userMoveIndex) {
    userMoveIndex = parseInt(userMoveIndex);

    if (
      isNaN(userMoveIndex) ||
      userMoveIndex < 0 ||
      userMoveIndex > this.moves.length
    ) {
      console.log("Invalid input. Please enter a valid move index.");
      this.rl.close();
      return;
    }

    if (userMoveIndex === 0) {
      console.log("Exiting game...");
      this.rl.close();
      return;
    }

    const userMove = this.moves[userMoveIndex - 1];
    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${this.computerMove}`);

    const winner = this.determineWinner(userMoveIndex - 1);
    console.log(winner);

    console.log(`HMAC key: ${this.key}`);
    this.rl.close();
  }
}

const moves = process.argv.slice(2);

new GameInterface(moves);
