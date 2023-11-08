import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"; 
import Shimmer from "./Shimmer"; 
import { swiggy_api_URL } from "../utils/constats";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import UserOfline from "./UserOfline";


// Filter the restaurant data according input type
function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}


const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const onlineStatus = useOnlineStatus();


  useEffect(() => {
    getRestaurants();
  }, []);

  //fetch Swiggy API data
  async function getRestaurants() {    
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      // validate json data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // swiggy api json data validater:
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };


  if(!onlineStatus){
    return <UserOfline/>
  }

  if (!allRestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
    
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link to={"/restaurants/" + restaurant?.info?.id } key={restaurant?.info?.id} >
              <RestaurantCard {...restaurant?.info} /></Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;