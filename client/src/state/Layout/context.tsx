import React, { createContext, useReducer, Dispatch } from 'react';
import { LayoutReducer } from './reducers';

export const initialState: any = {
  signInModalIsOpen: false,
};

export const LayoutContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const LayoutProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<typeof LayoutReducer>(
    LayoutReducer,
    initialState
  );

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};
