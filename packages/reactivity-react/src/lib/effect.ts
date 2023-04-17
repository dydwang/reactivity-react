import { effect, ReactiveEffectRunner, stop } from '@vue/reactivity';
import { useCallback, useEffect } from 'react';

export const useReactivityEffect = (...effectArgs: Parameters<typeof effect>): ReactiveEffectRunner => {
  // 用一个ref存储 effectRef
  // effect函数只需要初始化执行一遍
  const effectRunner = useCallback(effect(...effectArgs), []);
  // 卸载组件后取消effect
  useEffect(() => {
    return () => {
      stop(effectRunner);
    };
  }, []);
  return effectRunner;
};
