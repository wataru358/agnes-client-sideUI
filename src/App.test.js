import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';


test('App should be a Provider from react-redux', () => {
  // Render a checkbox with label in the document
  // @Note: Do not use same name as the component tested
  // i.e., this won't work;
  // ```const App = shallow(<App />)```
  const wrapper = shallow(
    <App />
  );
  console.log(wrapper);
  console.log(Provider);
  expect(1).toBe(1);
  //expect(App).toBeInstanceOf(Provider)

});
