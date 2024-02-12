import crypto from "crypto";

export default class Game {
  tableHeaderLine;
  key;
  hmac;
  computerMove;

  constructor(moves) {
    this.moves = moves;
  }

  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateComputerMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }

  calculateHMAC(message, key) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }

  printMovesMenu() {
    console.log("Available moves:");
    this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
    console.log("0 - exit");
    console.log("? - help");
  }

  printHelpTable() {
    const tableHeader = ["v PCUser >", ...this.moves];
    const tableRows = tableHeader.map((move) => [move]);

    this.generateHeaderLine(tableHeader);

    console.log("Help table:");
    console.log(`+${this.tableHeaderLine.join("+")}+`);

    this.generateTable(tableHeader, tableRows);
  }

  generateHeaderLine(tableHeader) {
    const sizeColTitle = [...tableHeader].sort((a, b) => b.length - a.length)[0]
      .length;

    this.tableHeaderLine = tableHeader.map((val, i) =>
      i === 0
        ? "-".repeat(Math.max(val.length + 2, sizeColTitle + 2))
        : "-".repeat(val.length + 2 >= 6 ? val.length + 2 : 6)
    );
  }

  generateTable(tableHeader, rows) {
    const { length } = tableHeader;
    const p = Math.floor((length - 1) / 2);

    rows.forEach((ceil, b) => {
      if (b === 0) {
        const header = tableHeader.map((val, i) =>
          ` ${val}`.padEnd(this.tableHeaderLine[i].length, " ")
        );
        console.log(`|${header.join("|")}|`);
        console.log(`+${this.tableHeaderLine.join("+")}+`);
        return;
      }

      const newRows = [];

      for (let i = 0; i < length; i += 1) {
        if (i !== 0) {
          const isWin = Math.sign(
            ((i - b + p + (length - 1)) % (length - 1)) - p
          );

          const result = isWin === 0 ? "Draw" : isWin > 0 ? "Win" : "Loose";

          newRows.push(
            ` ${result}`.padEnd(this.tableHeaderLine[i].length, " ")
          );
        } else {
          newRows.push(
            ` ${ceil[0]}`.padEnd(this.tableHeaderLine[i].length, " ")
          );
        }
      }
      console.log(`|${newRows.join("|")}|`);
      console.log(`+${this.tableHeaderLine.join("+")}+`);
    });
  }

  determineWinner(userMoveIndex) {
    const { length } = this.moves;

    const p = Math.floor(length / 2);

    const computerIndex = this.moves.indexOf(this.computerMove);

    const result = Math.sign(
      ((userMoveIndex - computerIndex + p + length) % length) - p
    );

    return result === 0 ? "Draw" : result > 0 ? "Win" : "Loose";
  }
}
