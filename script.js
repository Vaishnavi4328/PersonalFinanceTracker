// Dark Mode Toggle
const toggleBtn = document.getElementById('toggle-btn');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
});

// Expense Tracking Variables
let expenses = [];
let budget = 0;
let goals = [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseChartCanvas = document.getElementById('expenseChart');
const budgetInput = document.getElementById('budget-input');
const setBudgetBtn = document.getElementById('set-budget-btn');
const goalNameInput = document.getElementById('goal-name');
const goalAmountInput = document.getElementById('goal-amount');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalList = document.getElementById('goal-list');

// Add Expense
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (name && amount && category) {
        expenses.push({ name, amount, category });
        updateExpenseChart();
    }

    expenseName.value = '';
    expenseAmount.value = '';
});

// Set Budget
setBudgetBtn.addEventListener('click', () => {
    budget = parseFloat(budgetInput.value);
    budgetInput.value = '';
    alert(`Budget set to $${budget}`);
    updateExpenseChart();
});

// Add Goal
addGoalBtn.addEventListener('click', () => {
    const goalName = goalNameInput.value;
    const goalAmount = parseFloat(goalAmountInput.value);

    if (goalName && goalAmount) {
        goals.push({ goalName, goalAmount });
        displayGoals();
    }

    goalNameInput.value = '';
    goalAmountInput.value = '';
});

// Display Goals
function displayGoals() {
    goalList.innerHTML = '';
    goals.forEach(goal => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');
        goalItem.textContent = `${goal.goalName}: $${goal.goalAmount}`;
        goalList.appendChild(goalItem);
    });
}

// Update Expense Chart
function updateExpenseChart() {
    const categories = ['Food', 'Entertainment', 'Transport', 'Bills'];
    const categoryExpenses = categories.map(category => {
        return expenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    });

    const ctx = expenseChartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expense Breakdown',
                data: categoryExpenses,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}
