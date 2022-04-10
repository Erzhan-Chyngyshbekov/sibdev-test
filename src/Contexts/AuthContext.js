import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  users: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export const authContext = React.createContext();

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/users");
    const users = response.data;
    console.log(users);

    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  return (
    <authContext.Provider value={{ users: state.users, fetchUsers }}>
      {props.children}
    </authContext.Provider>
  );
}
