import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { contactTypeFilter, isFavouriteFilter } = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    contactTypeFilter,
    isFavouriteFilter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}
export async function getContactByIdController(req, res, next) {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}
export async function createContactController(req, res) {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });
}
export async function deleteContactController(req, res, next) {
  const { id } = req.params;
  const result = await deleteContact(id);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
}
export async function upsertContactController(req, res) {
  const result = await replaceContact(req.params.id, req.body);
  if (result.updatedExisting) {
    return res.json({
      status: 200,
      message: 'Contact replaced successfully',
      data: result.value,
    });
  }
  return res.status(201).json({
    status: 201,
    message: 'No update ID found. A NEW contact has been created.',
    data: result.value,
  });
}
export async function updateContactController(req, res) {
  const contact = await updateContact(req.params.id, req.body);
  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }
  return res.status(200).json({
    status: 200,
    message: 'Contact updated successfully',
    data: contact,
  });
}
