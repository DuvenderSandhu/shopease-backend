import { combineReducers } from "redux";
import addCart from "./CartReducer";
import changeUser from "./changeUserReducer";
import showNotification from "./NotificationReducer";
import removeCart from "./RemoveCartReducer";
const reducers = combineReducers({
    addCart:addCart,
    showNotification:showNotification,
    changeUser:changeUser,
    removeCart:removeCart,
})
export default reducers;