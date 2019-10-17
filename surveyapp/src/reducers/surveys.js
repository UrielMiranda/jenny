const initState = {
  surveys: []
};

const Surveys = (state = initState, action) => {
  switch (action.type) {
    case "SET_SURVEYS":
      return { surveys: action.surveys };
    default:
      return { ...state };
  }
};
export default Surveys;
