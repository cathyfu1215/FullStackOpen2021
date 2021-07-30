import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'


const Filter = (props) => {
    
    const handleChange=(event)=>{
        props.filterChange(event.target.value)
    }
  
    const style = {
        marginBottom: 10,
        marginTop:10
      }

    return (
        <div style={style}>
            filter
            <input name='filter' onChange={handleChange}/>
        </div>)
      
  }
  
  const mapDispatchToProps = {
    filterChange
  }
  
  const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)
  export default ConnectedFilter