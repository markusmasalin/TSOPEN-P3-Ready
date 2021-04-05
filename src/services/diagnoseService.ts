import diagnoseData from '../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;


const getEntries = () => {
    return diagnoses;
}

const addEntry = () => {
    return null;
}

export default {
    getEntries,
    addEntry
}