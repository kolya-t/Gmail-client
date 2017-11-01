import {GET_INBOX_REQUEST, GET_INBOX_SUCCESS} from '../constants'

const initialState = {
  isLoading: false,
  messages: [],
  hasPrevious: false,
  hasNext: false,
  previousPageToken: undefined,
  currentPageToken: '',
  nextPageToken: undefined,
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
        ...state,
        messages: action.payload.messages,
        hasPrevious: !!state.currentPageToken,
        hasNext: !!action.payload.nextPageToken,
        previousPageToken: state.currentPageToken,
        currentPageToken: action.payload.currentPageToken,
        nextPageToken: action.payload.nextPageToken,
        isLoading: false
      };
    default:
      return state;
  }
}