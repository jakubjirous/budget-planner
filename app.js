const app = document.querySelector('#app');
const inputReason = document.querySelector('#input-reason');
const inputAmount = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const expensesList = document.querySelector('#expenses-list');
const totalExpensesOutput = document.querySelector('#total-expenses');

let totalExpenses = 0;

const clearValues = () => {
    inputReason.value = '';
    inputAmount.value = '';
}

const validationAlert = () => {
    const alert = document.createElement('ion-alert');
    alert.header = 'Invalid Inputs';
    alert.message = 'Please enter a valid reason and amount!';
    alert.buttons = ['Okay'];
    app.appendChild(alert);
    return alert.present();
}

const usdFormatter = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(+amount);
}

cancelBtn.addEventListener('click', () => {
    clearValues();
})

confirmBtn.addEventListener('click', () => {
    const enteredReason = inputReason.value;
    const enteredAmount = inputAmount.value;

    if (
        enteredReason.trim().length <= 0 ||
        enteredAmount <= 0 ||
        enteredAmount.trim().length <= 0
    ) {
        validationAlert();
        return;
    }

    const newItem = document.createElement('ion-item');
    newItem.setAttribute('lines', 'full');

    const newLabelStart = document.createElement('ion-label');
    const newLabelEnd = document.createElement('ion-label');
    newLabelStart.setAttribute('slot', 'start');
    newLabelEnd.setAttribute('slot', 'end');
    newLabelStart.textContent = enteredReason;
    newLabelEnd.textContent = usdFormatter(enteredAmount);

    newItem.appendChild(newLabelStart);
    newItem.appendChild(newLabelEnd);
    expensesList.appendChild(newItem);

    totalExpenses += +enteredAmount;
    totalExpensesOutput.textContent = usdFormatter(totalExpenses);

    clearValues();
})