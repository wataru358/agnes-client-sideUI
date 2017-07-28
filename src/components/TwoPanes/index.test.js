import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import TwoPanes from './index';

describe('<TwoPanes />', () => {

  const wrapper = shallow(
    <Provider store={store}>
        <TwoPanes />
    </Provider>
  );
  it('should render the header', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
