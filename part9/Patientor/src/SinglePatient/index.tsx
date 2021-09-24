

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Gender, Patient,Entry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from "../types";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import axios from "axios";

import { Button, Icon} from 'semantic-ui-react';
import { useStateValue } from "../state";
import {fetchOnePatient} from"../state/reducer";
import AddHealthCheckModal from "../AddHealthCheckModal";
import { HealthCheckFormValues } from "../AddHealthCheckModal/AddHealthCheckForm";




const SinglePatientView=():JSX.Element=>{

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };




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

   
   const submitNewHealthCheckEntry = async (values: HealthCheckFormValues) => {
    try {
      const { data: newHealtchCheckEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/api/patients/${id}`,
        values
      );
      dispatch({ type: "ADD_HEALTHCHECKENTRY", payload: newHealtchCheckEntry });
      console.log('posting new healtch check entry', newHealtchCheckEntry);
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


  
      
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

  const HealthCheckEntryComponent=(props:{item:HealthCheckEntry})=>{
    const codes=props.item.diagnosisCodes;
    return(
      <div style={{backgroundColor: "lightblue",marginBottom:10,marginTop:10}}>
      <h3>HealthCheck <Icon  name="doctor"/></h3>
      <div>
      <h4>{props.item.date}</h4>
      <p>{props.item.description}</p>
              {codes?.map(c=>{
                const codeName=fetchCodeName(c);
                return(
                <li key={c}> {c}:{codeName}</li>);
              })}
            </div>
    </div>
    );
  };
  const HospitalEntryComponent=(props:{item:HospitalEntry})=>{
    const codes=props.item.diagnosisCodes;
    return(
      <div style={{backgroundColor: "lightyellow",marginBottom:10,marginTop:10}}>
      <h3>Hospital <Icon  name="hospital"/></h3>
      
      <div>
      <h4>{props.item.date}</h4>
              <p>{props.item.description}</p>
              {codes?.map(c=>{
                const codeName=fetchCodeName(c);
                return(
                <li key={c}> {c}:{codeName}</li>);
              })}
            </div>
    </div>
    );
  };
  const OccupationalHealthcareEntryComponent=(props:{item:OccupationalHealthcareEntry})=>{
    const codes=props.item.diagnosisCodes;
    return(
      <div style={{backgroundColor: "lightgreen",marginBottom:10,marginTop:10}}>
      <h3>OccupationalHealthcare <Icon  name="lab"/></h3>
      
      <div>
              <h4>{props.item.date}</h4>
              <p>{props.item.description}</p>
              {codes?.map(c=>{
                const codeName=fetchCodeName(c);
                return(
                <li key={c}> {c}:{codeName}</li>);
              })}
            </div>
    </div>
    );
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

         if(entry.type==="Hospital"){return <HospitalEntryComponent item={entry}/>;}
         if(entry.type==="OccupationalHealthcare"){return <OccupationalHealthcareEntryComponent item={entry}/>;}
         else return <HealthCheckEntryComponent item={entry}/>;

           
           
         })}

         <AddHealthCheckModal
        modalOpen={modalOpen}
        onSubmit={submitNewHealthCheckEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Health Check Entry</Button>
     </div>
 );}
 else{
     return <p>cannot find this patient...</p>;
 }

};

export default SinglePatientView;