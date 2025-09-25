import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  //   if (!contact) {
  //     res.status(404).json({
  //       status: 404,
  //       message: 'Contact not found',
  //     });
  //     return;
  //   }

  if (!contact) {
    // 2. Створюємо та налаштовуємо помилку
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}
