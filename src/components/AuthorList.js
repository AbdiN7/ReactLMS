"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';
import AuthorForm from './AuthorForm';
import AuthorButtons from './AuthorButtons'
export class AuthorList extends React.Component{

    createAuthorRow(author){
        return (
            <React.Fragment>
            <tr key={author.author_Id}>
                <td > {author.author_Id} </td>
                <td > {author.author_Name} </td>
                <td ><AuthorButtons author={author}/> </td>
            </tr>
            </React.Fragment>
        );
    }

    componentDidMount(){
        AuthorActions.readAuthors();
    }

    render() {
        
        let content = '';
        
        if(this.props.author.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }

        if(this.props.author.readState.success){
            content = 
                (  
                <React.Fragment>
                    <AuthorForm/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.author.authorList.map(this.createAuthorRow, this)}
                    </tbody>    
                </table>
                </React.Fragment>
                )
        }

        if(this.props.author.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading authors!
                </div>
            )
        }

        return(
            <div>
                <h1>authors</h1>
                {content}
            </div>
        );
    }
}

AuthorList.propTypes = {
    author: PropTypes.object.isRequired
};



