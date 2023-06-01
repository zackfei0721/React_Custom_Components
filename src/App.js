import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// Defining a custom React.memo()
// Returns a version of the given Component that memorizes its result.
// If the props to the Component haven't changed since the last render, 
// the memorized result will be returned.
// Otherwise, a new result is computed and returned.
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

// Defining a custom PureComponent class
// PureComponent is a component that only re-renders when its props have changed.
// This custom implementation uses the shallowEqual function to check if 
// the props have changed.
class CustomPureComponent extends React.Component {
  shouldComponentUpdate(nextProps){
    return !shallowEqual(this.props, nextProps);
  }
}

// Defining a custom Shallow Compare function
// to check if the two compared objects are shallowly equal
// Two objects are considered shallowly equal 
// if they have the same set of keys and each key has the same value in both objects.
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

// Creating a regular component with a changable counter
const MyComponent = ({text, counter}) => <h1>{text}: {counter}</h1>
// Creating a custom memoized component using custom memo()
const MemoizedComponent = customMemo(MyComponent);
// Creating a component that extends from CustomPureComponent with a changable counter,
// it should only re-render when its props change.
class CustomPureCom extends CustomPureComponent {
  render() {
    return <h1>{this.props.text}: {this.props.counter}</h1>;
  }
}

function App() {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <MyComponent text="This is a regular component, counter" counter={counter} />
      <MemoizedComponent text="This is a memo component" /*counter={counter}*/ /> 
      <CustomPureCom text="This is a custom PureComponent, counter" counter={counter} />
    </div>
  );
}

export default App;
