import { Contact } from "../models/contactModel.js";

export const listContacts = (owner, query) => {
  const { page = 1, limit = 10, favorite } = query;

  // pagination
  const skip = (page - 1) * limit;
  const options = { skip, limit };

  // filter
  const filter = favorite ? { owner, favorite } : { owner };

  return Contact.find(filter, {}, options);
};

export const getContactById = (id) => Contact.findById(id);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const addContact = (body) => Contact.create(body);

export const upgradeContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });
