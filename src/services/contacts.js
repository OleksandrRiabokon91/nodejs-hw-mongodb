import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  contactTypeFilter,
  isFavouriteFilter,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = {};
  if (contactTypeFilter) filter.contactType = contactTypeFilter;
  if (typeof isFavouriteFilter === 'boolean') {
    filter.isFavourite = isFavouriteFilter;
  }

  const contactsQuery = ContactsCollection.find(filter)
    .sort({ [sortBy]: sortOrder })
    .collation({ locale: 'en', strength: 2 })
    .skip(skip)
    .limit(limit)
    .exec();

  const contactsCount = ContactsCollection.countDocuments(filter);

  const [contacts, total] = await Promise.all([contactsQuery, contactsCount]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(id) {
  const contact = await ContactsCollection.findById(id);
  return contact;
}

export async function createContact(payload) {
  const contact = await ContactsCollection.create(payload);
  return contact;
}

export function deleteContact(id) {
  const contact = ContactsCollection.findByIdAndDelete(id);
  return contact;
}

export async function replaceContact(id, payload) {
  const result = await ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(id, payload) {
  const result = await ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
}
