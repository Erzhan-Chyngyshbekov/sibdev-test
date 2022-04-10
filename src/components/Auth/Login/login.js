import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/sibdev-logo.svg";
import classes from "./login.module.scss";
import eye from "../../../assets/icons/eye.svg";
import eye_color from "../../../assets/icons/eye-color.svg";
import eye_off from "../../../assets/icons/eye-off.svg";
import eye_off_color from "../../../assets/icons/eye-off-color.svg";
import { authContext } from "../../../Contexts/AuthContext";

export default function Login() {
  const history = useNavigate();
  const { users, fetchUsers } = useContext(authContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(false);
  const [type, setType] = useState("password");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputFocus = () => {
    focus === false ? setFocus(true) : setFocus(false);
  };

  const ChangeTypeToText = () => {
    setType("text");
  };

  const ChangeTypeToPassword = () => {
    setType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      users.find((user) => user.name === name && user.password === password)
    ) {
      const rand = () => {
        return Math.random().toString(36).substr(2);
      };

      const token = () => {
        return rand() + rand();
      };

      console.log(token());
      localStorage.setItem("token", token());

      localStorage.setItem("user", name);

      history("/");
    } else {
      return alert("Неправильный логин или пароль!");
    }
  };

  return (
    <div className={classes.login}>
      <img className={classes.login__logo} src={logo} alt="logo" />
      <h2 className={classes.login__title}>Вход</h2>

      <form onSubmit={handleSubmit} className={classes.login__form}>
        <div className={classes.login__div}>
          <label className={classes.login__label}>Логин</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.login__input}
          />
        </div>

        <div className={classes.login__div}>
          <label className={classes.login__label}>Пароль</label>
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.login__input}
          />

          {type === "password" ? (
            focus === true ? (
              <img
                onClick={ChangeTypeToText}
                className={classes.login__image}
                src={eye_off_color}
                alt="eye-off-color"
              />
            ) : (
              <img
                onClick={ChangeTypeToText}
                className={classes.login__image}
                src={eye_off}
                alt="eye-off"
              />
            )
          ) : focus === true ? (
            <img
              onClick={ChangeTypeToPassword}
              className={classes.login__image}
              src={eye_color}
              alt="eye-color"
            />
          ) : (
            <img
              onClick={ChangeTypeToPassword}
              className={classes.login__image}
              src={eye}
              alt="eye"
            />
          )}
        </div>

        <button type="submit" className={classes.login__button}>
          Войти
        </button>
      </form>
    </div>
  );
}
