import {
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const newState = Object.keys(state)
        .filter((id) => id !== action.payload)
        .reduce((object, key) => {
          object[key] = state[key];
          return object;
        }, {});
      return newState;
    case FETCH_STREAMS:
      const newfetchedStreams = action.payload.reduce((object, element) => {
        object[element.id] = element;
        return object;
      }, {});
      return { ...state, ...newfetchedStreams };
    default:
      return state;
  }
};
