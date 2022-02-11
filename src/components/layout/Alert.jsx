import AlertContext from "../../context/alert/AlertContext";
import {useContext} from 'react';
function Alert() {
    const {alert} = useContext(AlertContext)
  return alert !== null && (
      <div className={`alert alert-${alert.type}`}>
          <i className='fas fa-info-circle' /> {alert.msg}
       </div>
  )
}

export default Alert