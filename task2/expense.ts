interface Expense {
    id: number;
    name: string;
    amount: number;
}

class ExpensesTracker {
    private expenses: Expense[] = [];
    private expenseList: HTMLUListElement;
    private expenseForm: HTMLFormElement;
    private expenseNameInput: HTMLInputElement;
    private expenseAmountInput: HTMLInputElement;

    constructor() {
        this.expenseList = document.getElementById('expense-list') as HTMLUListElement;
        this.expenseForm = document.getElementById('expense-form') as HTMLFormElement;
        this.expenseNameInput = document.getElementById('expense-name') as HTMLInputElement;
        this.expenseAmountInput = document.getElementById('expense-amount') as HTMLInputElement;

        this.expenseForm.addEventListener('submit', this.addExpense.bind(this));
    }

    private addExpense(event: Event): void {
        event.preventDefault();

        const name = this.expenseNameInput.value;
        const amount = parseFloat(this.expenseAmountInput.value);

        if (name === '' || isNaN(amount) || amount <= 0) {
            alert('Please enter valid name and amount');
            return;
        }

        const newExpense: Expense = {
            id: Date.now(),
            name,
            amount
        };

        this.expenses.push(newExpense);
        this.renderExpenses();

        this.expenseNameInput.value = '';
        this.expenseAmountInput.value = '';
    }

    private deleteExpense(id: number): void {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.renderExpenses();
    }

    private renderExpenses(): void {
        this.expenseList.innerHTML = '';

        for (const expense of this.expenses) {
            const li = document.createElement('li');
            li.textContent = `${expense.name}: $${expense.amount.toFixed(2)};`

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => this.deleteExpense(expense.id);

            li.appendChild(deleteButton);
            this.expenseList.appendChild(li);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExpensesTracker();
});