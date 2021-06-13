let squares = [];
const noOfSquares = 10;
const noOfBombs = 10;

//creating two arrays. one with bombs, the other filled so can concat and randomized the bombs
const bombs = Array(noOfBombs).fill("bomb");
const empty = Array(noOfSquares * noOfSquares - noOfBombs).fill("1");
const randomBombs = empty.concat(bombs);
randomBombs.sort(() => 0.5 - Math.random());
//sorting array in random https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
//console.log(randomBombs);

const createBoard = () => {
  for (let i = 0; i < noOfSquares * noOfSquares; i++) {
    const $square = $("<div>").attr("id", i).addClass(randomBombs[i]);
    $(".grid").append($square);
    squares.push($square);
  }

  $(".bomb").click(() => console.log("bomb clicked"));
};

const reset = () => {
  $(".reset").onclick(createBoard());
};

const main = () => {
  $("body").prepend("<h1>Welcome to Minesweeper!</h1>");
  $("body").append($("<div>").addClass("grid"));

  createBoard();
};

$(main);
