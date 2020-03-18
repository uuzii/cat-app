import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Home from '../pages/Home';

Enzyme.configure({ adapter: new Adapter() })

describe('Test Home Page', () => {
  var mockCallBack = jest.fn()
  it('Test delete button event', () => {
    const home = shallow((<Home currentImage="mockUrl" onDelete={mockCallBack}></Home>))
    home.find('#deleteBtn').simulate('click')
    expect(mockCallBack).toHaveBeenCalled()
  });
  it('Test like button event', () => {
    const home = shallow((<Home currentImage="mockUrl" onLike={mockCallBack}></Home>))
    home.find('#likeBtn').simulate('click')
    expect(mockCallBack).toHaveBeenCalled()
  });
});