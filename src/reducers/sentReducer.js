import {GET_SENT_REQUEST, GET_SENT_SUCCESS} from '../constants'

const initialState = {
  isLoading: false,
  messages: [],
  // hasPrevious: false,
  // hasNext: false,
  // previousPageToken: undefined,
  // currentPageToken: '',
  // nextPageToken: undefined,
};

export default function sentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_SENT_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
        // hasPrevious: !!state.currentPageToken,
        // hasNext: !!action.payload.nextPageToken,
        // previousPageToken: state.currentPageToken,
        // currentPageToken: action.payload.currentPageToken,
        // nextPageToken: action.payload.nextPageToken,
        isLoading: false
      };
    default:
      return state;
  }
}