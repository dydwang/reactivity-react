import { setup, reactive } from '../src';
import { ForwardedRef, forwardRef } from 'react';

const Child = setup(() => {
  console.log('useSetup');
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
  console.log('useSetup');
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
