import React, { Component } from "react";
import "./common/header.css";
import SearchedContent from "./SearchedContent";

class HeaderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      foodItem: "",
    };
  }

  getRecipe = (e) => {
    e.preventDefault();
    var item = document.getElementById("text").value;

    this.setState({
      searched: true,
      foodItem: item,
    });
  };

  render() {
    return (
      <div>
        <div className="header-container" >
          <h1 className="heading">Recipe Finder</h1>
          <form className="input-form">
            <input
              type="text"
              placeholder="Enter the Name of the Dish"
              id="text"
            />
            <input
              type="submit"
              value="Get Ingredients"
              onClick={this.getRecipe}
            />
          </form>
        </div>       
        {this.state.searched ? (
          <SearchedContent foodItem={this.state.foodItem} />
        ) : (
          <h2 className="firstTimeVis">
            Type a Dish Name to search for its ingredients
          </h2>
        )}
      </div>
    );
  }
}
export default HeaderForm;
