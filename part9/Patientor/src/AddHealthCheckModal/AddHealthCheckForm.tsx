import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form,  } from "formik";

import { TextField, SelectField, RatingOption, } from "./FormField";
import { HealthCheckEntry, HealthCheckRating, } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";


/*
 * use type HealthCheckEntry, but omit id and type,
 * because those are irrelevant for new HealthCheckForm object.
 */
export type HealthCheckFormValues = Omit<HealthCheckEntry, "type"|"id">;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy,label:"Healthy"},
  { value: HealthCheckRating.LowRisk,label:"LowRisk"},
  { value: HealthCheckRating.HighRisk,label:"HighRisk"},
  { value: HealthCheckRating.CriticalRisk,label:"CriticalRisk"}
];

export const AddHealthCheckForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosis }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        healthCheckRating:HealthCheckRating.Healthy,
        description:'',
        date:'',
        specialist:'',
        diagnosisCodes:[]
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        /*since I use SelectField for the health rating enum type,  it won't have blanks or wrong formats */
        
        return errors;
      }}
    >
       
      {({ isValid, dirty,setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            
            <SelectField
              label="HealthCheckRating"
              name="HealthCheckRating"
              options={ratingOptions}
            />

            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />  

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckForm;
