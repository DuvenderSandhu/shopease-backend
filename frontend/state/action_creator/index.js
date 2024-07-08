export const addCart = (item) => {
    return (dispatch) => {
      dispatch({
        type: 'addCart',
        payload: item
      })
    }
  }
export const removeCart = (item) => {
    return (dispatch) => {
      dispatch({
        type: 'removeCart',
        payload: item
      })
    }
  }
export const showNotification = (value) => {
    return (dispatch) => {
      dispatch({
        type: 'showNotification',
        payload: value
      })
    }
  }
export const changeUser = (value) => {
    return (dispatch) => {
      dispatch({
        type: 'changeUser',
        payload: value
      })
    }
  }
  
  
