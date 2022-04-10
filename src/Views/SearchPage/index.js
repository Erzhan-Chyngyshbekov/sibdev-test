import React, { useContext, useState } from "react";
import CheckboxModal from "../../components/CheckboxModal";
import SearchForm from "../../components/Search/SearchForm";
import SearchResults from "../../components/Search/SearchResults";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function SearchPage() {
  const { value } = useContext(storeContext);

  return <MainLayout>{!value ? <SearchForm /> : <SearchResults />}</MainLayout>;
}
