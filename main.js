//clase Board
(function () {
  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = true;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  self.Board.prototype = {
    get elements() {
      var elements = this.bars.map(function (bar) {
          return bar;
      });
      elements.push(this.ball);
      return elements;
    },
  };
})();

//pelota
(function () {
    self.Ball=function(x,y,radius,board) {
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.board=board;
        this.speed_y=0;
        this.speed_x=3;
        this.board.ball=this;
        this.kind="circle"
        this.direccion=1;
    }
    self.Ball.prototype={
        move: function(){
            this.x+=(this.speed_x * this.direccion );
            this.y+=(this.speed_y);
        },
    }

    /*self.Ball.prototype{

    }*/
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
      return "x: " + this.x + "y: " + this.y;
    },
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
    clean: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    },
    draw: function () {
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];
        draw(this.ctx, el);
      }
    },
    play: function () {
        if(this.board.playing){
        this.clean();
        this.draw();
        this.board.ball.move();
        }
    }
  };

  function draw(ctx, element) {
    //hasOwnProperty dice si tiene una propiedad kind

    switch (element.kind) {
    case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
    case "circle":
        ctx.beginPath();
        ctx.arc(element.x,element.y,element.radius,0,7);
        ctx.fill();
        ctx.closePath();
        break;
    }
  }
})();

var board = new Board(800, 400);
var barLeft = new Bar(10, 100, 40, 150, board);
var barRight = new Bar(750, 100, 40, 150, board);
var canvas = document.getElementById("canvas");
var board_view = new BoardView(canvas, board);
var ball=new Ball(350,100,10,board);

document.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (ev.key === "ArrowDown") {
    ev.preventDefault();
    barRight.down();
  } else if (ev.key === "ArrowUp") {
    ev.preventDefault();
    barRight.up();
  }
  if (ev.key === "w") {
    ev.preventDefault();
    barLeft.up();
  } else if (ev.key === "s") {
    ev.preventDefault();
    barLeft.down();
  }
  if(ev.key===" "){
    ev.preventDefault();
    board.playing=!board.playing;
  }
});

board_view.play();
window.requestAnimationFrame(controller);
//self=window
function controller() {
    board_view.play();
  window.requestAnimationFrame(controller);
}
