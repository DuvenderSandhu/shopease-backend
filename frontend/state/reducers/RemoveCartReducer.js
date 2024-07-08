// removeCart

const removeCart=(state="",action)=>{
    if(action.type==='removeCart'){
        return state.filter(e=>e.id!=action.payload)
    }
    else{
        return state
    }
}


export default removeCart;