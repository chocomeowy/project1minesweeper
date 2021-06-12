let squares = [];
const noOfSquares = 10;
const noOfBombs = 10;

const createBoard = () => {
  for (let i = 0; i < noOfSquares * noOfSquares; i++) {
    const $square = $("<div>").attr("id", i);
    $(".grid").append($square);
    squares.push($square);
  }

  const bombs = Array(noOfBombs).fill("bomb");
  const empty = Array(noOfSquares * noOfSquares).fill("1");
  console.log(bombs);
  console.log(empty);
};

const main = () => {
  $("body").prepend("<h1>Welcome to Minesweeper!</h1>");
  $("body").append($("<div>").addClass("grid"));
  createBoard();
};

$(main);
