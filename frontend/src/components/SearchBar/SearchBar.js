import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchBarList from "./SearchBarList";
import './search-bar.css';

function SearchBar() {
  const [inputSearch, setInputSearch] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputSearch(lowerCase);
  };
  console.log('hi')
  return(
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          placeholder="Search by name"
          />
      </div>
      <SearchBarList inputSearch={inputSearch} />
    </div>
  );
}

export default SearchBar;
