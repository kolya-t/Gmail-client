import {GET_MESSAGE_REQUEST, GET_MESSAGE_SUCCESS} from "../constants";

const initialState = {
  isLoading: false,
  message: null
};

export default function inboxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        message: null,
        isLoading: true
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}