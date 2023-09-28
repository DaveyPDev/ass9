function unroll (squareArray) {
	if (!squareArray || squareArray.length === 0) {
		return [];
	  }
	const result = [];
	let top = 0,
		bottom = squareArray.length - 1,
		left = 0,
		right = squareArray[0].length - 1;

	while (top <= bottom && left <= right) {

		//  Top
		for (let i = left; i <= right; i++) {
			result.push(squareArray[top][i]);
		}
		top++;

		//  Right
		for (let i = top; i <= bottom; i++) {
			result.push(squareArray[i][right]);
		}
		right--;

		//  Bottom
		if (top <= bottom) {
			for (let i = right; i >= left; i--) {
				result.push(squareArray[bottom][i]);
			}
			bottom--;
		}

          //  Left
		if (left <= right) {
			for (let i = bottom; i >= top; i--) {
				result.push(squareArray[i][left]);
			}
			left++;
		}

		
	}

	return result;
}


module.exports = unroll;


const square = [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10, 11, 12 ], [ 13, 14, 15, 16 ] ];
console.log(unroll(square)); // Expected: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]

const smallerSquare = [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ], [ 'g', 'h', 'i' ] ];
console.log(unroll(smallerSquare)); // Expected: ["a", "b", "c", "f", "i", "h", "g", "d", "e"]

