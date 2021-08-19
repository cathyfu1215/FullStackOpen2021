import patientEntries from "../../data/patients";
import { PatientEntry,NonSensitivePatientEntry } from "../../types";


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
  
  const addEntry = () => {
    return [];
  };
  
  export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
  };