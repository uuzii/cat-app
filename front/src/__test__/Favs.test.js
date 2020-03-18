import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Favs from '../pages/Favs';

Enzyme.configure({ adapter: new Adapter() })

describe('Test favs page', () => {
  var mockSuccessResponse = {
    images: []
  }
  var mockJsonPromise = Promise.resolve(mockSuccessResponse)
  var mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  })
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
  const favs = shallow(<Favs />)

  it('Test fetchImages method', done => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/images/fav",
      {"headers": {"api_key": "g00dLuCk"}, "method": "GET"}
    )
    process.nextTick(() => {
      expect(favs.state()).toEqual({
        currentIndex: null,
        list: []
      })
      global.fetch.mockClear()
      done()
    })
  })

  it('Test handleDeleteFav method', () => {
    const instance = favs.instance()
    const data = {
      target: {
        dataset: {
          id: '01',
          index: 0
        }
      }
    }
    favs.setState({
      list: [
        { id: '01', url: 'url' }
      ]
    })
    instance.handleDeleteFav(data)

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/images/fav/01",
      {"headers": {"api_key": "g00dLuCk"}, "method": "DELETE"}
    )
  })
})