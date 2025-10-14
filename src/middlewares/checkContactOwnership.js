import { getContactById } from '../services/contacts.js';

export const checkContactOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(id, userId);
    if (!contact) {
      return res
        .status(404)
        .json({ message: 'Contact not found or access denied' });
    }

    req.contact = contact;
    next();
  } catch (error) {
    next(error);
  }
};
