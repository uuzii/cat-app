import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import Favs from './pages/Favs'

class App extends React.Component {
  state = {
    homeActive: true,
    activeImage: null,
    heartFilled: false,
    homeBtnActive: true
  }

  componentDidMount() {
    this.fetchImage()
  }

  handleBtnAction = () => {
    this.setState({
      homeBtnActive: !this.state.homeBtnActive
    })
  }

  fetchImage = async e => {
    try {
      const url = `${process.env.REACT_APP_URL_BASE}`
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "api_key": `${process.env.REACT_APP_API_KEY}`
        }
      })
      const payload = await data.json()
      this.setState({
        activeImage: {
          ...payload.image
        },
        heartFilled: false
      })
    } catch (error) {
      console.log('error')
    }
  }

  handleDeleteImage = e => {
    this.fetchImage()
  }

  handleLikeImage = e => {
    const postUrl = `${process.env.REACT_APP_URL_BASE}/fav/${this.state.activeImage.id}`
    fetch(postUrl, {
      method: 'POST',
      headers: {
        "api_key": `${process.env.REACT_APP_API_KEY}`
      }
    })
    .then(() => {
      this.setState({
        heartFilled: true
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="App">
        
        <BrowserRouter>
          <div className="Wrapper">
            <nav className="Nav">
              <Link to="/" onClick={this.handleBtnAction}>
                <button className={this.state.homeBtnActive ? 'Nav__button active' : 'Nav__button'}>Home</button>
              </Link>

              <Link to="/favs" onClick={this.handleBtnAction}>
                <button className={this.state.homeBtnActive ? 'Nav__button' : 'Nav__button active'}>Favs</button>
              </Link>
            </nav>
            
            <Switch>
              <Route exact path="/">
                <Home
                  currentImage={this.state.activeImage}
                  onDelete={this.handleDeleteImage}
                  onLike={this.handleLikeImage}
                  iconFilled={this.state.heartFilled} />
              </Route>

              <Route exact path="/favs">
                <Favs />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
