import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export const setDiagnosisList=(diagnosisList:Diagnosis[]):Action=>{
  return{
    type:"SET_DIAGNOSIS_LIST",
    payload:diagnosisList
  };
};

export const setPatientList=(patientListFromApi:Patient[]):Action=>{
  return {
    type:"SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const fetchOnePatient=(patient:Patient):Action=>{
 return{
   type:"FETCH_SINGLE_PATIENT",
   payload:patient
 };
};


export const addPatient=(patient:Patient):Action=>{
  return{
    type:"ADD_PATIENT",
    payload:patient
  };
};


export type Action =
  | {
  type: "SET_DIAGNOSIS_LIST";
  payload: Diagnosis[];
    }

  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "FETCH_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnosis:action.payload
      };

    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

       /*below: return the patient list with only one item that has matched id*/
    case "FETCH_SINGLE_PATIENT":
      return{
        ...state,
        patient:action.payload
      };
    

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      
      
    default:
      return state;
  }
};
