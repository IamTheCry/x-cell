const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {

	beforeEach(() => {
		// load HTML skeleton from disk and parse into the DOM
		const fixturePath = './client/js/test/fixtures/sheet-container.html';
		const html = fs.readFileSync(fixturePath, 'utf8');
		document.documentElement.innerHTML = html;

	});

	describe('table footer', () => {
		
		it('sums a column and displays it on bottom row', () => {
			// set up initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			view.init();
			view.renderTableFooter();

			// inspect initial state
			let footerRow = document.querySelectorAll('TFOOT TD');
 	    expect(footerRow.length).toBe(3);
  
			// simulate user action
			model.setValue({col: 2, row: 0}, '2');
      model.setValue({col: 2, row: 1}, '3');
      model.setValue({col: 2, row: 2}, '5');
      view.renderTableBody();
      view.renderTableFooter();

      // inspect the resulting table state
      let rows = document.querySelectorAll('TBODY TR');
      expect(rows[2].textContent).toBe('5');
      view.renderTableFooter();

			// inspect the resulting footer state

			const footerCells = document.querySelectorAll('TFOOT TD');
      expect(footerCells[2].textContent).toBe('10');
  		})

			it('sums a column and displays it on bottom row', () => {
			// set up initial state
			const model = new TableModel(4, 4);
			const view = new TableView(model);
			view.init();
			//view.renderTableFooter();

			// inspect initial state
			let footerRow = document.querySelectorAll('TFOOT TD');
 	    expect(footerRow.length).toBe(4);
  
			// simulate user action
			model.setValue({col: 2, row: 0}, '2');
      model.setValue({col: 1, row: 2}, '3');
      model.setValue({col: 2, row: 2}, '5');
      view.renderTableBody();
      view.renderTableFooter();

      // inspect the resulting table state
      let rows = document.querySelectorAll('TBODY TR');
      expect(rows[2].cells[2].textContent).toBe('5');
      //view.renderTableFooter();

			// inspect the resulting footer state

			const footerCells = document.querySelectorAll('TFOOT TD');
      expect(footerCells[2].textContent).toBe('7');
  		})
	})

	describe('formula bar', () => {

		it('makes changes TO the value of the current cell', () => {
			// set up the initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			view.init();

			// inspect the initial state
			let trs = document.querySelectorAll('TBODY TR');
			let td = trs[0].cells[0];
			expect(td.textContent).toBe('');

			// simulate user action
			document.querySelector('#formula-bar').value = '65';
			view.handleFormulaBarChange();

			// inspect the resulting state
			trs = document.querySelectorAll('TBODY TR');
			expect(trs[0].cells[0].textContent).toBe('65');

		})



		it('updates FROM the value of the current cell', () => {
			// set up the initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			model.setValue({col: 2, row: 1}, '123');
			view.init()

			// inspect the initial state
			const formulaBarEl = document.querySelector('#formula-bar');
			expect(formulaBarEl.value).toBe('');

			// simulate user action
			const trs = document.querySelectorAll('TBODY TR');
			trs[1].cells[2].click();

			// inspect the resulting state
			expect(formulaBarEl.value).toBe('123');
		});
	});

	describe('table body', () => {
		it('highlights the current cell when clicked', () => {
			// set up the initial state
			const model = new TableModel(10, 5);
			const view = new TableView(model);
			view.init();

			// inspect the initial state
			let trs = document.querySelectorAll('TBODY TR');
			let td = trs[2].cells[3];
			expect(td.className).toBe('');

			// simulate user action
			td.click();

			// inspect the resulting state
			trs = document.querySelectorAll('TBODY TR');
			td = trs[2].cells[3];
			expect(td.className).not.toBe('');

		});

		it('has the right size', () => {
			// set up the initial state
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols,numRows);
			const view = new TableView(model);
			view.init();

			// inspect the initial state
			let ths = document.querySelectorAll('THEAD TH');
			expect(ths.length).toBe(numCols);

		});
		it('fills in valules from the model', () => {
			// set up the initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			model.setValue({col: 2, row: 1}, '123')
			view.init();
			// inspect the initial state
			const trs = document.querySelectorAll('TBODY TR');
			expect(trs[1].cells[2].textContent).toBe('123');

		})
	})

	describe('table header', () => {
		it('has valid column header labels', () => {
			// set up the initial state
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();
			// inspect the initial state
			let ths = document.querySelectorAll('THEAD TH');
			expect(ths.length).toBe(numCols);

			let labelTexts = Array.from(ths).map(el => el.textContent);
			expect(labelTexts).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
		});
	});
});