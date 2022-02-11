//reducer functions take in 2 argumnets state, and also an action which is in the form of a string
//an example of action would be "Increase". If theres any data or updating the data we send a payload
//convention is to use switch case syntax for actions
const GithubReducer = (state,action) =>{
switch(action.type) {
    case 'GET_USERS':
    return {
        ...state,
        users: action.payload,
        loading: false,
    }
    case 'GET_USER':
        return{
            ...state,
            user: action.payload,
            loading: false
        }
    case 'SET_LOADING':
        return {
            ...state,
            loading: true
        }
    case `DELETE_USERS`:
        return{
            ...state,
            users: [],
           }
    case `GET_REPOS`:
         return{
             ...state,
             loading: false,
             repos: action.payload
         }
    default:
        return state
    };

};

export default GithubReducer;