import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import Header from './index';

describe('<Header />', () => {

  const wrapper = shallow(
    <Provider store={store}>
        <Header />
    </Provider>
  );
  it('should render the header', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
