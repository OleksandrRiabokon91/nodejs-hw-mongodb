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

import {
  createContactSchema,
  updateContactSchema,
  replaceContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', isValidID, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:id', isValidID, ctrlWrapper(deleteContactController));
router.put(
  '/:id',
  isValidID,
  validateBody(replaceContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:id',
  isValidID,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
