const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
    };
  // case 'EDIT_EXPENSE':
  //   return {
  //     ...state,
  //     expenses: action.payload,
  //   };
  default:
    return state;
  }
};

export default wallet;
