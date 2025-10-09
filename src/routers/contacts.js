// src/routers/contacts.js
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { checkContactOwnership } from '../middlewares/checkContactOwnership.js';
import {
  createContactSchema,
  updateContactSchema,
  replaceContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:id',
  isValidID,
  checkContactOwnership,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:id',
  isValidID,
  checkContactOwnership,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:id',
  isValidID,
  checkContactOwnership,
  validateBody(replaceContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:id',
  isValidID,
  checkContactOwnership,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
