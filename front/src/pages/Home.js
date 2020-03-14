import React from 'react'
import './Home.css'
import closeIcon from '../resources/close-24px.svg'
import favoriteIcon from '../resources/favorite_border-24px.svg'
import favoriteFilledIcon from '../resources/favorite-24px.svg'

const Home = (props) => {
  if (!props.currentImage) {
    return <h1>Loading...</h1>
  }

  return (
    <React.Fragment>
      <div className="Frame">
        <div className="Image__container">
          <img alt="close icon" className="Image__container--image" src={props.currentImage.url} />
        </div>
      </div>

      <div className="Button__container">
        <div className="Button__item" onClick={props.onDelete}>
          <img alt="love icon" src={closeIcon} />
        </div>
        <div className="Button__item" onClick={props.onLike}>
          <img alt="love icon" src={props.iconFilled ? favoriteFilledIcon : favoriteIcon} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home