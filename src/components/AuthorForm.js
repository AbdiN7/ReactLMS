import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {AddAuthor} from '../actions/authorActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AuthorForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            showForm: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.toggleForm = this.toggleForm.bind(this)
    }
    toggleForm() {
        this.setState({
            showForm: !this.state.showForm
        })
    }
    handleChange(e) {
        // console.log(this.state.test)
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.name)
    }
    handleSubmit() {
        const author = {
            author_Name: this.state.name
        }
       AddAuthor(author);
    }
    render() {
   
        return (
            <React.Fragment>
                <Button variant="contained" color='primary' style={{
                    margin: '10px'}} 
                    onClick={this.toggleForm}
               >
                    Add Author
                </Button>
                
                {this.state.showForm ? <form style={{
                    marginLeft: '10px',
                }}>
                 
                        <TextField style={{marginBottom: '10px'}}
                            required
                            name="name"
                            id="standard-required"
                            label="Enter Author's Name"
                            onChange={this.handleChange}
                            />
                        <label >
                        <Button style={{
                            borderRadius: '70px',
                            color: 'white',
                            backgroundColor: '#4caf50',
                            verticalAlign: 'bottom',
                            marginBottom: '0px'
                        }}
                        type="submit" 
                        value="submit"
                        size="large"
                        onClick={this.handleSubmit}> Add
                        </Button>
                        </label>
                            
                </form> : <React.Fragment/>}
                
            </React.Fragment>
        )
    }
   
}
AuthorForm.propTypes = {
    AddAuthor: PropTypes.object.isRequired
};

export default AuthorForm;