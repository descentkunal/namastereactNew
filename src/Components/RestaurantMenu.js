import { useEffect, useState } from "react";
import Shimmer from './Shimmer'
import { useParams } from "react-router-dom";
import {Menu_API} from '../utils/constants'

const RestaurantMenu = () => {
 const [resInfo,setresInfo] =useState(null);
 const {resId} = useParams()
  useEffect(() => {
    fetchMenu();
  }, []);

const fetchMenu = async () =>{
    const data = await fetch(Menu_API+resId)
    const json = await data.json();
    console.log("menu data",json)
    setresInfo(json.data)
}

if(resInfo === null) {
  return <Shimmer/>
}
 

const {name,cuisines,costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards[2].card.card 
console.log("itemcards",itemCards,resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards[2].card.card.itemCards )




  return (

    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines} - {costForTwoMessage}</p>
      <h2>Menu</h2>
      {itemCards.map((card)=>{
        console.log("kunal checking cards name",card.card)
        return(
          <li key={card?.card?.info?.id}>{card?.card?.info?.name} - {card?.card?.info?.price || card?.card?.info?.defaultPrice}</li>
        )
      })}
      <ul>
        <li>Biryani</li>
        <li>Burgers</li>
        <li>Diet Coke</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
