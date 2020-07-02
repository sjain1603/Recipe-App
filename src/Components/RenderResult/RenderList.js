import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Tabs from '../Tabs/Tabs';
import './Styles.scss';

class RenderList extends Component{
    constructor(props){
        super(props);
        this.renderFood = this.renderFood.bind(this);
    }

    renderFood = () => { 
        const { foodResults } = this.props;
        console.log(foodResults);
        if( foodResults && foodResults.length && Object.keys(foodResults).length ){
            return (
                <div className="food-container list">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Label</th>
                                <th>Category</th>
                                <th>Energy (kcal)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { foodResults.map( dish => {
                                return (
                                    <tr> 
                                        <td scope="row">
                                            <img src={dish.food.image ? dish.food.image : './food.png'}
                                                alt={dish.food.label} />
                                        </td>
                                        <td>{dish.food.label}</td>
                                        <td>{dish.food.category}</td>
                                        <td>{dish.food.nutrients.ENERC_KCAL}</td>
                                    </tr> 
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    renderRecipe = () => {
        const { recipeResults } = this.props;
        console.log(recipeResults)

        if( recipeResults && recipeResults.length && Object.keys(recipeResults).length ){
            return (
                <div className="recipe-container list">
                     <Table hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Label</th>
                                <th>Diet Label</th>
                                <th>Servings</th>
                                <th>Calories (kcal)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { recipeResults.map( recipe => {
                                return (
                                    <tr> 
                                        <td scope="row">
                                            <img src={recipe.recipe.image ? recipe.recipe.image : './food.png'}
                                                alt={recipe.recipe.label} />
                                        </td>
                                        <td>{recipe.recipe.label}</td>
                                        <td>{recipe.recipe.dietLabels[0]}</td>
                                        <td>{recipe.recipe.yield}</td>
                                        <td>{recipe.recipe.calories}</td>
                                    </tr> 
                                );
                            })}
                        </tbody>
                    </Table>
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