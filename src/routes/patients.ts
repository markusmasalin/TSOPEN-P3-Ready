import express from 'express';
import patientService from '../services/patientService'
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});


router.get('/:id', (_req, res) => {
  const patient = patientService.findById(_req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  try {
     const newPatientEntry = toNewPatientEntry(_req.body);
     const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e){
    res.status(400).send(e.message);
  }
  
})
router.post('/:id/entries/', (_req, res) => {
  console.log("req", _req.body);
  try {
      const newEntry = toNewEntry(_req.body);
      if (!newEntry){
        throw new Error("The object was undefined");
      }
      const addedEntry = patientService.addPatientEntry(newEntry, _req.params.id);
    res.json(addedEntry);
  } catch (e){
    res.status(400).send(e.message);
  }
  })



export default router;