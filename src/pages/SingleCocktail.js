import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  
  const {id} = useParams();
  const [loading, isLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);




  useEffect(()=>{
    const fetchData=async()=>{
      try {
        isLoading(true);
        const response = await fetch(`${url}${id}`)
        const data = await response.json();
        if(data.drinks){
          const {strDrink:drink, strDrinkThumb:img, 
                strAlcoholic:info, strGlass:glass,
                strCategory:category, strInstructions:instructions,
                strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5} = data.drinks[0]
          const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5];
          const newCocktail = {drink,img,info,category,glass,instructions,ingredients}
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        isLoading(false);
      } catch (error) {
        console.log(error)
        isLoading(false);
      }
    }    
    fetchData();
  },[id])

  if(loading){
    return <Loading />
  }

  if(!cocktail){
    return <h2 className="section-title">no cocktail to display</h2>
  }


  const {drink,img,info,category,glass,instructions,ingredients} = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">back home</Link>
      <h2 className="section-title">{drink}</h2>
      <div className="drink">
        <img src={img} alt={drink}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">name : </span>
            {drink}
          </p>
          <p>
            <span className="drink-data">category : </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info : </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass : </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions : </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {
              ingredients.map((item, index)=>{
                return item? <span key={index}>{item}</span>: null
              })
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
