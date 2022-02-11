import { createContext, useReducer} from 'react'
import GithubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;




export const GithubProvider = ({children})=>{
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    //state is state, dispatch is a function that works on our reducer to perform actions
    const [state,dispatch] = useReducer(GithubReducer, initialState)
    //get initial users (testing purposes)
    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const searchUsers = async (text) => {

        setLoading();

        const params = new URLSearchParams({
            q: text,
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const {items} = await response.json()
        //takes in an action object, type is string that is dispatched to our Reducer
        //payload contain our resolved promise with user data
        dispatch({
            type: `GET_USERS`,
            payload: items,
        })
        //set Loading in reducer
    }
    //get a single user
    const getUser = async (login) => {

        setLoading();
        
        const response = await fetch(`${GITHUB_URL}/users/${login}` , {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if (response.status === 404){
            window.location = `/notfound`
        }
        const  data  = await response.json()
        //takes in an action object, type is string that is dispatched to our Reducer
        //payload contain our resolved promise with user data
        dispatch({
            type: `GET_USER`,
            payload: data,
        })
        //set Loading in reducer
    }
    const clearUsers = () =>{
        dispatch({
            type: `DELETE_USERS`
        })
    }
    //Get user repos
    const getUserRepos = async (login) => {
        const params = new URLSearchParams({
            sort: `created`,
            per_page: 10
        })
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const data  = await response.json()
        console.log(data)
        //takes in an action object, type is string that is dispatched to our Reducer
        //payload contain our resolved promise with user data
        dispatch({
            type: `GET_REPOS`,
            payload: data,
        })
        //set Loading in reducer
    }
    //All this state is now pased through the context provider down into component who are children
    return <GithubContext.Provider value={{users: state.users,
                                          loading: state.loading,
                                          user: state.user,
                                          repos: state.repos,
                                        searchUsers,
                                        getUser,
                                        clearUsers,
                                    getUserRepos}}>
            {children}
           </GithubContext.Provider>
}

export default GithubContext