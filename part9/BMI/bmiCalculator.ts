type bmiResult = string;

interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length >=5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};



export const calculateBmi = (height:number, weight:number):bmiResult => {
    
    const heightInMeterSquared=(height*height)/10000;
    const bmi=weight/heightInMeterSquared;
   

    console.log('bmi is:',bmi);

    if ((bmi>0)&&(bmi<18.5)){return "Underweight";}
    if ((bmi>=18.5)&&(bmi<24.9)){return "Normal (healthy weight)";}
    if ((bmi>=24.9)&&(bmi<29.9)){return "Overweight";}
    if (bmi>=29.9){return "Obese";}
    else {return "error input...";}


    
  };
  

  try{
      const {height,weight}=parseArguments(process.argv);
      console.log(calculateBmi(height,weight));
  }
  catch(e){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(e.message);
  }