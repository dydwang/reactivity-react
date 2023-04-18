import { FC, ReactElement, useMemo } from 'react';
import { useReactivityEffect } from './effect';
import { useForceUpdate } from './share';
import { ReactiveEffectRunner, pauseTracking, resetTracking } from '@vue/reactivity';

interface componentFn {
  (...args: any[]): ReactElement<any, any> | null
}
export interface Factory<T> {
  (effectRunner?: ReactiveEffectRunner): T
}

// 主要是为了track组件内响应式数据
export const setup = <T extends componentFn = FC, P extends Parameters<T> = Parameters<T>>(factory: Factory<T>) => {
  return (...args: P) => {
    const forceUpdate = useForceUpdate();
    const effectRunner = useReactivityEffect(() => {
      // TODO 只对返回 Element 内使用到的数据进行 track
      return componentFn(...args);
    }, {
      scheduler: () => {
        // 更新界面
        forceUpdate();
      },
      lazy: true
    });
    // 首次使用组件触发
    const componentFn = useMemo(() => factory(effectRunner), []);
    return effectRunner();
  };
};
