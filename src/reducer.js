export const initialState = {
  basket: [],
  user: null,
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

    case "EMPTY_BASKET":
      return {
        // The state will look like the following: Keep rest of state the same, but change the basket to empty array 
        // Hence emptying out the basket
        ...state,
        basket: []
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      // Copy the current basket's contents
      let newBasket = [...state.basket];

      if (index >= 0) {
        // Cut out the element to remove from the new Basket
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
