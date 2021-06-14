let squares = [];
const noOfSquares = 10;
const noOfBombs = 50;

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

//creating two arrays. one with bombs, the other filled so can concat and randomized the bombs
const bombs = Array(noOfBombs).fill("bomb");
const empty = Array(noOfSquares * noOfSquares - noOfBombs).fill("1");
const randomBombs = empty.concat(bombs);
randomBombs.sort(() => 0.5 - Math.random());
//sorting array in random https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
//console.log(randomBombs);

const reset = () => {
  $("#reset").click(() => location.reload());
};

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

const createBoard = () => {
  for (let i = 0; i < noOfSquares * noOfSquares; i++) {
    const $square = $("<div>").attr("id", i).addClass(randomBombs[i]);
    $(".grid").append($square);
    squares.push($square);

    $square.on("click", (event) => {
      const clickSquare = event.target;

      console.log($(clickSquare).attr("data"));
      $square.text($(clickSquare).attr("data"));
    });
  }
  //created bomb click and all red
  $(".bomb").click(() => $(".bomb").css({ "background-color": "red" }));
  $(".bomb").click(() => {
    setTimeout(() => {
      alert("game over"), 500;
    });
  });

  //   $("squares.data").click(() =>
  //     $("squares.data").css({ "background-color": "red" })
  //   );
  //$(".data").innerHTML =

  //console.log(squares.length); 100
  // create numbers.
  for (let i = 0; i < squares.length; i++) {
    let total = 0;

    const isLeftSide = i % noOfSquares === 0;
    const isRightSide = i % noOfSquares === noOfSquares - 1;

    if (squares[i].hasClass("1")) {
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
};

$(main);
