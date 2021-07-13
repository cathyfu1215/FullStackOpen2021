import React, { useState } from 'react'

const History=({good,neutral,bad})=>{
  
  if (good===0&&bad===0&&neutral===0)
  {
    return(<p>No feedback given.</p>)
  }
  else{
    return(
     <div>

      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={good+bad+neutral}/>
      <Statistics text='average' value={(good-bad)/(good+bad+neutral)}/>
      <Statistics text='positive'value={(good/(good+bad+neutral))}/>

    </div>  
    )
  }


}
const Statistics=({text,value})=>{
  return(
    <table>
      <tbody>
      <tr>
        <th>{text}</th>
      <td>{value}</td>
      </tr>
      </tbody>
      </table>
  )
}

const Button=({handle,text})=>{
    
  return(
   <button onClick={handle}>{text}</button>
  )

}

const App = () => {

  //states:
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //event handlers:
  const handlegood=()=>setGood(good+1)
  const handleneutral=()=>setNeutral(neutral+1)
  const handlebad=()=>setBad(bad+1)
  

 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={handlegood}  text="good"/>
      <Button handle={handleneutral}  text="neutral"/>
      <Button handle={handlebad}  text="bad"/>
      
      <h1>statistics</h1>
      <History good={good} neutral={neutral} bad={bad}/>
      
      
    </div>
  )
}

export default App