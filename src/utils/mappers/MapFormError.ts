type TFeildError = {
  name: string[];
  errors: string[];
  warnings: string[];
};

export const MapFormError = (fields: TFeildError[]) => {
  return fields.map((field) => field.errors).filter(Boolean);
};
