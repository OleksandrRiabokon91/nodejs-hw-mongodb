import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  const contacts = await ContactsCollection.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
}

export async function createContact(payload) {
  const contact = await ContactsCollection.create(payload);
  return contact;
}

export function deleteContact(contactId) {
  const contact = ContactsCollection.findByIdAndDelete({
    _id: contactId,
  });
  return contact;
}

export async function replaceContact(contactId, payload) {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      upsert: true,
      includeResultMetadata: true,
    },
  );
  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(contactId, payload) {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
    },
  );
  return result;
}
