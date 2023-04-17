import { useEffect, useReducer, useRef, DispatchWithoutAction, useCallback } from 'react';

export const useForceUpdate = (): DispatchWithoutAction => {
  const [, forceUpdate] = useReducer(s => s + 1, 0);
  return forceUpdate;
};


