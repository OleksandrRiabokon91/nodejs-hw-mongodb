const parseTypeFilter = (type) => {
  if (typeof type !== 'string') return undefined;
  const allowedTypes = ['work', 'home', 'personal'];
  const typeLower = type.toLowerCase();
  return allowedTypes.includes(typeLower) ? typeLower : undefined;
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
