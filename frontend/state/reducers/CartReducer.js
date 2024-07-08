const addCart=(state=[],action)=>{
    if(action.type==='addCart'){
        return [...state, action.payload];
    }
    else{
        return state
    }
}


export default addCart;