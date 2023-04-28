import {searchType} from "../../../types/SearchTypes";
import React from "react";
import classes from ".//searchComponent.css"


const SearchItem: React.FC<{ onSetChange: searchType }> = (props) => {

    const getInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const retrieved = (event.target as HTMLInputElement).value;
        props.onSetChange(retrieved);
    };


    return (
        <input
            type="search"
            name=""
            id=""
            placeholder="Search Product..."
            onChange={getInputHandler}
            className={classes.style}
        />
    );
}

export default SearchItem 