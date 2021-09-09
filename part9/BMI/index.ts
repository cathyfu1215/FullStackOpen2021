import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  });



app.get('/bmi', (req, res) => {
  const height=Number(req.query.height);
  const weight=Number(req.query.weight);

  if ((!isNaN(height))&&(!isNaN(weight))){

  const bmiString= calculateBmi(height,weight);

  res.send({
    weight:weight,
    height:height,
    bmi:bmiString
  });}

  else{
    res.send({error: "malformatted parameters"});
  }

  
});

app.post('/exercises', (req, res) => {
    
    
    const { daily_exercises,target } = req.body
    if (target===undefined||target===null||daily_exercises===undefined||daily_exercises===null){res.send({error:'parameters missing'})};
    if(isNaN(Number(target))){res.send({error:'malformatted parameters:target'})};
    const result = calculateExercises(Number(target),daily_exercises);
    res.send(result);
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


