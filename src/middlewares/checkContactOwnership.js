import { ContactsCollection } from '../db/models/contact.js';

export const checkContactOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const contact = await ContactsCollection.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    if (contact.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.contact = contact;
    next();
  } catch (error) {
    next(error);
  }
};
