import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import Tabs from '../Tabs/Tabs';
import './Styles.scss';

class RenderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            highProtien: false,
            highCarb: false,
            regular: false,
            balanced: false,
        }
        this.renderFood = this.renderFood.bind(this);
    }

    computeFoodLabel = ( nutrients ) => {
        var ratio = nutrients.PROCNT / (nutrients.PROCNT + nutrients.CHOCDF + nutrients.FAT)
        var label1 = 'Regular';
        var label2 = '';
        if(ratio > 0.15) label1 = 'High Protien';
        if (ratio < 0.5) label2 = 'High Carb';
        if(ratio <= 0.15 && ratio >= 0.12){
            label1 = 'Balanced';
        }

        if(label1 && label2) return (
            <>
            {label1}
            <br />
            {label2}
            </>
        );
        else return (
            <>
            {label1}
            </>
        );
    }

    computeRecipeLabel = (recipeResults) => {
        return recipeResults.map(recipe => {
            var ratio = recipe.recipe.totalNutrients.PROCNT.quantity / (recipe.recipe.totalNutrients.PROCNT.quantity 
                + recipe.recipe.totalNutrients.CHOCDF.quantity + recipe.recipe.totalNutrients.FAT.quantity)
    
            recipe.recipe.dietLabel = 'Regular';
            
            if(ratio > 0.15) {
                recipe.recipe.dietLabel = 'High Protien'
            }
            if (ratio < 0.5) recipe.recipe.dietLabel = 'High Carb';
            if(ratio <= 0.15 && ratio >= 0.12){
                recipe.recipe.dietLabel =  'Balanced'
            }
            return recipe.recipe.dietLabel
        })
    }

    displayNutrients = (nutrients, selector) => {
        if(selector === 'food'){
            return (
                <div>
                    Protien: <b style={{paddingLeft:'10px'}}>{nutrients.PROCNT.toFixed(2)}</b>
                    <br/>
                    Fat: <b style={{paddingLeft:'10px'}}>{nutrients.FAT.toFixed(2)}</b>
                    <br/>
                    Carbs: <b style={{paddingLeft:'10px'}}>{nutrients.CHOCDF.toFixed(2)}</b>
                </div>
            );
        }else return (
            <div>
                Protien: <b style={{paddingLeft:'10px'}}>{nutrients.PROCNT.quantity.toFixed(2)}</b>
                <br/>
                Fat: <b style={{paddingLeft:'10px'}}>{nutrients.FAT.quantity.toFixed(2)}</b>
                <br/>
                Carbs: <b style={{paddingLeft:'10px'}}>{nutrients.CHOCDF.quantity.toFixed(2)}</b>
            </div>
        );
    }

    renderFood = () => { 
        const { foodResults } = this.props;
        if( foodResults && foodResults.length && Object.keys(foodResults).length ){
            return (
                <div className="food-container list">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Food</th>
                                <th>Category</th>
                                <th>Diet Label</th>
                                <th>Energy (kcal)</th>
                                <th>Nutrients</th>
                            </tr>
                        </thead>
                        <tbody>
                            { foodResults.map( (dish, key) => {
                                return (
                                    <tr key={key}> 
                                        <td>
                                            <img src={dish.food.image ? dish.food.image : './food.png'}
                                                alt={dish.food.label} />
                                        </td>
                                        <td>{dish.food.label}</td>
                                        <td>{dish.food.category}</td>
                                        <td>{this.computeFoodLabel(dish.food.nutrients)}</td>
                                        <td>{dish.food.nutrients.ENERC_KCAL.toFixed(2)}</td>
                                        <td>{this.displayNutrients(dish.food.nutrients, 'food')}</td>
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
        const { recipeResults }  = this.props;

        if( recipeResults && recipeResults.length && Object.keys(recipeResults).length ){
            this.computeRecipeLabel(recipeResults);
            var recipes = recipeResults;
            if(this.state.highProtien){
                recipes = recipeResults.filter(recipe => 
                    recipe.recipe.dietLabel === 'High Protien'
                )
            }
            else if(this.state.highCarb){
                recipes = recipeResults.filter(recipe => 
                    recipe.recipe.dietLabel === 'High Carb'
                )
            }
            if(this.state.balanced){
                recipes = recipeResults.filter(recipe => 
                    recipe.recipe.dietLabel === 'Balanced'
                )
            }
            if(this.state.regular){
                recipes = recipeResults.filter(recipe => 
                    recipe.recipe.dietLabel === 'Regular'
                )
            }
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
                                <th>Nutrients</th>
                            </tr>
                        </thead>
                        <tbody>
                            { recipes.map( (recipe, key) => {
                                return (
                                    <tr> 
                                        <td id={key}>
                                            <img src={recipe.recipe.image ? recipe.recipe.image : './food.png'}
                                                alt={recipe.recipe.label} />
                                        </td>
                                        <td>{recipe.recipe.label}</td>
                                        <td>{recipe.recipe.dietLabel}</td>
                                        <td>{recipe.recipe.yield}</td>
                                        <td>{recipe.recipe.calories.toFixed(2)}</td>
                                        <td>{this.displayNutrients(recipe.recipe.totalNutrients, 'recipe')}</td>
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
                    <div className="filter">
                        <b>Diet Label Filter:</b>
                        <label>
                            <Input type='checkbox' id="High Protien" name="High Protien"
                                onClick={() => {
                                    this.setState({highProtien: !this.state.highProtien});
                                }}
                            />
                            High Protien
                        </label>
                        <label>
                            <Input type='checkbox' id="High Carb" name="High Carb" 
                                onClick={() => {
                                    this.setState({highCarb: !this.state.highCarb});
                                }}
                            />
                            High Carb
                        </label>
                        <label>
                            <Input type='checkbox' id="Regular" name="Regular" 
                                onClick={() => {
                                    this.setState({regular: !this.state.regular});
                                }}
                            />
                            Regular
                        </label>
                        <label>
                            <Input type='checkbox' id="Balanced" name="Balanced" 
                                onClick={() => {
                                    this.setState({balanced: !this.state.balanced});
                                }}
                            />
                            Balanced
                        </label>
                    </div>
                    <br />
                    {this.renderRecipe()}
                </div>
            </Tabs>
        );
    }
}

export default RenderList;