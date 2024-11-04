import {
  ERROR_CODE_TO_ERROR_TITLE_MAP,
  ERROR_TITLES,
  ERROR_CODES,
} from "../utils/constants/constants.js";

const errorHandler = (err, req, res, next) => {
  console.log("jabba");

  const statusCode = res.statusCode
    ? res.statusCode
    : ERROR_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode);

  const errorTitle = ERROR_CODE_TO_ERROR_TITLE_MAP[statusCode];

  if (!errorTitle) {
    const env = process.env.NODE_ENV || "development";
    const stackTrace =
      env === "development"
        ? {
            message: err.message,
            stackTrace: err.stack,
          }
        : {};
    res.json({
      title: ERROR_TITLES.DEFAULT,
      ...stackTrace,
    });
  } else {
    res.json({
      title: errorTitle,
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

export default errorHandler;
