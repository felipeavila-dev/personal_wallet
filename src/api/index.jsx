const removeUSDT = (data) => {
  const usdt = Object.keys(data).filter((name) => name !== 'USDT');
  return usdt;
};

const fetchApi = async () => {
  const values = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await values.json();
  return removeUSDT(data);
};

export const getCurrencyValues = async () => {
  const values = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await values.json();
  return data;
  // Pega as entradas dos objetos e faz um filtro de acordo com a moeda enviada
  // const filteredCurrency = Object.entries(data).find((name) => name[0] === currency);
  // return filteredCurrency;
};

export default fetchApi;
