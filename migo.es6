class Board {
  constructor(rows, size) {
    this.board_rows = rows || Board.BOARD_ROWS;
    this.board_size = size || Board.BOARD_SIZE;
    this.piece_diameter = this.board_size / this.board_rows;

    this.board_state = new Array(this.board_rows);

    for (let row = 0; row < this.board_rows; row++) {
      this.board_state[row] = new Array(this.board_rows).fill(Board.EMPTY);
    }
  }

  is_on_board(x, y) {
    return this.board_state[x] != null && this.board_state[x][y] != null;
  }

  is_legal_move(x, y) {
    return this.is_on_board(x, y) && this.board_state[x][y] == Board.EMPTY;
  }

  get_group(x, y, exclude) {
    if (!exclude) { exclude = [] };

    let this_color = board_state[x][y];
    let same_nearby = around(x, y).filter( (elem) => {
      return elem.join() != exclude.join() && board_state[elem[0]][elem[1]] == this_color;
    });

    if (!same_nearby.length){
      return [[x, y]];
    } else {
      return [[x, y]].concat(same_nearby.map( (elem) => {
        return get_group(elem[0], elem[1], [x, y]);
      }));
    }
  }

  around(x, y) {
    let nearby = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ]

    return nearby.filter( (elem, idx, array) => {
      return this.is_on_board(elem[0], elem[1]);
    })
  }

  any_liberties(x, y) {
    let this_color = board_state[x][y];
    return !!around(x, y).filter( (elem, idx, array) => {
      return board_state[elem[0]][elem[1]] == EMPTY;
    })[0];
  }

  check_kills() {

  }
}

Board.EMPTY = 'e';
Board.BOARD_ROWS = 13;
Board.BOARD_SIZE = 600;
