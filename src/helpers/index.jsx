// Faz um map no WALLET.EXPENSES
// Pega cada valor digitado
// Pega cada moeda selecionada
// Pega o objeto de acordo com a selectedCurrency e multiplica pelo valor inserido(currentValue)
// Por fim, faz um foreach em cada elemento de VALUES e soma em SUM

const calculateExpenses = (expenses) => {
  let sum = 0;
  const values = expenses.map((expense) => {
    const selectedCurrency = expense.currency;
    const currentValue = Number(expense.value);
    return expense.exchangeRates[selectedCurrency].ask * currentValue;
  });
  values.forEach((element) => { sum += element; });
  return sum.toFixed(2);
};

export default calculateExpenses;
