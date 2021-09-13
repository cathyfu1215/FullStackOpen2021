/* eslint-disable react/jsx-key */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Gender, Patient,Entry } from "../types";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import axios from "axios";

import { Icon} from 'semantic-ui-react';
import { useStateValue } from "../state";
import {fetchOnePatient} from"../state/reducer";

const SinglePatientView=():JSX.Element=>{

  /* just use the patient variable from the context*/

  const [{patient,diagnosis}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
  React.useEffect(()=>{
    const fetchSinglePatient = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch(fetchOnePatient(singlePatient));
      } catch (e) {
        console.error(e);
      }

    };
     void fetchSinglePatient();

  },[dispatch]);

  
      
  const genderIcon=(gender:Gender)=>{
      if (gender==="male"){return <Icon  name="mars"/>;}
      if (gender==="female"){return<Icon name="venus"/>;}
      else return<Icon name="genderless"/>;
  };

  const fetchCodeName=(c:string)=>{
    // console.log('diagnosis list:',diagnosis);
    if(diagnosis){
    const obj=diagnosis.find(d=>String(d.code)===String(c));
    if(obj){
    return (obj.name);}}
  };


    if(patient){
      // console.log('patient info:',patient);
      const entries:Entry[]=patient.entries;
     
    return(

     <div>
         <h2>{patient.name}:{genderIcon(patient.gender)}</h2>
         <h4>ssn:{patient.ssn}</h4>
         <h4>occupation:{patient.occupation}</h4>
         <h2>Entries</h2>
         {entries.map(entry=>{
           const codes=entry.diagnosisCodes;
           return(
            <div key={entry.id}>
              <p key={entry.id}>{entry.date}{entry.description}</p>
              {codes?.map(c=>{
                const codeName=fetchCodeName(c);
                return(
                <li key={c}> {c}:{codeName}</li>);
              })}
            </div>
           );
         })}
     </div>
 );}
 else{
     return <p>cannot find this patient...</p>;
 }

};

export default SinglePatientView;