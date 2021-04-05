import { BaseEntry, Entry, Gender, HealthCheckEntry, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry } from './types';
import {v1 as uuid} from 'uuid';


/* eslint-disable @typescript-eslint/no-explicit-any */
 const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    }
    return newEntry;
};


/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewEntry = (object: Entry): Entry | undefined => {

    const newEntry: BaseEntry = {
       id: uuid(),
       description: object.description,
       date: object.date,
       specialist: object.specialist,
       diagnosisCodes: object.diagnosisCodes
    }
    // const assertNever = (value: never): never => {
    //     throw new Error(
    //       `Unhandled discriminated union member: ${JSON.stringify(value)}`
    //     );
    //   };
        switch (object.type){
            case "Hospital": 
            const newHospitalEntry: HospitalEntry = {
                ...newEntry,
               type: object.type,
               discharge: object.discharge
              }
              return newHospitalEntry;
            case "OccupationalHealthcare": 
            const newOHEntry: OccupationalHealthcareEntry = {
                ...newEntry,
               type: object.type,
               employerName: object.employerName
              }
              return newOHEntry;
            case "HealthCheck": 
             const newHealthCheckEntry: HealthCheckEntry = {
                ...newEntry,
               type: object.type,
               healthCheckRating: object.healthCheckRating
 
              }
              return newHealthCheckEntry;
            default: return undefined;
        //      assertNever(object);
        }
};



const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing comment: ' + name)
    }
    return name;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation)
    }
    return occupation;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn)
    }
    return ssn;
};



const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date) ) {
        throw new Error('Incorrect or missing dateOfBirth: ' + date)
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender) ) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender;
};


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof  String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;