/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientEntries from "../../data/patients";
import { PatientEntry,NonSensitivePatientEntry,NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';


const getEntries = (): Array<PatientEntry> => {
    return patientEntries;
  };

 const getNonSensitiveEntries=():NonSensitivePatientEntry[]=>{
    const nonSensitivePatients=patientEntries.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })) ;
    return nonSensitivePatients;
 }; 
  
  const addEntry = (entry:NewPatientEntry):PatientEntry => {
    
    const id = uuid();

        const newPatientEntry={
            id:id,
            ...entry

        };

        patientEntries.concat(newPatientEntry);
        return newPatientEntry;
  };
  
  export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
  };