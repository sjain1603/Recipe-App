import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import Tabs from './Tabs/Tabs';

class RenderList extends Component{
    constructor(props){
        super(props);
        this.renderFood = this.renderFood.bind(this);
    }

    renderFood = () => { 
        const { foodResults } = this.props
        if( foodResults && foodResults.length && Object.keys(foodResults).length ){
            return (
                <div className="food-container">
                    { foodResults.map( dish => {
                        return (
                            <>
                            <img src={dish.food.image} alt={dish.food.label} />
                            <h6>{dish.food.label}</h6>
                            </>
                        );
                    })}
                </div>
            );
        }
    }

    renderRecipe = () => {
        const { recipeResults } = this.props;
        console.log(recipeResults)

        if( recipeResults && recipeResults.length && Object.keys(recipeResults).length ){
            return (
                <div className="recipe-container">
                    { recipeResults.map( recipe => {
                        return (
                            <>
                            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                            <h6>{recipe.recipe.label}</h6>
                            </>
                        );
                    })}
                </div>
            );
        }
    }
    
    render() {
        return (
            <Tabs>
                <div label="Food">
                    {this.renderFood()}
                </div>
                <div label="Recipe">
                    {this.renderRecipe()}
                </div>
            </Tabs>
        );
    }
}

export default RenderList;