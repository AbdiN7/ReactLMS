"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './Shared/header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import {AuthorList} from '../components/AuthorList';
import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';
export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            book:{
                bookList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            },
            author:{
                authorList:[],
                readState:{
                    pending:false,
                    success:false,
                    failure:false,
                },
                error: ''
                }
            }
        }
    
    //<switch> <Route path='/author' render={(props)}......... </switch>
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} book={this.state.book} />)}/>
                </Switch>
                <Switch>
                    <Route path="/authors" render={(props) => (<AuthorList {...props} author={this.state.author} />)}/>
                </Switch>
            </div>
        );
    }
    //subscribing to the store
    componentDidMount(){
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
        BookStore.addChangeListener(this._onBookChange.bind(this));
    }

    componentWillUnmount(){
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
        BookStore.removeChangeListener(this._onBookChange.bind(this));
    }
    _onAuthorChange(){
        this.setState({author: AuthorStore.getAllauthors()});
    }
    _onBookChange(){
        this.setState({book: BookStore.getAllBooks()});
    }
}