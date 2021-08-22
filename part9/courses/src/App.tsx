import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  interface CourseName{
    name:string
  }


  interface CoursePartBase {
   name: string;
   exerciseCount: number;
   type: string;
}

 interface CourseDetailedPart extends CoursePartBase{
   description:string;
 } 
interface CourseNormalPart extends CourseDetailedPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDetailedPart {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseWithRequirementPart extends CourseDetailedPart{
  type:"special";
  requirements:string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart|CourseWithRequirementPart;

 

  const Header=({name}:CourseName)=>{
    return(<h1>{name}</h1>)
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Content=():JSX.Element=>{

    const block=(item:CoursePart)=>{
      return(<div key={item.name}>{Part(item)}</div>)};
    
    return(
    <div> 
    {courseParts.map(part=>block(part))}
    </div>);
  };

  const Part=(part:CoursePart):JSX.Element=>{
      
    switch(part.type){
      case "normal":
        return(
        <div>
          <h3>name:{part.name}{part.exerciseCount}</h3>
          <i>description:{part.description}</i>
        </div>)
          break;
            
      case "groupProject":
        return(
        <div>
          <h3>name:{part.name}{part.exerciseCount}</h3>
          <p>group project count:{part.groupProjectCount}</p>
        </div>)
        break;
           
      case "submission":
        return(
        <div>
          <h3>name:{part.name}{part.exerciseCount}</h3>
          <i>description:{part.description}</i>
          <p>exercise submission link:{part.exerciseSubmissionLink}</p>
        </div>)
        break;
      case "special":
        return(
        <div>
        <h3>name:{part.name}{part.exerciseCount}</h3>
        <i>description:{part.description}</i>
        <p>requirements:{part.requirements}</p>
        </div>)
        break;

      default:
        return assertNever(part);
        break;
            
        }};
      

  const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
  
  const Total=()=>{
    return(
      <div>
        <b>Number of exercises:{" "}{courseParts.map(part=>part.exerciseCount).reduce(reducer)}</b>
      </div>
    )
  };

  return (
    <div>
      <Header name={courseName} />
      <Content/>
      <Total/>
    </div>
  
  );
};

export default App;