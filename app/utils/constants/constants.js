const ERROR_CODES = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_TITLES = {
  VALIDATION_ERROR: "Validation Error",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  DEFAULT: "An error occurred",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

const ERROR_CODE_TO_ERROR_TITLE_MAP = {
  [ERROR_CODES.VALIDATION_ERROR]: ERROR_TITLES.VALIDATION_ERROR,
  [ERROR_CODES.UNAUTHORIZED]: ERROR_TITLES.UNAUTHORIZED,
  [ERROR_CODES.FORBIDDEN]: ERROR_TITLES.FORBIDDEN,
  [ERROR_CODES.NOT_FOUND]: ERROR_TITLES.NOT_FOUND,
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: ERROR_TITLES.INTERNAL_SERVER_ERROR,
};

const CORS_DEV_OPTIONS = {
  origin: `https://localhost:${process.env.PORT}`,
  optionsSuccessStatus: 200,
};

export {
  ERROR_CODE_TO_ERROR_TITLE_MAP,
  ERROR_TITLES,
  ERROR_CODES,
  CORS_DEV_OPTIONS,
};
