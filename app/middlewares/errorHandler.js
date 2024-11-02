import {
  ERROR_CODE_TO_ERROR_TITLE_MAP,
  ERROR_TITLES,
  ERROR_CODES,
} from "../constants/constants.js";

const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_CODES.INTERNAL_SERVER_ERROR } = res || {};

  let errorTitle = ERROR_CODE_TO_ERROR_TITLE_MAP[statusCode];

  if (!errorTitle) {
    res.status(ERROR_CODES.INTERNAL_SERVER_ERROR);
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
    next();
  } else {
    res.json({
      title: errorTitle,
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

export default errorHandler;
