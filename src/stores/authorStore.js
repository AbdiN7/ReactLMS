import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _authorStore = {
    author:{
        authorList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        createState:{
            pending:false,
            success:false,
            failure:false
        },
        deleteState:{
            pending:false,
            success:false,
            failure:false
        },
        updateState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }


    getAllauthors(){
        return _authorStore.author;
    }

    resetReadState(){
        _authorStore.author.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }resetCreateState(){
        _authorStore.author.createState ={
            pending:false,
            success:false,
            failure:false
        }
    }resetDeleteState(){
        _authorStore.author.deleteState ={
            pending:false,
            success:false,
            failure:false
        }
    }resetUpdateState(){
        _authorStore.author.updateState = {
            pending:false,
            success:false,
            failure:false
        }
    }
}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_authors_successful':
            AuthorStore.resetReadState();
            _authorStore.author.authorList = action.data;
            _authorStore.author.readState.success = true;
            AuthorStore.emitChange();
            break;
        case 'read_authors_failure':
            AuthorStore.resetReadState();
            _authorStore.author.readState.failure = true;
            AuthorStore.emitChange();
            break;
        case 'read_authors_started':
            AuthorStore.resetReadState();
            _authorStore.author.readState.pending = true;
            AuthorStore.emitChange();
            break;


        case 'create_author_successful':
            AuthorStore.resetCreateState();
            _authorStore.author.authorList = action.data;
            _authorStore.author.createState.success = true;
            AuthorStore.emitChange();
            break;    
        case 'create_author_failure':
            AuthorStore.resetCreateState();
            _authorStore.author.createState.failure = true;
            AuthorStore.emitChange();
            break;
        case 'create_author_started':
            AuthorStore.resetCreateState();
            _authorStore.author.createState.pending = true;
            AuthorStore.emitChange();
            break;


            
        case 'delete_author_successful':
            AuthorStore.resetDeleteState();
            _authorStore.author.authorList = _authorStore.author.authorList.filter(el => el.author_Id !== action.data.author_Id);
            _authorStore.author.deleteState.success = true;
            AuthorStore.emitChange();
            break;    
        case 'delete_author_faliure':
            AuthorStore.resetDeleteState();
            _authorStore.author.deleteState.failure = true;
            AuthorStore.emitChange();
            break;    
        case 'delete_author_started':
            AuthorStore.resetDeleteState();
            _authorStore.author.deleteState.pending = true;
            AuthorStore.emitChange();
            break;
            
        case 'update_author_success':
            AuthorStore.resetUpdateState();
            _authorStore.author.authorList = _authorStore.author.authorList.push(action.data)
            _authorStore.author.updateState.success = true;
            AuthorStore.emitChange();
            break;    
        case 'update_author_failure':
            AuthorStore.resetUpdateState();
            _authorStore.author.updateState.failure = true;
            AuthorStore.emitChange();
            break;
        case 'update_author_started':
            AuthorStore.resetUpdateState();
            _authorStore.author.updateState.pending = true;
            AuthorStore.emitChange();
            break;
        default:
            return;
    }
} );

export default AuthorStore;