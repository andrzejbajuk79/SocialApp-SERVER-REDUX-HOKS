export const createReducer = (INITIAL_STATE, funcMap) => {
 return (state = INITIAL_STATE, {type, payload}) => {
  const handler = funcMap[type];
  return handler ? handler(state, payload) : state;
 };
};
