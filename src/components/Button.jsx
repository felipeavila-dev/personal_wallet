import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends React.Component {
  handleClick = () => {
    const { onClick, data } = this.props;
    onClick(data);
  }

  render() {
    const { children, id, color } = this.props;
    return (
      <button
        data-testid={ id }
        type="button"
        onClick={ this.handleClick }
        className={ color }
      >
        { children }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Button);

Button.propTypes = {
  children: PropTypes.arrayOf.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf.isRequired,
  onClick: PropTypes.func.isRequired,
};
