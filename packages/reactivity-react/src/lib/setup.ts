import { FC, ReactElement, useCallback } from 'react';
import { useReactivityEffect } from './effect';
import { useForceUpdate } from './share';
import { ReactiveEffectRunner } from '@vue/reactivity';

interface componentFn {
  (...args: any[]): ReactElement<any, any> | null
}
export interface Factory<T> {
  (effectRunner?: ReactiveEffectRunner): T
}
export const setup = <T extends componentFn = FC, P extends Parameters<T> = Parameters<T>>(factory: Factory<T>) => {
  return (...args: P) => {
    const forceUpdate = useForceUpdate();
    const effectRunner = useReactivityEffect(() => {
      return componentFn(...args);
    }, {
      scheduler: () => {
        forceUpdate();
      },
      lazy: true
    });
    const componentFn = useCallback(factory(effectRunner), []);
    return effectRunner();
  };
};
