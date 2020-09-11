export const initialState = {
  basket: [],
};

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
