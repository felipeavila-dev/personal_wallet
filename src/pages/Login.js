import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import addUser from '../actions/index';

import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      currentEmail: '',
      currentPassword: '',
      disabledButton: true,
    };
  }

  // Pega os valores e insere nos states
  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => this.checkInputs());
  }

  validateEmail = (email) => {
    // Referência do site onde consegui achar uma solução para validar o email - https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const regex = /\S+@\S+\.\S+/;
    return !regex.test(email);
  };

  // Faz a validação dos inputs
  checkInputs = () => {
    const { currentEmail, currentPassword } = this.state;
    const minLenght = 6; // Tamanho minimo aceito para senha
    const verifyEmail = this.validateEmail(currentEmail);
    if (currentPassword.length >= minLenght && verifyEmail === false) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  // Ao clicar em entrar, atribui os valores para os reducers
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { currentEmail, currentPassword } = this.state;
    const data = {
      email: currentEmail,
      password: currentPassword,
    };
    dispatch({
      type: 'ADD_USER',
      payload: data,
    });
    history.push('/carteira');
  }

  render() {
    const { disabledButton, currentEmail, currentPassword } = this.state;
    return (
      <div className="container">
        <form action="/carteira" className="form-area">
          <div className="form-title">
            <p>
              <img src="https://img.freepik.com/free-vector/hacker-breaking-lock-get-access-personal-information-computer-isometric_1284-63723.jpg?w=740&t=st=1653085888~exp=1653086488~hmac=04ecc5811106ef6a5ba2edaac983bcfbb020d1581c70720d76e06d30927448ad" alt="Login" />
            </p>
          </div>
          <div className="form-inputs">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">@</span>
              <input
                type="email"
                name="currentEmail"
                data-testid="email-input"
                onChange={ (e) => this.changeInput(e) }
                value={ currentEmail }
                placeholder="Digite seu email"
                className="form-control"
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">🔒</span>
              <input
                type="password"
                name="currentPassword"
                data-testid="password-input"
                onChange={ (e) => this.changeInput(e) }
                value={ currentPassword }
                placeholder="Senha"
                className="form-control"
              />
            </div>

            <button
              type="submit"
              disabled={ disabledButton }
              onClick={ this.handleSubmit }
              className="btn btn-success"
            >
              Entrar
            </button>

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  user: user.user,
  password: user.password,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});
export default connect(mapStateToProps)(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
