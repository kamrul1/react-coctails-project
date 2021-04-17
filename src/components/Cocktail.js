import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id, drink, img, info, glass}) => {
  return (
    <article className="cocktail">
      <div className="image-container">
        <img src={img} alt={drink}/>
      </div>
      <div className="cocktail-footer">
        <h3>{drink}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">details</Link>
      </div>
    </article>
  )
}

export default Cocktail
