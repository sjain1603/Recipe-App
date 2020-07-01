import React, { Component } from 'react';
import './Search.scss';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        }
    }

    render() {
        return (
            <div className="search">
                <div className="container">
                    <label className="search-label" htmlFor="search-input">
                        <input 
                            type="text"
                            value=""
                            id="search-input"
                            placeholder="Search..."
                        />
                        <i className="fa fa-search search-icon" aria-hidden="true" />
                    </label>
                </div>
            </div>
        );
    }
}

export default Search;