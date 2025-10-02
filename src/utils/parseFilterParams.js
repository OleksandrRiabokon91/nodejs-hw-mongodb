// src/utils/parseFilterParams.js

const parseTypeFilter = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const allowedTypes = ['work', 'home', 'personal'];
  return allowedTypes.includes(type) ? type : undefined;
};

const parseIsFavouriteFilter = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactTypeFilter, isFavouriteFilter } = query;

  const parsedContactTypeFilter = parseTypeFilter(contactTypeFilter);
  const parsedIsFavouriteFilter = parseIsFavouriteFilter(isFavouriteFilter);

  return {
    contactTypeFilter: parsedContactTypeFilter,
    isFavouriteFilter: parsedIsFavouriteFilter,
  };
};
