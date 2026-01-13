import {
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContact,
} from "../Controllers/contact.js";
import express from "express";
import { isAuthenticate } from "../Middleware/Auth.js";

const router = express.Router();

// create new contact
router.post("/new", isAuthenticate, newContact);

//get all contact
router.get("/allContact", getAllContact);

//get contact by id
router.get("/:id", getContactById);

//update the contact by id
router.put("/:id", isAuthenticate, updateContact);

//delete contact by id
router.delete("/:id", isAuthenticate, deleteContactById);

//get contact by user id
router.get("/userId/:id", getContactByUserId);

export default router;
