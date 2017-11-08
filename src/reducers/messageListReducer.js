import {GET_MESSAGE_LIST_REQUEST, GET_MESSAGE_LIST_SUCCESS, FETCH_MESSAGE_LIST_SUCCESS} from '../constants'

const initialState = {
  isLoading: false,
  messages: [],
  nextPageToken: ''
};

export default function messageListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
        isLoading: false,
        nextPageToken: action.payload.nextPageToken
      };
    case FETCH_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages
        ],
        isLoading: false,
        nextPageToken: action.payload.nextPageToken
      };
    default:
      return state;
  }
}