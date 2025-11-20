type InnerError = {
  _errors: string[];
};

export type RegisterErrors = {
  fullname?: InnerError;
  email?: InnerError;
};

export type LoginErrors = {
  email?: InnerError;
  password?: InnerError;
};

export type IQueryErrors = {
  page?: InnerError;
  limit?: InnerError;
  rating?: InnerError;
  search?: InnerError;
};
