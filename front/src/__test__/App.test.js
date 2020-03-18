import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, render } from 'enzyme';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() })

describe('Test App fetching methods', () => {
  var mockSuccessResponse = {}
  var mockJsonPromise = Promise.resolve(mockSuccessResponse)
  var mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  })
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
  var app = shallow(<App />)

  it('Test fetchImage method', done => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/images",
      {"headers": {"api_key": "g00dLuCk"}, "method": "GET"}
    )
    process.nextTick(() => {
      expect(app.state()).toEqual({
        activeImage: {},
        heartFilled: false,
        homeActive: true,
        homeBtnActive: true
      })
      global.fetch.mockClear()
      done()
    })
  })

  it('Test handleLikeImage method', done => {
    const instance = app.instance()
    app.setState({ 
      activeImage: {
        id: '01'
      }
    })
    
    instance.handleLikeImage()
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/images/fav/01",
      {"headers": {"api_key": "g00dLuCk"}, "method": "POST"}
    )
    process.nextTick(() => {
      expect(app.state()).toEqual({
        activeImage: {
          id: '01'
        },
        heartFilled: true,
        homeActive: true,
        homeBtnActive: true
      })
      global.fetch.mockClear()
      done()
    })
  })
})