import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi, { getCurrencyValues } from '../api';
import calculateExpenses from '../helpers';
import Table from '../components/Table';
import Button from '../components/Button';

import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      enableEdit: false,
      editId: -1,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const allCurrencies = await fetchApi();
    dispatch({ type: 'GET_CURRENCIES', payload: allCurrencies });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  convertExpense = (expense) => {
    const { currency, exchangeRates, value } = expense;
    const convertValue = Number(value) * Number(exchangeRates[currency].ask);
    return convertValue.toFixed(2);
  }

 editExpense = (data) => {
   this.setState({
     enableEdit: true,
     editId: data.id,
     value: data.value,
     currency: data.currency,
     method: data.method,
     tag: data.tag,
     description: data.description,
   });
 }

     removeExpense = (data) => {
       const { dispatch, state: { wallet: { expenses } } } = this.props;
       const newExpenses = expenses.filter((expense) => expense.id !== data.id);
       dispatch({ type: 'EDIT_EXPENSE', payload: newExpenses });
     }

  handleSubmit = async () => {
    const { value, currency, method, tag, description, enableEdit, editId } = this.state;
    const { dispatch, state: { wallet } } = this.props;

    if (enableEdit) {
      const reducer = [...wallet.expenses];
      const { exchangeRates } = wallet.expenses.find((expense) => expense.id === editId);
      const newArr = reducer.filter((expense) => expense.id !== editId);
      newArr.push({
        id: editId,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      });

      dispatch({ type: 'EDIT_EXPENSE', payload: newArr.sort((a, b) => a.id - b.id) });
      this.setState({ enableEdit: false, editId: -1, value: 0, description: '' });
    } else {
      const exchangeRates = await getCurrencyValues();
      const id = wallet.expenses.length;
      const data = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      dispatch({ type: 'ADD_EXPENSE', payload: data });
      // Chama a função responsavel por atualizar o valor da despesa de acordo com a moeda selecionada
      this.setState({
        value: 0,
        description: '',
      });
    }
  }

  render() {
    const { state: { user, wallet } } = this.props;
    const convertedValue = calculateExpenses(wallet.expenses);
    const { value, description, enableEdit } = this.state;
    return (
      <>
        <header>
          <div className="header-container">
            <div className="header-title">
              <h1>Personal</h1>
              <h2>Wallet</h2>
            </div>
            <div className="header-userInfos">
              <p className="email-field" data-testid="email-field">{ user.email }</p>
              <p className="total-field" data-testid="total-field">
                R$
                { convertedValue }
              </p>
              <p className="currency-field" data-testid="header-currency-field"> BRL </p>
            </div>
          </div>
        </header>
        <section>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="currencies">
            Moeda:
            <select
              name="currency"
              id="currencies"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              { wallet.currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{ currency }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="value">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <button
            type="button"
            onClick={ this.handleSubmit }
            className="add-btn btn btn-success"
          >
            { enableEdit ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </section>
        <main>
          <Table>
            { wallet.expenses.length > 0 && (
              wallet.expenses.map((expense) => (
                <tr className="table-default" key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    R$
                    { this.convertExpense(expense) }
                  </td>
                  <td>Real</td>
                  <td className="button-cell">
                    <Button
                      id="edit-btn"
                      data={ expense }
                      onClick={ this.editExpense }
                      color="btn btn-warning"
                    >
                      Editar
                    </Button>
                    <Button
                      id="delete-btn"
                      data={ expense }
                      onClick={ this.removeExpense }
                      color="btn btn-danger"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
    wallet: PropTypes.shape({
      currencies: PropTypes.objectOf.isRequired,
      expenses: PropTypes.objectOf.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
