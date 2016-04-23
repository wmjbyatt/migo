describe("Smoke metatest", () => {
  it("Doesn't fucking die", () => {
    chai.expect(document).to.exist;
  })
})

describe("Board", () => {
  describe("get_group(x, y, exclue)", () => {
    it('Gets all grouped stones', () => {
      board = new Board();

      board.board_state[1][1] = true;
      board.board_state[1][2] = true;
      board.board_state[1][3] = true;
      board.board_state[1][4] = true;

      // this is stupid, because JS array comparisons
      // are stupid. Libraries like underscore import
      // better JS comparison techniques. We will use
      // those at some point.
      let group = JSON.stringify(board.get_group(1, 1));

      let expectation = JSON.stringify([
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4]
      ]);

      expect(group).to.be.equal(expectation);
    })
  })
})
