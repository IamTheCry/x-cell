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

	calcSum(numCols, numRows) {
		for (let col = 0 ; col < numCols ; col++) {
			let sums = 0;
			for (let row = 0 ; row < numRows ; row++) {
				const value = Number(this.getValue({col: col, row: row}));
				if (!isNaN(value)) {
					sums += value;
					console.log(sums);
				}
			}
		}
	}
}

module.exports = TableModel;