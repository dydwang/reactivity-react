import { createStore } from '../src';
import { computed, reactive, ref } from '@vue/reactivity';

const userStoreState = reactive<{
  name: string,
  age: number,
  id?: number,
}>({
  name: 'wc',
  age: 18
});

export const userStore = createStore({
  state: userStoreState,
  getters: {
    userInfo: computed(() => userStoreState.name + userStoreState.age)
  },
  actions: {
    changeAge(data: number) {
      userStoreState.age = data;
    },
  }
});


export const sysStore = createStore(() => {
  const ip = ref('127.0.0.1');
  const host = ref(8080);
  const origin = computed(() => `http://${ip.value}:${host.value}`);
  const changeHost = (val: number) => {
    host.value = val;
  };
  return {
    ip,
    host,
    origin,
    changeHost
  };
});
