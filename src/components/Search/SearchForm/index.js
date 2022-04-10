import React, { useContext, useState } from "react";
import { storeContext } from "../../../Contexts/StoreContext";
import classes from "./searchForm.module.scss";

export default function SearchForm() {
  const { getServerSideProps } = useContext(storeContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    getServerSideProps(searchValue);
  };

  return (
    <section className={classes.search}>
      <h1 className={classes.search__title}>Поиск видео</h1>
      <form onSubmit={handleSearchSubmit} className={classes.search__form}>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className={classes.search__input}
          placeholder="Что хотите посмотреть?"
        ></input>
        <button type="submit" className={classes.search__button}>
          Найти
        </button>
      </form>
    </section>
  );
}
