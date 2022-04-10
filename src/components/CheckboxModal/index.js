import React, { useContext, useEffect, useState } from "react";
import heart from "../../assets/icons/heart.svg";
import heartChecked from "../../assets/icons/heartChecked.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classes from "./favoriteCheckbox.module.scss";
import { Autocomplete } from "@mui/material";
import Slider from "@mui/material/Slider";
import { storeContext } from "../../Contexts/StoreContext";
import { Link, useNavigate } from "react-router-dom";

export default function CheckboxModal({ searchValue }) {
  const history = useNavigate();
  const { userFavorites, fetchUserFavorites, createFavorite } =
    useContext(storeContext);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    fetchUserFavorites(userName);
  }, []);

  const [requestValue, setRequestValue] = useState({
    label: "Актуальность",
    value: "relevance",
  });
  const [sliderValue, setSliderValue] = useState(12);

  const userName = localStorage.getItem("user");
  const initialValues = {
    user: userName,
    request: searchValue,
    name: "",
    order: requestValue.value,
    maxResults: `${sliderValue}`,
  };

  const handleFavoriteSave = () => {
    createFavorite(initialValues);
    handleModalClose();
  };

  const options = [
    { label: "Дата", value: "date" },
    { label: "Рейтинг", value: "rating" },
    { label: "Актуальность", value: "relevance" },
    { label: "Название", value: "title" },
    { label: "Счетчик видео", value: "videoCount" },
    { label: "Количество просмотров", value: "viewCount" },
  ];

  return (
    <>
      {userFavorites.find((favorite) => favorite.request === searchValue) ? (
        <div className={classes.checkboxChecked}>
          <img className={classes.checkboxChecked__img} src={heartChecked} />

          <div className={classes.tooltip}>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <a onClick={() => history("/favorites")}>Перейти в избранное</a>
          </div>
        </div>
      ) : (
        <img
          onClick={handleModalOpen}
          className={classes.checkbox}
          src={heart}
        />
      )}

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          background: "#75C7FF",
        }}
      >
        <Box className={classes.modal}>
          <form className={classes.modal__form}>
            <h3 className={classes.modal__title}>Сохранить запрос</h3>

            <div className={classes.modal__field}>
              <label className={classes.modal__field_title}>Запрос</label>
              <input
                className={classes.modal__input}
                type="text"
                value={searchValue}
                disabled
              />
            </div>

            <div className={classes.modal__field}>
              <label className={classes.modal__field_title}>Название</label>
              <input className={classes.modal__input} type="text" disabled />
            </div>

            <div className={classes.modal__field}>
              <label className={classes.modal__field_title}>
                Сортировать по
              </label>
              <Autocomplete
                value={requestValue}
                onChange={(e, newValue) => setRequestValue(newValue)}
                id="custom-input-demo"
                options={options}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "48px",
                        paddingLeft: "15px",
                        fontSize: "20px",
                        border: "1px solid rgba(23, 23, 25, 0.2)",
                        borderRadius: "10px",
                        outline: "none",
                      }}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </div>

            <div className={classes.modal__field}>
              <label className={classes.modal__field_title}>
                Максимальное количество
              </label>
              <Box className={classes.modal__slider}>
                <Slider
                  aria-label="count"
                  value={sliderValue}
                  onChange={(e, newValue) => setSliderValue(newValue)}
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={50}
                />
                <div className={classes.modal__slider_value}>{sliderValue}</div>
              </Box>
            </div>

            <div className={classes.modal__buttons}>
              <button
                onClick={handleModalClose}
                className={classes.modal__buttons_btn}
              >
                Не сохранять
              </button>
              <button
                onClick={handleFavoriteSave}
                className={classes.modal__buttons_btn}
              >
                Сохранить
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
