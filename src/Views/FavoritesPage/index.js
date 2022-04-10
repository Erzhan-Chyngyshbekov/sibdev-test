import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeFavoriteModal from "../../components/ChangeFavoriteModal";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./favoritesPage.module.scss";

export default function FavoritesPage() {
  const history = useNavigate();
  const {
    userFavorites,
    fetchUserFavorites,
    fetchFavoriteResults,
    deleteFavorite,
  } = useContext(storeContext);

  const [searchValue, setSearchValue] = useState();
  const [order, setOrder] = useState();
  const [maxResults, setMaxResults] = useState();
  const [id, setId] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = (e, value, order, maxResults, id) => {
    setSearchValue(value);
    setOrder(order);
    setMaxResults(maxResults);
    setId(id);
    setOpen(true);
    e.stopPropagation();
  };

  useEffect(() => {
    const userName = localStorage.getItem("user");
    fetchUserFavorites(userName);
  }, []);

  const handleClick = (value, order, maxResults) => {
    fetchFavoriteResults(value, order, maxResults);
    history("/");
  };

  // const handleEdit = (e, value, order, maxResults) => {
  //   e.stopPropagation();
  //   console.log(value, order, maxResults);
  // };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteFavorite(id);
  };

  return (
    <MainLayout>
      <h2 className={classes.title}>Избранное</h2>
      <div className={classes.searchRequests}>
        {userFavorites.map((favorite) => (
          <div
            onClick={() =>
              handleClick(favorite.request, favorite.order, favorite.maxResults)
            }
            key={favorite.id}
            className={classes.searchRequests__item}
          >
            {favorite.request}
            <div className={classes.searchRequests__buttons}>
              <button
                onClick={(e) =>
                  // handleEdit(
                  //   e,
                  //   favorite.request,
                  //   favorite.order,
                  //   favorite.maxResults
                  // )
                  handleOpen(
                    e,
                    favorite.request,
                    favorite.order,
                    favorite.maxResults,
                    favorite.id
                  )
                }
                className={classes.searchRequests__button}
              >
                Изменить
              </button>

              <button
                onClick={(e) => handleDelete(e, favorite.id)}
                className={classes.searchRequests__button}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      {open === true ? (
        <ChangeFavoriteModal
          searchValue={searchValue}
          searchOrder={order}
          searchMaxResults={Number(maxResults)}
          favoriteId={id}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        ""
      )}
    </MainLayout>
  );
}
