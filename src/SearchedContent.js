import React, { Component } from "react";
import "./common/searchedcontent.css";
import Axios from "axios";
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchedContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            bgColor: "",
          };
    }

    componentDidMount() {
        console.log(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" + this.props.foodItem
        );
        if (this.props.foodItem === "") alert("Enter a Dish!!");
        else {
          Axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
              this.props.foodItem
          ).then((resolve) => {
            console.log(resolve.data.meals);
            this.setState({
                dish: resolve.data.meals,
            });
          });
        }
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.foodItem !== prevProps.foodItem) {
          if (this.props.foodItem === "") alert("Enter a Dish!!");
          else {
            Axios.get(
                "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                this.props.foodItem
            ).then((resolve) => {
              console.log(resolve.data.meals);
              this.setState({
                dish: resolve.data.meals,
              });
            });
          }
        }
      }

      boxClick = (e) => {
        this.setState({
          bgColor: "red"
        })
      }
    
      render() {
        const { dish } = this.state;
        if (dish!== null && dish.length > 0) {
          var list = [];
          let i = 1;
    
          while (dish[0]["strIngredient" + i] !== "") {
            list.push(
              <li key={i}>
                {dish[0]["strIngredient" + i] + "----" + dish[0]["strMeasure" + i]}
              </li>
            );
            i++;
          }
          console.log(list);
        }
    
        const id =
        dish!== null && dish.length > 0 ? (
            <div className="recipeContent">
              <div className="title">
                <span className="marginIcon1"> <h1 >{dish[0].strMeal}</h1></span>
                <span className="marginIcon2" >
                        <FontAwesomeIcon icon={farHeart} size="2x" id="heartIcon" 
                         style={{color: this.state.bgColor}}
                         onClick={this.boxClick}
                        />
                        </span>
              </div>
              <div className="recipeItems">
                <img
                  src={dish[0].strMealThumb}
                  alt={"Your meal for " + dish[0].strMeal}
                />
                <div class="textData">
                  <p>
                    <em>Category of Meal:</em> {dish[0].strCategory}{" "}
                  </p>
                  <p>
                    <em>Area of the Meal:</em> {dish[0].strArea}{" "}
                  </p><br />
                  <h4 ><em>Ingredients:</em></h4>
                  <ul className="ingredients">{list}</ul>


                  <h4 id="recipesheading"><em>Recipes</em></h4>
                  <div className="recipe">{dish[0].strInstructions}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="noData">No Data Has been recieved</div>
          );
        return <div>{id}</div>;
      }
}

export default SearchedContent;