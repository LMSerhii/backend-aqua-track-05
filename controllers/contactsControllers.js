import {
  addContact,
  listContacts,
  removeContact,
  upgradeContact,
} from "../services/contactsServices.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await listContacts(owner, req.query);

  res.json(contacts);
});

export const createContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const contact = await addContact({ ...req.body, owner });

  res.status(201).json(contact);
});

export const getOneContact = (req, res) => {
  const { contact } = req;

  res.json(contact);
};

export const deleteContact = catchAsync(async (req, res) => {
  const { _id: id } = req.contact;

  await removeContact(id);

  res.sendStatus(204);
});

export const updateContact = catchAsync(async (req, res) => {
  const { _id: id } = req.contact;

  const contact = await upgradeContact(id, req.body);

  res.json(contact);
});

export const updateFavorite = catchAsync(async (req, res) => {
  const { _id: id } = req.contact;
  const { favorite } = req.body;

  const contact = await upgradeContact(id, { favorite });

  res.json(contact);
});
