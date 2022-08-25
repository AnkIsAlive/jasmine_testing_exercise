window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = { amount: 10000, years: 10, rate: 4.5}; //values for function
  const amountUI = document.getElementById("loan-amount"); //target loan-amount
  amountUI.value = values.amount; //amountUI.value should equal values.amount
  const yearsUI = document.getElementById("loan-years"); // target loan-years
  yearsUI.value = values.years; //yearsUI.value should equal values.year
  const rateUI = document.getElementById("loan-rate"); // target loan-rate
  rateUI.value = values.rate; // rateUI.value should equal values.rate
  update(); // replaces content of the element with newContent
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIValues = getCurrentUIValues(); //makes getCurrentUIValues a const
  updateMonthly(calculateMonthlyPayment(currentUIValues)); //takes calculateMonthlyPayment and plugs in currentUIValues
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12; // values.rate divided by 100 then divided by 12
  const n = Math.floor(values.years * 12); //n takes years * 12 then brings back largest integer
  return (
    (monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2); //return a toFixed rate
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.getElementById("monthly-payment"); // target monthly-payment
  monthlyUI.innerText = "$" + monthly; //add $ to outcome (ex. $1400)
}

