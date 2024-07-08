const showNotification=(state={type:"alert" ,msg:""},action)=>{
    if(action.type==='showNotification'){
        return action.payload
    }
    else{
        return state
    }
}


export default showNotification;