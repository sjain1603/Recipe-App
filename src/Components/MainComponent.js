import React, { Component } from 'react';
import Header from './Header';
import Search from './SearchBar/SearchComponent';

class Main extends Component {

    render(){
        return (
            <div>
                <Header />
                <Search />
            </div>
        );
    }
}

export default Main;