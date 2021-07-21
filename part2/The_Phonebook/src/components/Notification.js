const Notification = ({ messageType, message }) => {

const successMessageStyle={
    color: 'green',
    border:'solid',
    padding:10,
    backgroundColor:'lightgrey',
    fontSize: 16
}

const failMessageStyle={
    color: 'red',
    border:'solid',
    padding:10,
    backgroundColor:'lightgrey',
    fontSize: 16
}


    if (message) {

    if (messageType==='success'){
    return (
      <div style={successMessageStyle}>
        {message}
      </div>
    )}

    if(messageType==='fail'){
      return(
        <div style={failMessageStyle}>
        {message}
      </div>
      )
    }

    else return (<div>{message}</div>)
    
  }

  else return (" ") //if message is blank
}

  export default Notification