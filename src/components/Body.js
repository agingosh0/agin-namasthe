import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  //Local State VAriable - Super Powerfull variable
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredResaturant] = useState([]);
  const [searchText, setSearchText] = useState("");
  console.log("Body Rendered");

  useEffect(() => {
    console.log("useEffect Called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=10.51600&lng=76.21570&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log(json);

    //option chaining
    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredResaturant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>LOoks like you re offline!! PLease check your Internet</h1>

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="px-4 py-1 bg-green-100 m-3 rounded-lg"
            onClick={() => {
              //Filter the res cards and update the UI
              //searchText
              console.log(searchText);
              const filteredRestaurants = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLocaleLowerCase())
              );
              setFilteredResaturant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-1 bg-gray-100 rounded-lg"
          onClick={() => {
            const filteredList = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4.3
            );
            setFilteredResaturant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id} to={'/restaurants/'+restaurant.info.id}><RestaurantCard resData={restaurant.info} /></Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
