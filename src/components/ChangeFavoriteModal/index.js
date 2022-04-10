import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./changeFavoriteModal.module.scss";
import { Autocomplete } from "@mui/material";
import Slider from "@mui/material/Slider";
import { storeContext } from "../../Contexts/StoreContext";

export default function ChangeFavoriteModal({
  searchValue,
  searchOrder,
  searchMaxResults,
  favoriteId,
  open,
  setOpen,
}) {
  const { updateFavorite } = useContext(storeContext);
  const [value, setValue] = useState(searchValue);
  const [sliderValue, setSliderValue] = useState(searchMaxResults);
  const [order, setOrder] = useState({
    label: searchOrder,
    value: searchOrder,
  });

  const handleModalClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const userName = localStorage.getItem("user");
  const initialValues = {
    user: userName,
    request: value,
    name: "",
    order: order.value,
    maxResults: sliderValue,
  };

  const handleFavoriteUpdate = () => {
    updateFavorite(favoriteId, initialValues);
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
    <div>
      <Modal
        open={open}
        onClose={(e) => handleModalClose(e)}
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
                onChange={(e) => setValue(e.target.value)}
                className={classes.modal__input}
                type="text"
                value={value}
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
                value={order}
                onChange={(e, newValue) => setOrder(newValue)}
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
                Не изменять
              </button>
              <button
                onClick={handleFavoriteUpdate}
                className={classes.modal__buttons_btn}
              >
                Изменить
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
