//clase Board
(function(){
        self.Board = function(width,height){
        this.width=width;
        this.height=height;
        this.paying=false;
        this.game_over=false;
    }

    self.Board.prototype={
        get elements(){
            var elements=this.bar;
            elements.push(ball);
            return elements;
        }
    }

})();
//clase BoardView
(function(){
    BoardView=function(canvas,board){
        this.canvas=canvas;
        this.canvas.width=board.width;
        this.canvas.height=board.height;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
})()

self.addEventListener("load",main)
//self==window
function main(){
var board= new Board(800,400);
var canvas=document.getElementById('canvas');
var board_view=new BoardView(canvas,board);
}