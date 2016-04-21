var EMPTY = "e";
var BOARD_ROWS = 13;
var BOARD_SIZE = 600;
var PIECE_DIAMETER = BOARD_SIZE / BOARD_ROWS;

var board_state = new Array(BOARD_ROWS);
for (var i = 0; i < BOARD_ROWS; i++) {
  board_state[i] = new Array(BOARD_ROWS).fill(EMPTY)
}
var canvas = document.getElementById("board");
canvas.width = 600;
canvas.height = 600;

var ctx = canvas.getContext("2d");
var whos_turn = true;

var is_on_board = function(x, y){
  return board_state[x] != null && board_state[x][y] != null;
}

var is_legal_move = function(x, y){
  return is_on_board(x, y) && board_state[x][y] == EMPTY;
}

var get_group = function(x, y, exclude){
  if (!exclude){ exclude = [] };
  var this_color = board_state[x][y];
  var same_nearby = around(x, y).filter(function(elem){
    return elem.join() != exclude.join() && board_state[elem[0]][elem[1]] == this_color
  });
  if (!same_nearby.length){
    return [[x, y]]
  } else {
    return [[x, y]].concat(same_nearby.map(function(elem){
      return get_group(elem[0], elem[1], [x, y])
    }));
  }
}

var around = function(x, y){
  var nearby = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ] 
  return nearby.filter(function(elem, idx, array){
    return is_on_board(elem[0], elem[1])
  });
}

var any_liberties = function(x, y){
  var this_color = board_state[x][y];
  return !!around(x, y).filter(function(elem, idx, array){
    board_state[elem[0]][elem[1]] == EMPTY  
  })[0];
}

var check_kills = function(){

}



$(canvas).click(function(e){
  var x = Math.floor( (e.pageX - $(this).offset().left) / PIECE_DIAMETER); 
  var y = Math.floor( (e.pageY - $(this).offset().top ) / PIECE_DIAMETER);
  if (is_legal_move(x, y)) {
    board_state[x][y] = whos_turn;

    x = x * PIECE_DIAMETER + PIECE_DIAMETER / 2;
    y = y * PIECE_DIAMETER + PIECE_DIAMETER / 2;

    ctx.beginPath();
    ctx.arc(x, y, PIECE_DIAMETER/2, 0, 2*Math.PI);
    if (whos_turn) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fill()
    whos_turn = !whos_turn;    
  }
});