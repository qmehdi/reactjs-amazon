export const initialState = {
  basket: [],
};

// Selector
// reduce iterates through basket and tallies up the total and returns the value
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);

  //Add to basket, remove from basket? What are you trying to do...
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    default:
      return state;
  }
};

export default reducer;
