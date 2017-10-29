import {GET_INBOX_REQUEST, GET_INBOX_SUCCESS} from '../constants'

const initialState = {
  isLoading: false,
  messages: []
};

export default function inboxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INBOX_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_INBOX_SUCCESS:
      return {
        isLoading: false,
        messages: action.payload
      };
    default:
      return state;
  }
}