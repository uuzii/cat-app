import React from 'react'

import './Favs.css'

class Favs extends React.Component {
  state = {
    list: [],
    currentIndex: null
  }

  componentDidMount() {
    this.fetchImages()
    this.setState({
      currentIndex: null
    })
  }

  fetchImages = async e => {
    try {
      const url = `${process.env.REACT_APP_URL_BASE}/fav`
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "api_key": `${process.env.REACT_APP_API_KEY}`
        }
      })
      const payload = await data.json()
      this.setState({
        list: payload.images
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleDeleteFav = e => {
    const deleteUrl = `${process.env.REACT_APP_URL_BASE}/fav/${e.target.dataset.id}`
    this.setState({
      currentIndex: e.target.dataset.index
    })
    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        "api_key": "g00dLuCk"
      }
    })
    .then(() => {
      const aux = this.state.list
      aux.splice(this.state.currentIndex, 1)
      this.setState({
        list: aux,
        currentIndex: null
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    if (this.state.list.length === 0) {
      return <h1>You don't have favorites yet!</h1>
    }

    return (
      <div>
        <h1>Favorites</h1>
        <div className="Grid">
          <div className="Row">
            {this.state.list.map((item, index) => {
              return (
                <div key={item.id} className="Row__item">
                  <div className="Row__item__cross--container">
                    <div
                      className="Row__item__cross--button"
                      onClick={this.handleDeleteFav}
                      data-id={item.id}
                      data-index={index}>
                      x
                    </div>
                  </div>
                  <img alt="cat" className="Row__item--image" src={item.url}></img>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Favs