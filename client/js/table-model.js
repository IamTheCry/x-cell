class TableModel {
	constructor(numCols = 10, numRows = 20) {
		this.numCols = numCols;
		this.numRows = numRows;
		this.data = {};

	}

	_getCellID(location) {
		return `${location.col}:${location.row}`;		
	}

	getValue(location) {
		return this.data[this._getCellID(location)];
	}

	setValue(location, value) {
		this.data[this._getCellID(location)] = value;
	}

	calcColumnSum(col) {
		let sums = 0;
		for (let row = 0 ; row < this.numRows ; row++) {
			let value = Number(this.getValue({col: col, row: row}));
			if (!isNaN(value)) {
				sums += value;
			}
		}return sums;

		
			// for (let row = 0 ; row < this.numRows ; row++) {
			// 	this.position = {col: col, row: row};
			// 	const sums = 0;
			// 	const value = Number(this.getValue(position));
			// 	if (!isNaN(value)) {
			// 		sums += value;
			// 	}return sums;
			// }
	}
}

module.exports = TableModel;