import { Router } from "express";
import AllergyController from "../controller/allergy.mjs";

const routerAllergy = Router();

routerAllergy.get('/test', AllergyController.test);
routerAllergy.get('/',AllergyController.getAllergies);
routerAllergy.get('/:username', AllergyController.getAllergyByUsername);
routerAllergy.post('/:username',AllergyController.insertAllergy);
routerAllergy.put('/:username/:oldAllergy',AllergyController.updateAllergy); 
routerAllergy.delete('/:username/:allergy', AllergyController.deleteAllergyByUsername);

export default routerAllergy;