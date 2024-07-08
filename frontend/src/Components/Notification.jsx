import React from 'react'
import { CheckCircle, X,AlertTriangle, AlertCircle} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../../state';
export function Notification({type,msg}) {
  const NotificationState = useSelector(state => state.showNotification)
  const dispatch = useDispatch()
  function handleClose(){
    dispatch(actionCreators.showNotification({}))
  }
  return (
    <>
      {NotificationState && (
        <div className={`bg-${type === 'success' ? 'teal' : 'red'}-50 border-t-2 border-${type === 'success' ? 'teal' : 'red'}-500 rounded-lg p-4`} role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className={`inline-flex justify-center items-center size-8 rounded-full border-4 border-${type === 'success' ? 'teal' : 'red'}-100 bg-${type === 'success' ? 'teal' : 'red'}-200 text-${type === 'success' ? 'teal' : 'red'}-800`}>
                {type === 'success' ? <CheckCircle className="flex-shrink-0 size-4" /> : <AlertCircle className="flex-shrink-0 size-4" />}
              </span>
            </div>
            <div className="ms-3">
              <h3 className="text-gray-800 font-semibold">{type === 'success' ? 'Successfully Completed' : 'Error!'}</h3>
              <p className="text-sm text-gray-700">{msg}</p>
            </div>
            <div className="ml-auto pl-3">
              <button onClick={handleClose}>
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification