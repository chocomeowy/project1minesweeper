let squares = [];
const noOfSquares = 10;
const noOfBombs = 10;
let gameOver = false;
let checked = 0;
let flags = 0;
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
      //console.log($(clickSquare).attr("data"));
      //console.log(checked);

      clicking($square);
    });

    //adding right click https://api.jquery.com/contextmenu/
    $square.on("contextmenu", (e) => {
      e.preventDefault();
      addFlag($square);
    });
  }
  //created bomb click and all red

  const clicking = ($square) => {
    const clickSquare = event.target;
    $square.text($(clickSquare).attr("data"));
    checked++;
    //console.log(checked);
    //console.log($(".one").attr("data"));
    if (gameOver) return;
    if ($($square).hasClass("bomb")) {
      $(".bomb").css({ "background-color": "red" }), $(".bomb").text("💣");

      setTimeout(() => {
        alert("game over");
      }, 50);
      $(".one").text($(".one").attr("data"));
      gameOver = true;
    }
  };

  const addFlag = ($square) => {
    const clickSquare = event.target;
    if (true) {
      $square.removeClass().addClass("flag");
      $square.text("🚩");
      flags++;
      console.log(flags);
    } else {
      $square.removeClass();
      $square.text("F");
      flags--;
    }
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
      if (i < 98 && !isRightSide && squares[i + 1].hasClass("bomb")) total++;
      if (
        i < 90 &&
        !isLeftSide &&
        squares[i - 1 + noOfSquares].hasClass("bomb")
      )
        total++;
      if (
        i < 88 &&
        !isRightSide &&
        squares[i + 1 + noOfSquares].hasClass("bomb")
      )
        total++;
      if (i < 89 && squares[i + noOfSquares].hasClass("bomb")) total++;
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

// const checkWinning = () => {
//     if (flags === noOfBombs) {
//       alert("You Win");
//     } else if (checked === noOfSquares * noOfSquares - noOfBombs) {
//       alert("You Win");
//     }
//   };
//   checkWinning();

//   $(".bomb").click(() => {
//     $(".bomb").css({ "background-color": "red" }),
//       setTimeout(() => {
//         alert("game over");
//       }, 500);
//     gameOver = True;
//   });

//   $("squares.data").click(() =>
//     $("squares.data").css({ "background-color": "red" })
//   );
//$(".data").innerHTML =

//console.log(squares.length); 100

// const bombing = () => {
//   $(".bomb").click(() => $(".bomb").css({ "background-color": "red" }));
//   $(".bomb").click(() =>
//     setTimeout(() => {
//       alert("game over"), 500;
//     })
//   );
// };

// const totalNum = () => {
//   let total = $(".1").getAttribute("data");
//   if (total !== 0) {
//     $square.addClass("checked");
//     $square.innerHTML = total;
//     return;
//   }
// };

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
