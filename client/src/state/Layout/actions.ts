import { TOGGLE_SIGN_IN_MODAL } from './constants';

export const toggleSignInModal = (value: boolean) => {
  return {
    type: TOGGLE_SIGN_IN_MODAL,
    value,
  };
};
