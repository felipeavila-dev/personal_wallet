import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <table className="table table-striped align-middle">
        <thead>
          <tr className="tbody-row table-dark">
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </table>
    );
  }
}

export default Table;

Table.propTypes = {
  children: PropTypes.arrayOf.isRequired,
};
