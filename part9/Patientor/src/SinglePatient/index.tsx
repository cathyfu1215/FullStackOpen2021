/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Gender, Patient } from "../types";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import axios from "axios";

import { Icon} from 'semantic-ui-react';
import { useStateValue } from "../state";
import {fetchOnePatient} from"../state/reducer";

const SinglePatientView=():JSX.Element=>{

  /* just use the patient variable from the context*/

  const [{patient}, dispatch] = useStateValue();
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

 


    if(patient){
    return(
     <div>
         <h2>{patient.name}:{genderIcon(patient.gender)}</h2>
         <h4>ssn:{patient.ssn}</h4>
         <h4>occupation:{patient.occupation}</h4>
     </div>
 );}
 else{
     return <p>cannot find this patient...</p>;
 }

};

export default SinglePatientView;