const userReducer = (
  state = {
    username: "",
    fullname: "",
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
