import validator from "validator";

const validateUsername = (str) => {
  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1);

  const isAlphaNumeric = validator.isAlphanumeric(str, undefined, {
    ignore: "-",
  });
  const noTrailingSpaces = str.trim().length === str.length;
  const beginsAndEndsWithChar =
    validator.isAlpha(firstChar) && validator.isAlpha(lastChar);
  return isAlphaNumeric && noTrailingSpaces && beginsAndEndsWithChar;
};

const validateName = (str) => {
  const isAlphaNumeric = validator.isAlpha(str, undefined, {
    ignore: " ",
  });
  const noTrailingSpaces = str.trim().length === str.length;
  return isAlphaNumeric && noTrailingSpaces;
};

const validateEmail = (str) => {
  return validator.isEmail(str);
};

const validatePassword = (str) => {
  const hasTrailingSpaces = str.length === str.trim().length;
  const isStrongPassword = validator.isStrongPassword(str, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  });

  return !hasTrailingSpaces && isStrongPassword !== false;
};

export { validateUsername, validateName, validateEmail, validatePassword };
