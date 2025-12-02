// src/validation/contacts.js

import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+(?:\d{1,3})(?:-?\d){6,14}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be in international format starting with "+", may include "-", NO spaces " ". Examples: +380931234567, +380-93-123-4567',
    })
    .required(),
  email: Joi.string()
    .trim()
    .case('lower')
    .min(8)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'io'] },
    }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .trim()
    .case('lower')
    .valid('work', 'home', 'personal')
    .default('personal'),
}).prefs({
  messages: {
    'string.base': '{#label} must be a string',
    'string.empty': '{#label} is required',
    'string.min': '{#label} must have at least {#limit} characters',
    'string.max': '{#label} must have at most {#limit} characters',
    'any.required': '{#label} is required',
    'string.email': '{#label} must be a valid email',
    'string.pattern.base': '{#label} format is invalid',
  },
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).messages({
    'string.empty': 'Cannot update name to empty value',
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+(?:\d{1,3})(?:-?\d){6,14}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be in international format starting with "+", may include "-", NO spaces " ". Examples: +380931234567, +380-93-123-4567',
      'string.empty': 'Cannot update phone number to empty value',
    }),
  email: Joi.string()
    .trim()
    .case('lower')
    .min(8)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'io'] },
    })
    .messages({
      'string.empty': 'Cannot update email to empty value',
      'string.email': 'Email must be a valid email',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .trim()
    .case('lower')
    .valid('work', 'home', 'personal')
    .messages({
      'string.empty': 'Cannot update contact type to empty value',
    }),
})
  .min(1)
  .prefs({
    messages: {
      'string.base': '{#label} must be a string',
      'string.min': '{#label} must have at least {#limit} characters',
      'string.max': '{#label} must have at most {#limit} characters',
      'string.pattern.base': '{#label} format is invalid',
    },
  });

export const replaceContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+(?:\d{1,3})(?:-?\d){6,14}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be in international format starting with "+", may include "-", NO spaces " ". Examples: +380931234567, +380-93-123-4567',
    }),
  email: Joi.string()
    .trim()
    .case('lower')
    .min(8)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'io'] },
    })
    .required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .trim()
    .case('lower')
    .valid('work', 'home', 'personal')
    .required(),
}).prefs({
  messages: {
    'string.base': '{#label} must be a string',
    'string.empty': '{#label} is required',
    'string.min': '{#label} must have at least {#limit} characters',
    'string.max': '{#label} must have at most {#limit} characters',
    'any.required': '{#label} is required',
    'string.email': '{#label} must be a valid email',
    'string.pattern.base': '{#label} format is invalid',
  },
});
