import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import FavoritesPage from "./Views/FavoritesPage";
import LogInPage from "./Views/LoginPage";
import SearchPage from "./Views/SearchPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<SearchPage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/favorites" element={<FavoritesPage />} />
      </Switch>
    </Router>
  );
}
