import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../../Contexts/StoreContext";
import list from "../../../assets/icons/list.svg";
import grid from "../../../assets/icons/grid.svg";
import listActive from "../../../assets/icons/list-active.svg";
import gridActive from "../../../assets/icons/grid-active.svg";
import CardGrid from "../../CardsGrid";
import CardList from "../../CardList";
import classes from "./searchResults.module.scss";
import CheckboxModal from "../../CheckboxModal";

export default function SearchResults() {
  const { videos, value, totalResults, getServerSideProps, fetchVideos } =
    useContext(storeContext);
  const [searchValue, setSearchValue] = useState(value);
  const [active, setActive] = useState("grid");

  useEffect(() => {
    fetchVideos();

    sessionStorage.getItem("active") === "grid"
      ? setActive("grid")
      : setActive("list");
  }, []);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    getServerSideProps(searchValue);
  };

  const ChangeStatusToList = () => {
    setActive("list");
    sessionStorage.setItem("active", "list");
  };

  const ChangeStatusToGrid = () => {
    setActive("grid");
    sessionStorage.setItem("active", "grid");
  };

  return (
    <section className={classes.results}>
      <h2 className={classes.results__title}>Поиск видео</h2>
      <form onSubmit={handleSearchSubmit} className={classes.results__form}>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          type="text"
          className={classes.results__input}
          placeholder="Что хотите посмотреть?"
        />
        <button type="submit" className={classes.results__button}>
          Найти
        </button>
      </form>
      <CheckboxModal searchValue={searchValue} />

      <div className={classes.results__filterPanel}>
        <h3 className={classes.filterPanel__resultsTitle}>
          Видео по запросу
          <span className={classes.filterPanel__resultsValue}> «{value}» </span>
          <span className={classes.filterPanel__totalReults}>
            {totalResults}
          </span>
        </h3>

        <div className={classes.filterPanel__viewSwitcher}>
          {active === "grid" ? (
            <img
              className={classes.viewSwitcher__item}
              onClick={ChangeStatusToList}
              src={list}
              alt="list"
            />
          ) : (
            <img
              className={classes.viewSwitcher__item}
              src={listActive}
              alt="list-active"
            />
          )}

          {active === "grid" ? (
            <img
              className={classes.viewSwitcher__item}
              src={gridActive}
              alt="grid-active"
            />
          ) : (
            <img
              className={classes.viewSwitcher__item}
              onClick={ChangeStatusToGrid}
              src={grid}
              alt="grid"
            />
          )}
        </div>
      </div>

      {active === "grid" ? <CardGrid /> : <CardList />}
    </section>
  );
}
