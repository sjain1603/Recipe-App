import React, { Component } from 'react';
import './Search.scss';
import axios from 'axios';

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

    fetchFoodSearch = ( query ) => {
        var encodedQuery = query.replace(/ /g, '%20')
        const searchUrl = `/api/food-database/v2/parser?ingr=${encodedQuery}&app_id=a58bfb02&app_key=11eb9e8426423c4875ebf3bcbc8b5598`
        
        if(this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get( searchUrl, {
            cancelToken: this.cancel.token
        })
        .then( res => {
            console.log(res);
            {/*const resultNotFoundMsg = !res.data.hints.length
                                    ? 'There are no more Search Results. Pls try a new search'
                                    : '';
            this.setState({
                foodResults: res.data.hints,
                foodMessage: resultNotFoundMsg,
                foodLoading: false,
            })*/}
        })
        .catch( error => {
            if(axios.isCancel(error) || error) {
                this.setState({
                    foodLoading: false,
                    foodMessage: 'Failed to fetch the data. Please check the network.'
                })
            }
        })
    }

    fetchRecipeSearch = ( query ) => {
        var encodedQuery = query.replace(/ /g, '%20');
        const searchUrl = `/search?q=${encodedQuery}&app_id=1b3918e6&app_key=775943135184647352497ef27fdeb1bd`;
        
        if(this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get( searchUrl, {
            cancelToken: this.cancel.token,
            Headers: {
                "Access-Control-Allow-Origin": "*"
            }
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

    fetchSearch = (query) => {
        this.fetchFoodSearch( query );
        this.fetchRecipeSearch( query );
    }


    handleOnInputChange = (event) => {
        const query = event.target.value;
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

    render() {
        const { query } = this.state;
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
                        <i className="fa fa-search search-icon" aria-hidden="true" />
                    </label>
                </div>
            </div>
        );
    }
}

export default Search;