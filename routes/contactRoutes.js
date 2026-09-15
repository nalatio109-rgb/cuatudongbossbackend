import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/")
  .get(getContacts)
  .post(submitContact);

router.route("/:id")
  .put(updateContactStatus)
  .delete(deleteContact);

export default router;
