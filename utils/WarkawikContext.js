import { createContext, useReducer } from "react";

export const Warkawik = createContext();

const initialState = {
  shader: "",
  other: "ABC",
};

function reducer(state, action) {
  switch (action.type) {
    case "SHADER": {
      return { ...state, shader: action.payload };
    }

    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Warkawik.Provider value={value}>{props.children}</Warkawik.Provider>;
}
