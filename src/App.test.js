import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';


test('App should be a Provider from react-redux', () => {
  // @Note: Do not use same name as the component tested
  // i.e., this won't work;
  // ```const App = shallow(<App />)```
  const wrapper = shallow(
    <App />
  );

  // sample test.
  expect(wrapper.node.type).toBe(Provider);
  
});
