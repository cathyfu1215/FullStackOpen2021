
export const notificationChange = notification => {
    
    return {
        type: 'SET_NOTIFICATION',
        notification,
      }
      
    }

export const clearNotification = () => {
    
      return {
      type: 'CLEAR',
      notification:null}
        
      }
  
  
  const notificationReducer = (state = '', action) => {
      switch (action.type) {
        case 'SET_NOTIFICATION':
          return action.notification
        case'CLEAR':
        return action.notification
        default:
          return state
      }
    }
  
    export default notificationReducer