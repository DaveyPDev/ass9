const unroll = require("./unroll");

describe("#unroll", function () {
  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("returns an empty array for an empty input array", function () {
    expect(unroll([])).toEqual([]);
  });

  it("correctly unrolls a 2x2 square array", function () {
    const square = [
      [1, 2],
      [3, 4]
    ];
    expect(unroll(square)).toEqual([1, 2, 4, 3]);
  });

  it("correctly unrolls a 3x3 square array", function () {
    const square = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    expect(unroll(square)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it("correctly unrolls a 4x4 square array", function () {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    expect(unroll(square)).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });

  it("correctly unrolls a square array with non-numeric values", function () {
    const square = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    expect(unroll(square)).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"]);
  });
});
