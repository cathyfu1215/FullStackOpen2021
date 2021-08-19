import diagnoses from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = ():Array<DiagnoseEntry> => {
    console.log('should return some objects here');
    return diagnoses;
  };
  
  const addEntry = () => {
    return null;
  };
  
  export default {
    getEntries,
    addEntry
  };