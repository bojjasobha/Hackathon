var ExpensesTracker = /** @class */ (function () {
    function ExpensesTracker() {
        this.expenses = [];
        this.expenseList = document.getElementById('expense-list');
        this.expenseForm = document.getElementById('expense-form');
        this.expenseNameInput = document.getElementById('expense-name');
        this.expenseAmountInput = document.getElementById('expense-amount');
        this.expenseForm.addEventListener('submit', this.addExpense.bind(this));
    }
    ExpensesTracker.prototype.addExpense = function (event) {
        event.preventDefault();
        var name = this.expenseNameInput.value;
        var amount = parseFloat(this.expenseAmountInput.value);
        if (name === '' || isNaN(amount) || amount <= 0) {
            alert('Please enter valid name and amount');
            return;
        }
        var newExpense = {
            id: Date.now(),
            name: name,
            amount: amount
        };
        this.expenses.push(newExpense);
        this.renderExpenses();
        this.expenseNameInput.value = '';
        this.expenseAmountInput.value = '';
    };
    ExpensesTracker.prototype.deleteExpense = function (id) {
        this.expenses = this.expenses.filter(function (expense) { return expense.id !== id; });
        this.renderExpenses();
    };
    ExpensesTracker.prototype.renderExpenses = function () {
        var _this = this;
        this.expenseList.innerHTML = '';
        var _loop_1 = function (expense) {
            var li = document.createElement('li');
            li.textContent = "".concat(expense.name, ": $").concat(expense.amount.toFixed(2), ";");
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () { return _this.deleteExpense(expense.id); };
            li.appendChild(deleteButton);
            this_1.expenseList.appendChild(li);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var expense = _a[_i];
            _loop_1(expense);
        }
    };
    return ExpensesTracker;
}());
document.addEventListener('DOMContentLoaded', function () {
    new ExpensesTracker();
});
