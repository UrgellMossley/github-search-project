import {useState, useContext} from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

function UserSearch() {
    const [text,setText] = useState(' ')
    const {clearUsers,users,searchUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext);
    const handleChange =(e)=>{
        setText(e.target.value)
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if (text===' '){
            setAlert(`please enter text`, `error`)
        } else{
            searchUsers(text)
            setText('')
        }
    }
    const clearResults = () =>{
        clearUsers()
    }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols2 md:grid-cols-2 gap-8 mb-8'>
        <div className="">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black"
                        placeholder=""
                        value={text}
                        onChange={handleChange}
                         />
                          <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                              CLEAR
                          </button>
                    </div>
                      {users.length > 0 && (<button type='button' onClick={clearResults} className="btn btn-ghost btn-lg">
                          CLEAR
                      </button>
                      )}
                </div>
            </form>
        </div>
    
    </div>
  )
}

export default UserSearch