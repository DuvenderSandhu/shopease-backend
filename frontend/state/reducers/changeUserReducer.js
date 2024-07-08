const changeUser=(state={token:"",name:"",email:""},action)=>{
    if(action.type==='changeUser'){
        return action.payload;
    }
    else{
        return state
    }
}


export default changeUser;