
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../ utils';

const router = express.Router();

router.get('/', (_req, res) => {//get all patients without ssn and diagnose entries 
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => { //by doing this none of the fields are hidden
  
  const id =req.params.id;
  res.send(patientService.getEntries().filter(p=>p.id===id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    
    res.json(addedEntry);
  } 
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;