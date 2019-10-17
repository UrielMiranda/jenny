const initState = {
  user: null
};

const User = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.user };
    default:
      return { ...state };
  }
};
export default User;
