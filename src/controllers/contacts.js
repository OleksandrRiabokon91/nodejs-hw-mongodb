// src/controllers/students.js
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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { id } = req.params;
  const contact = await getContactById(id, req.user.id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError(403, 'Contact is denied');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  const payload = {
    ...req.body,
    userId: req.user.id,
    ...(photoUrl && { photo: photoUrl }),
  };
  const contact = await createContact(payload);
  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;
  const result = await deleteContact(id, req.user.id);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
}

export async function upsertContactController(req, res) {
  const { id } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  const payload = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };
  const result = await replaceContact(id, payload, req.user.id);
  if (!result.value) {
    throw createHttpError(404, 'Contact not found or not created');
  }
  if (result.updatedExisting) {
    return res.status(200).json({
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
  const { id } = req.params;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  const payload = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };
  const contact = await updateContact(id, payload, req.user.id);
  if (!contact) throw createHttpError(404, 'Contact not found');
  return res.status(200).json({
    status: 200,
    message: 'Contact updated successfully',
    data: contact,
  });
}
