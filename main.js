//clase Board
(function () {
  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.paying = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  self.Board.prototype = {
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    },
  };
})();
//barras
(function () {
  self.Bar = function (x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 10;
  };
  self.Bar.prototype = {
    down: function () {
      this.y += this.speed;
    },
    up: function () {
      this.y -= this.speed;
    },
    toString: function (params) {
        return "x: "+this.x+"y: "+this.y;
    }
  };
})();
//clase BoardView-vista
//Se asignan los valores del canvas
(function () {
  BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  };

  self.BoardView.prototype = {
    draw: function () {
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];
        draw(this.ctx, el);
      }
    },
  };

  function draw(ctx, element) {
    //hasOwnProperty dice si tiene una propiedad kind
    if (element !== null && element.hasOwnProperty("kind")) {
      switch (element.kind) {
        case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
      }
    }
  }
})();

var board = new Board(800, 400);
var barLeft = new Bar(10, 100, 40, 150, board);
var barRight = new Bar(750, 100, 40, 150, board);
var canvas = document.getElementById("canvas");
var board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowDown") {
      barLeft.up();
    } else if (ev.key === "ArrowUp") {
      barLeft.down();
    }
    if (ev.key === "w") {
        barRight.up();
    } else if (ev.key === "s") {
        barRight.down();
    }
  });

self.addEventListener("load", main);

//self=window
function main() {
  board_view.draw();
}

