
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../ utils';

const router = express.Router();

router.get('/', (_req, res) => {//get all patients without ssn and diagnose entries 
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => { //by doing this none of the fields are hidden
  
  const id =req.params.id;
  const thePatient=patientService.findById(id);

  if(thePatient){res.send(thePatient);}
  else{res.sendStatus(404);}

});

router.post('/', (req, res) => {
  
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    
    res.json(addedEntry);
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (e:any) {
    res.status(400).send(e.message);
  }
});

export default router;