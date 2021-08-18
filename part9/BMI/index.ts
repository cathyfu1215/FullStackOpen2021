import * as express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  });



app.get('/bmi', (req, res) => {
  let height=Number(req.query.height);
  let weight=Number(req.query.weight);

  if ((!isNaN(height))&&(!isNaN(weight))){

  const bmiString= calculateBmi(height,weight);

  res.send({
    weight:weight,
    height:height,
    bmi:bmiString
  });}

  else{
    res.send({error: "malformatted parameters"})
  }

  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});