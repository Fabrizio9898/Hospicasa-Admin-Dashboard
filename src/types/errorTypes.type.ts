type InnerError = {
  _errors: string[];
};

export type RegisterErrors = {
  name?: InnerError;
  email?: InnerError;
  password?: InnerError;
  confirm_password?: InnerError;
  profile_image?: InnerError;
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
