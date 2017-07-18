import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from './index';


test('App should be a Provider from react-redux', () => {
  // Render a checkbox with label in the document
  const App = shallow(
    <App />
  );
  expect(App).is(Provider)

});
