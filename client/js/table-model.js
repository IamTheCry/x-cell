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
}

module.exports = TableModel;