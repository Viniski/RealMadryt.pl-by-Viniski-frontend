export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.user };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    case "set-user":
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    default:
      throw new Error("Nie ma takiej akcji" + action.type);
  }
  return state;
};
