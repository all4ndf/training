export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const updateUser = (userDetails) => {
  return {
    type: "UPDATE_USER",
    payload: userDetails,
  };
};
