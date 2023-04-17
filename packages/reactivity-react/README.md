# reactivity-react

## 下载
```
npm install reactivity-react -S
```


## 使用
```
1、内部使用effect执行接收的组件，触发track, 改变值时触发effect的scheduler 从而主动更新界面
2、每次更新都会重新执行effect.fn
```

```javascript
import { setup } from 'reactivity-react';
import { reactive } from '@vue/reactivity';
import { ForwardedRef, forwardRef } from 'react';

const Child = setup(() => {
  const data = reactive({
    age: 18,
    name: 'wc'
  });
  return forwardRef((props: {test?: string}, ref: ForwardedRef<any>) => {
    return (
      <div>
        data {data.age} {data.name}
        <br/>
        <button onClick={() => data.age++}>++</button>
      </div>
    );
  });
});

const Child2 = setup(() => {
  const data = reactive({
    age: 18,
    name: 'wc'
  });
  return (props: {test?: string}) => {
    return (
      <div>
        data {data.age} {data.name}
        <br/>
        <button onClick={() => data.age++}>++</button>
      </div>
    );
  };
});

const Father = () => {
  return (
    <div>
      <Child test={'a'}></Child>
      <Child></Child>
      <Child2 />
    </div>
  );
};

```
