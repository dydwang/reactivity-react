import { useContext } from 'react';
import { useForceUpdate } from './share';
import { useReactivityEffect } from './effect';
import { isFunction, isObject } from '@vue/shared';
import { ComputedRef, DeepReadonly, readonly, Ref, UnwrapNestedRefs, WritableComputedRef } from '@vue/reactivity';

export type StoreFun = () => Record<any, any>;
export type StoreObj = {
  state: UnwrapNestedRefs<object | Ref>,
  getters?: Record<any, ComputedRef | WritableComputedRef<Ref>>,
  actions?: Record<any, Function>
}
export type Store = StoreFun | StoreObj;

export function createStore<
  S extends Store = Store,
  R extends object = S extends StoreObj
    ? S['state'] & S['getters'] & S['actions']
    : S extends StoreFun
      ? ReturnType<S>
      : unknown
>(store: S): DeepReadonly<UnwrapNestedRefs<R>>{
  // 标准化store
  let normalizeStore: R;
  if(isFunction(store)) {
    normalizeStore = store();
    if(!isObject(normalizeStore)) {
      throw new Error('store() is must return Object');
    }
  }else if(isObject(store)){
    normalizeStore = {
      ...(store.state || {}),
      ...(store.getters || {}),
      ...(store.actions || {})
    } as R;
  }else {
    throw new Error('store is must be Function or Object');
  }
  return readonly<R>(normalizeStore);
};


export const useStore = () => {

};
