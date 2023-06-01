import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Defining a custom React.memo()
function customMemo(Component) {
  let lastProps = null;
  let lastResult = null;

  return function(props) {
    //if latest props are passed then return the latest props
    if(lastProps && shallowEqual(lastProps, props)) {
      return lastResult;
    }

    lastProps = props;
    lastResult = <Component {...props} />;
    return lastResult;
  };
}

//Defining a custom PureComponent class
class CustomPureComponent extends React.Component {
  shouldComponentUpdate(nextProps){
    return !shallowEqual(this.props, nextProps);
  }
}

//Defining a custom Shallow Compare function
//to check if the two compared objects are shallowly equal
function shallowEqual(obj1 = {}, obj2 = {}) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1){
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

//Creating a regular component
const MyComponent = ({text}) => <h1>{text}</h1>
//Creating a custom memoized component using custom memo()
const MemoizedComponent = customMemo(MyComponent);
//Creating a pure component using customPureComponent
class CustomPureCom extends CustomPureComponent {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

function App() {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Counter: {counter}</button>
      <MyComponent text="This is a regular component" />
      <MemoizedComponent text="This is a memo component" />
      <CustomPureCom text="This is a custom PureComponent" />
    </div>
  );
}

export default App;
