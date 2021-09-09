type exerciseResult=Record<string, unknown>;

interface exerciseValues {
    target: number;
    exerciseArray: Array<number>;
  }

const initialArray:Array<number>=[];



  
  const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    
    

    for (let index = 3; index < args.length; index++) {
        const element = args[index];
         
        if (!isNaN(Number(element))){initialArray.push(Number(element));}
        else {
            throw new Error('exercise hours should be an array of numbers!please check your entries.');
        }  
    }

    
    if (!isNaN(Number(args[2]))&&initialArray) {
      return {
        target: Number(args[2]),
        exerciseArray:initialArray ,
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }

    
  };

  
  

export const calculateExercises=( target:number,daily_exercises:Array<number>):exerciseResult=>{

    
    console.log('your target is :',target,'your input is:',daily_exercises );

    const periodLength=daily_exercises.length;
    const trainingDays=daily_exercises.filter(d=>d!=0).length;
    const targetTrainingHours= target;

    const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
    const sum=daily_exercises.reduce(reducer);

    const average=sum/periodLength;
    const success=(average>=target);
    const rating=success?'3':'2';
    const ratingDescription=success?'You have reached your target':'not bad, keep working';

    const resultObj={
        periodLength:periodLength ,
        trainingDays:trainingDays ,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetTrainingHours,
        average: average

    };
    
    return resultObj;
};


try{
  const {target,exerciseArray}=parseExerciseArguments(process.argv);
  console.log(calculateExercises(target,exerciseArray));
}
catch(e){
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
console.log(e.message);
}

