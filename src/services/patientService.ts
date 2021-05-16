import { patientData } from '../data/patients';
import { PublicPatient, Patient, NewPatientEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitiveEntries = (): PublicPatient[] => {
        return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
    };
    

const getEntries = (): Patient[] => {
    return patientData;
}

const addPatient = (
    entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }

    patientData.push(newPatientEntry);
    return newPatientEntry;
}



const addPatientEntry = (
    entry: Entry, id: string ): Patient[] => {
    console.log(entry, "entry");
    const patient = patientData.find(p => p.id === id);
    if(patient) {
        patientData.find(p => p.id === id)?.entries.push(entry);
        console.log(patientData, "patiantData");
        return patientData;
    } else {
        throw new Error();
    }

}

const findById = (id: string ): Patient | undefined => {
    const entry = patientData.find(p => p.id === id);
    return entry;
}

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById,
    addPatientEntry
}