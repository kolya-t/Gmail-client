import {SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS} from "../constants";

const initialState = {
  isLoading: false
};

export default function sendReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}