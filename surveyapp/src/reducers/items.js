const initState = {
  items: []
};
const Items = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, action.item]
      };
    case "DELETE_ITEM":
      const filter = state.items.filter(item => {
        return item.id != action.id;
      });
      return {
        items: filter
      };
    default:
      return { ...state };
  }
};

export default Items;
