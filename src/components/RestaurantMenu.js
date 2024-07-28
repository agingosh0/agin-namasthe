import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {

  const { resId } = useParams();
  console.log('agingosh', useParams);

  const list = useRestaurantMenu(resId);

  if (list === null) return <Shimmer />;

  const { name, cuisines, costForTwo, id } = list.cards[2].card.card.info;

  const { itemCards } =
    list.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines.join(",")}</h3>
      <h3>{costForTwo}</h3>
      <h3>{id}</h3>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((res) => {
          return (
            <li key={res.card.info.id}>
              {res.card.info.name} - Rs {res.card.info.price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default RestaurantMenu;
