const extractErrorMessage = (error: any) => {
  if (typeof error === 'string') {
    return error;
  }
  const code = errorCode(error);
  if (code >= 500 && code < 600) {
    return "Sorry! We're experiencing technical difficulties. Please try again.";
  }
  if (error.response) {
    if (typeof error?.response?.data === 'string') {
      return error?.response?.data;
    }
    if (error.response.data?.message) {
      return error.response.data.message;
    }
  }
  if (error.error && error.error.message) {
    return error.error.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Check your internet connection';
};

const errorCode = (error: any) => {
  if (error.response && error.response.status) {
    return error.response.status;
  }
  if (error.data && error.data.response && error.data.response.status) {
    return error.data.response.status;
  }
  return null;
};

export { errorCode, extractErrorMessage };
