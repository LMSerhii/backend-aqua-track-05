import express from "express";

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import {
  isValiId,
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite,
} from "../middlewares/contactsMiddlewares.js";
import { auth, verifyOwner } from "../middlewares/authMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.post("/", auth, validateCreateContact, createContact);

contactsRouter.get("/:id", isValiId, auth, verifyOwner, getOneContact);

contactsRouter.delete("/:id", isValiId, auth, verifyOwner, deleteContact);

contactsRouter.put(
  "/:id",
  isValiId,
  auth,
  verifyOwner,
  validateUpdateContact,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValiId,
  auth,
  verifyOwner,
  validateUpdateFavorite,
  updateFavorite
);

export default contactsRouter;
