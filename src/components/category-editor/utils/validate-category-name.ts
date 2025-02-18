const validateCategoryName = (newName: string): boolean => {
  return newName.trim().length > 0;
}

export { validateCategoryName };
