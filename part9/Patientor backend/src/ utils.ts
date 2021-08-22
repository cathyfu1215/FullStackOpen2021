
import { NewPatientEntry,Gender} from './types';

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};

const parseDOB = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth');
    }
  
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender|| !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};


  
  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isGender= (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };


type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown,entries:unknown };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toNewPatientEntry=({name,dateOfBirth,ssn,gender,occupation}:Fields): NewPatientEntry=>{
    
    
    
    const newEntry:NewPatientEntry ={
        name:parseName(name),
        dateOfBirth:parseDOB(dateOfBirth),
        ssn:parseSSN(ssn),
        gender:parseGender(gender),
        occupation:parseOccupation(occupation),
        entries:[]
       

    };
    return newEntry;
};

export default toNewPatientEntry;

