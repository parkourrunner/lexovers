import { useState } from "react";
import searchIcon from "../img/search_icon.svg";
import "./_SearchForm.scss";

function SearchForm({ onSubmit, onChange, className = "", initValue = "" }) {
  const [value, setValue] = useState(initValue);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    onChange(e);
  }
  return (
    <form className={"search-form " + className} onSubmit={onSubmit}>
      <div className="input-wrapper">
        <input type="text" onChange={(e) => handleChange(e)} placeholder="جستجو" value={value} />
        <button type="submit" onClick={onSubmit}>
          <img src={searchIcon} alt="search icon" />
        </button>
      </div>
    </form>
  )
}

export default SearchForm