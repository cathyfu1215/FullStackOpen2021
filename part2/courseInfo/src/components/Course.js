import React from 'react'

const Course=({course})=>{

    const Header=()=>{return (<h1>{course.name}</h1>)}

    const Part=({name,exercises})=>{return(<p key={name}>{name}:{exercises}</p>)}

    const Content=({parts})=>{return(

        parts.map(part=>{return(<Part key={part.name} name={part.name} exercises={part.exercises}/>)})
        
    )}
    
    //the reducer method executed by the reduce method:
    const SumAll=(accumulator,currentValue)=>{return (accumulator+currentValue)} // a new accumulator is returned

    //apply reduce method:
    const NumberArray=course.parts.map(part=>part.exercises)
    const total=NumberArray.reduce(SumAll)

    const Total=()=>{return(<p>Total of {total} exercises</p>)}

    return(
        <div>
        <Header/>
        <Content parts={course.parts}/>
        <Total/>
        </div>
            )



}


export default Course