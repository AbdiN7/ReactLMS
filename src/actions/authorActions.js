import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const AuthorsActions = {

      AddAuthor: (author)=>{
            Dispatcher.dispatch({
                actionType: 'create_author_started'
            });
             axios.post("http://localhost:3000/author", author )
            .then( ()=> {

                Dispatcher.dispatch({
                    actionType: 'create_author_succesful',
                    data: author
                })
            })
          
            .catch( (error) =>{
                console.log(error)
                Dispatcher.dispatch({
                    type: 'create_author_failed',
                    
                })
            })
           
        
    }

     

    ,readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'read_authors_started'
        });
        axios.get(`http://localhost:3000/author`) //returns a promise
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_authors_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_authors_failure'
            });
        });
    }

    ,deleteAuthor: (author) => {
        Dispatcher.dispatch({
            actionType: 'delete_author_started'
        });
        axios.delete(`http://localhost:3000/author/${author.author_Id}`)
        .then(() => {
            Dispatcher.dispatch({
                actionType: 'delete_author_successful',
                payload: author,
                data: author
            });
            // AuthorsActions.readAuthors()
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_author_failure'
            });
        });
    },
    updateAuthor: (author) => {
        Dispatcher.dispatch({
            actionType: 'update_author_started'
        });
        axios.put(`http://localhost:3000/author/${author.author_Id}`, author)
        .then(() => {
            Dispatcher.dispatch({
                actionType:'update_author_succesful',
                data: author
            });
        })        
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_author_failure'
            });
        });
    }
}

module.exports = AuthorsActions;