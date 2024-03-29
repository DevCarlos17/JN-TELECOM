import { Router } from "express";
import { signup, signin, getUser, getEmployees, getSupervisors, changeCanSeeContact, changeCanSeeScheduledContact } from "../controllers/auth.controllers.js";
import veryfiToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/signup", signup)
router.post("/signin", signin,)
router.get("/user", veryfiToken, getUser)
router.get("/getEmployees", getEmployees)
router.get("/getSupervisors", getSupervisors)
router.put("/user/canSeeContact/:id", changeCanSeeContact)
router.put("/user/canSeeScheduledContact/:id", changeCanSeeScheduledContact)



export default router