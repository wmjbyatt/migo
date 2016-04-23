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

    let this_color = this.board_state[x][y];
    let same_nearby = this.around(x, y).filter( (elem) => {
      return elem.join() != exclude.join() && this.board_state[elem[0]][elem[1]] == this_color;
    });

    let xy = [x, y];
    let group = [xy]

    if (!same_nearby.length){
      return group;
    } else {
      same_nearby.forEach( (elem) => {
        group = group.concat(this.get_group(elem[0], elem[1], xy));
      });

      return group;
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

  test_get_group(){
    this.board_state[1][1] = true;
    this.board_state[1][2] = true;
    this.board_state[1][3] = true;
    this.board_state[1][4] = true;
    
    let group = JSON.stringify(this.get_group(1, 1));

    if (!(group == '[[1,1],[1,2],[1,3],[1,4]]')) {
      throw 'failed: ' + group;
    } else {
      console.log('passed: ' + group);
    }
  }
}

Board.EMPTY = 'e';
Board.BOARD_ROWS = 13;
Board.BOARD_SIZE = 600;
