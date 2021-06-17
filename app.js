let squares = [];
const noOfSquares = 10;
const noOfBombs = 10;
let checked = 0;
// win condition should be flags = bombs or checked = noOfSquares*noOfSquares - bombs

//creating two arrays. one with bombs, the other filled so can concat and randomized the bombs
const bombs = Array(noOfBombs).fill("bomb");
const empty = Array(noOfSquares * noOfSquares - noOfBombs).fill("one");
const randomBombs = empty.concat(bombs);
randomBombs.sort(() => 0.5 - Math.random());
//sorting array in random https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
//console.log(randomBombs);

const reset = () => {
  $("#reset").click(() => location.reload());
};

const createBoard = () => {
  for (let i = 0; i < noOfSquares * noOfSquares; i++) {
    const $square = $("<div>").attr("id", i).addClass(randomBombs[i]);
    $(".grid").append($square);
    squares.push($square);

    $square.on("click", () => {
      clicking($square);
    });

    //adding right click https://api.jquery.com/contextmenu/
    $square.on("contextmenu", (e) => {
      e.preventDefault();
      addFlag($square);
    });
  }

  // clicking shows number and marked check or if bomb, reveals all

  const clicking = ($square) => {
    const clickSquare = event.target;
    $square.text($(clickSquare).attr("data")).addClass("checked");
    const numChecked = $(".checked").length;
    //console.log(numChecked);
    //console.log(noOfSquares * noOfSquares - noOfBombs);
    if (numChecked === noOfSquares * noOfSquares - noOfBombs) {
      //flag all bombs, stop timer
      $(".bomb").addClass("flag");
      alert("You Win!");
    }

    //created bomb click and all red
    if ($($square).hasClass("bomb")) {
      $(".bomb").css({ "background-color": "red" }), $(".bomb").text("💣");

      setTimeout(() => {
        alert("game over");
      }, 50);
      // do a loop over the const one and set the one.
      for (let i = 0; i < 100; i++) {
        let one = $(`.one#${i}`);
        one.text(one.attr("data"));
      }
    }
  };

  const addFlag = ($square) => {
    const clickSquare = event.target;
    $square.toggleClass("flag");
    //$(".flag").text("🚩"); //  moved to css
  };

  // create numbers.
  for (let i = 0; i < squares.length; i++) {
    let total = 0;

    const isLeftSide = i % noOfSquares === 0;
    const isRightSide = i % noOfSquares === noOfSquares - 1;

    if (squares[i].hasClass("one")) {
      if (i > 0 && !isLeftSide && squares[i - 1].hasClass("bomb")) total++;
      if (
        i > 9 &&
        !isRightSide &&
        squares[i + 1 - noOfSquares].hasClass("bomb")
      )
        total++;
      if (i > 10 && squares[i - noOfSquares].hasClass("bomb")) total++;

      if (
        i > 11 &&
        !isLeftSide &&
        squares[i - 1 - noOfSquares].hasClass("bomb")
      )
        total++;
      if (i < 99 && !isRightSide && squares[i + 1].hasClass("bomb")) total++;
      if (
        i < 90 &&
        !isLeftSide &&
        squares[i - 1 + noOfSquares].hasClass("bomb")
      )
        total++;
      if (
        i < 89 &&
        !isRightSide &&
        squares[i + 1 + noOfSquares].hasClass("bomb")
      )
        total++;
      if (i < 90 && squares[i + noOfSquares].hasClass("bomb")) total++;
      squares[i].attr("data", total);
    }
  }
};

const main = () => {
  $("body").prepend("<h1>Welcome to Minesweeper!</h1>");
  $("body").append($("<div>").addClass("grid"));
  createBoard();
  reset();

  //console.log(noOfSquares * noOfSquares - noOfBombs);
};

$(main);

// number colours for later
// numberColours = {
//     1: "blue",
//     2: "green",
//     3: "red",
//     4: "purple",
//     5: "maroon",
//     6: "turquoise",
//     7: "black",
//     8: "grey",
//   };
