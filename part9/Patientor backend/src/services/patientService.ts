/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientEntries from "../../data/patients";
import { PatientEntry,NonSensitivePatientEntry,NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';


const getEntries = (): Array<PatientEntry> => {
    return patientEntries;
  };

  const findById = (id: string): PatientEntry|undefined => {
    const entry = patientEntries.find(p => p.id === id);
    return entry;
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
  
  const addPatientEntry = (entry:NewPatientEntry):PatientEntry => {
    
    const id = uuid();

    const newPatientEntryWithId={
            id:id,
            ...entry
    };

    patientEntries.concat(newPatientEntryWithId);
    return newPatientEntryWithId;
  };
  
  export default {
    getEntries,
    getNonSensitiveEntries,
    addPatientEntry,
    findById
  };