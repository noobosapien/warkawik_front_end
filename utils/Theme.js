import { createContext, useReducer } from "react";

export const Theme = createContext();

const initialState = {
  darkMode: {
    dark: true,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK_TOGGLE": {
      return { ...state, darkMode: { dark: !state.darkMode.dark } };
    }

    default:
      return state;
  }
}

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Theme.Provider value={value}>{props.children}</Theme.Provider>;
}
