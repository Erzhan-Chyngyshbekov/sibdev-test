import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  videos: [],
  value: "",
  totalResults: 0,
  userFavorites: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        videos: action.payload.videos,
        value: action.payload.value,
        totalResults: action.payload.totalResults,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        userfavorites: [...state.userFavorites, action.payload],
      };
    case "SET_FAVORITES":
      return {
        ...state,
        userFavorites: action.payload,
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        userFavorites: state.userFavorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
// const { YOUTUBE_API_KEY } = process.env;

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const YOUTUBE_ITEMS_API = "https://www.googleapis.com/youtube/v3/search/";
  const YOUTUBE_API_KEY = "AIzaSyCOX4CvaLO0kT9-xjAI_O9JoMJIVKjV-to";

  const getServerSideProps = async (value) => {
    const response = await axios.get(
      `${YOUTUBE_ITEMS_API}?part=snippet&maxResults=12&q=${value}&key=${YOUTUBE_API_KEY}`
    );
    const videos = response.data.items;
    const totalResults = response.data.pageInfo.totalResults;

    localStorage.setItem("response", JSON.stringify(response));
    localStorage.setItem("value", JSON.stringify(value));

    dispatch({
      type: "SET_DATA",
      payload: { videos, value, totalResults },
    });
  };

  const fetchFavoriteResults = async (value, order, maxResults) => {
    const response = await axios.get(
      `${YOUTUBE_ITEMS_API}?part=snippet&maxResults=${maxResults}&order=${order}&q=${value}&key=${YOUTUBE_API_KEY}`
    );
    const videos = response.data.items;
    const totalResults = response.data.pageInfo.totalResults;

    localStorage.setItem("response", JSON.stringify(response));
    localStorage.setItem("value", JSON.stringify(value));

    dispatch({
      type: "SET_DATA",
      payload: { videos, value, totalResults },
    });
  };

  const fetchVideos = async () => {
    const response = JSON.parse(localStorage.getItem("response"));
    const value = JSON.parse(localStorage.getItem("value"));
    const videos = response.data.items;
    const totalResults = response.data.pageInfo.totalResults;

    dispatch({
      type: "SET_DATA",
      payload: { videos, value, totalResults },
    });
  };

  const fetchUserFavorites = async (userName) => {
    const response = await axios.get(
      `http://localhost:8000/favorites/?user=${userName}`
    );
    const userFavorites = response.data;
    dispatch({
      type: "SET_FAVORITES",
      payload: userFavorites,
    });
  };

  const createFavorite = async (favorite) => {
    const response = await axios.post(
      `http://localhost:8000/favorites`,
      favorite
    );
    const createdFavorite = response.data;

    dispatch({
      type: "ADD_FAVORITE",
      payload: createdFavorite,
    });
  };

  const updateFavorite = async (id, favorite) => {
    console.log(id, favorite);
    await axios.patch(`http://localhost:8000/favorites/${id}`, favorite);
  };

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8000/favorites/${id}`);
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    });
  };

  return (
    <storeContext.Provider
      value={{
        videos: state.videos,
        value: state.value,
        totalResults: state.totalResults,
        userFavorites: state.userFavorites,
        getServerSideProps,
        fetchFavoriteResults,
        fetchVideos,
        createFavorite,
        fetchUserFavorites,
        updateFavorite,
        deleteFavorite,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}
