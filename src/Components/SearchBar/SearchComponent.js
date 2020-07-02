import React, { Component } from 'react';
import './Search.scss';
import axios from 'axios';
import RenderList from '../RenderList';
import Loader from '../loader.gif';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            foodResults: {},
            recipeResults: {},
            foodLoading: false,
            recipeLoading: false,
            foodMessage: '',
            recipeMessage: ''
        };
        this.cancel = '';
    }

    fetchSearch = ( query ) => {
        var encodedQuery = query.replace(/ /g, '%20')
        const searchUrlFood = `/api/food-database/v2/parser?ingr=${encodedQuery}&app_id=a58bfb02&app_key=11eb9e8426423c4875ebf3bcbc8b5598`
        const searchUrlRecipe = `/search?q=${encodedQuery}&app_id=1b3918e6&app_key=775943135184647352497ef27fdeb1bd`;
        if(this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get( searchUrlFood, {
            cancelToken: this.cancel.token
        })
        .then( res => {
            const resultNotFoundMsg = !res.data.hints.length
                                    ? 'There are no more Search Results. Pls try a new search'
                                    : '';
            this.setState({
                foodResults: res.data.hints,
                foodMessage: resultNotFoundMsg,
                foodLoading: false,
            })
        })
        .catch( error => {
            if(axios.isCancel(error) || error) {
                this.setState({
                    foodLoading: false,
                    foodMessage: 'Failed to fetch the data. Please check the network.'
                })
            }
        })

        axios.get( searchUrlRecipe, {
            cancelToken: this.cancel.token
        })
        .then( res => {
            const resultNotFoundMsg = !res.data.hits.length
                                    ? 'There are no more Search Results. Pls try a new search'
                                    : '';
            this.setState({
                recipeResults: res.data.hits,
                recipeMessage: resultNotFoundMsg,
                recipeLoading: false,
            })
        })
        .catch( error => {
            if(axios.isCancel(error) || error) {
                this.setState({
                    recipeLoading: false,
                    recipeMessage: 'Failed to fetch the data. Please check the network.'
                })
            }
        })
    }


    handleOnInputChange = (event) => {
        const query = event.target.value;
        if(! query ){
            this.setState({ query, recipeResults: {}, foodResults: {}, foodMessage: '', recipeMessage:''})
        }else{
            this.setState({
                query: query,
                foodLoading: true,
                recipeLoading: true,
                foodMessage: '',
                recipeMessage: ''            
            }, () => {
                this.fetchSearch(query);
            })
        }
    }

    renderFood = () => {
        const {foodResults, recipeResults} = this.state;
        console.log(foodResults);
        return (
            <RenderList foodResults={foodResults}  recipeResults={recipeResults} />
        );
    }
    
    render() {
        const { query, foodLoading, recipeLoading, foodMessage, recipeMessage } = this.state;
        return (
            <div className="search">
                <div className="container">
                    <label className="search-label" htmlFor="search-input">
                        <input 
                            type="text"
                            value={query}
                            name="query"
                            id="search-input"   
                            placeholder="Search..."
                            onChange={this.handleOnInputChange}
                        />
                        <i className="fa fa-search search-icon" 
                            aria-hidden="true" 
                        />
                    </label>

                    {/* Loader */}
                    <img src={Loader} className={`search-loading ${(foodLoading && recipeLoading) ? 'show' : 'hide'}`}
                        alt="Loading..."
                    />
                    {this.renderFood()}
                </div>
            </div>
        );
    }
}

export default Search;