import React from 'react';
import PropTypes from 'prop-types';
import {deleteAuthor, updateAuthor} from '../actions/authorActions';
import AuthorForm from './AuthorForm';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

 class AuthorButtons extends React.Component {
     constructor(){
         super();
         this.state = {
             name: '',
             showForm: false
         }
         this.toggleForm = this.toggleForm.bind(this)
         this.handleDelete = this.handleDelete.bind(this)
         this.handleUpdate = this.handleUpdate.bind(this)
         this.handleChange = this.handleChange.bind(this)
     }
     toggleForm() {
        this.setState({
            name: '',
            showForm: !this.state.showForm
        })
    }
   
     handleDelete (e) {
         e.preventDefault
         let author = {
             // eslint-disable-next-line react/prop-types
             author_Id: this.props.author.author_Id,
             // eslint-disable-next-line react/prop-types
             author_Name: this.props.author.author_Name
         }
         deleteAuthor(author)
     }
     handleChange(e) {
        // console.log(this.state.test)
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.name)
    }
     handleUpdate (e) {
         e.preventDefault
         let author = {
             // eslint-disable-next-line react/prop-types
             author_Id: this.props.author.author_Id,
             author_Name: this.state.name
         }
         updateAuthor(author)

     }
    render() {
       
        return (
     <React.Fragment>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <Grid container spacing={1} direction="column" >
                <Grid item>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button color="primary" onClick={this.toggleForm}>EDIT</Button>
           
                    <Button color="secondary" onClick={this.handleDelete}>DELETE</Button>
                </ButtonGroup>
                </Grid>
            </Grid>
            </Grid>
            </Grid>
                {this.state.showForm ? <form >
                    <TextField
                            required
                            name="name"
                            id="standard-required"
                            label="Author's New Name"
                            onChange={this.handleChange}
                            />
                        <Button style={{
                                borderRadius: '70px',
                                color: 'white',
                                backgroundColor: '#4caf50',
                                verticalAlign: 'bottom',
                                marginBottom: '0px',
                               }}
                       size="medium" type="submit" value="submit"onClick={this.handleUpdate} >Save</Button>
                        
                </form> : <React.Fragment/>}
        </React.Fragment>
        )
    }
}

AuthorForm.propTypes = {
    deleteAuthor: PropTypes.object.isRequired,
};

export default AuthorButtons;