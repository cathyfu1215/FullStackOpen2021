import diagnoses from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = ():Array<DiagnoseEntry> => {
    return diagnoses;
  };
  
  const addDiagnoseEntry = () => {//will write it later
    return null;
  };
  
  export default {
    getEntries,
    addDiagnoseEntry
  };