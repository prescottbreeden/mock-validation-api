const R = require("ramda");


// vStateReducer :: Schema -> State
const createValidationState = R.compose(
  R.reduce((acc, key) => ({
    ...acc,
    [key]: {
      errors: [],
      isValid: true,
    },
  }), {}),
  R.keys,
);

// validate :: Schema -> string -> x -> Partial<State>
const validate = R.curry((schema, property, value) => {
  // applyValueToSchemaValidations :: list -> boolean
  const applyValueToSchemaValidations = R.map(
    R.compose(
      R.applyTo(value),
      R.prop("validation")
    )
  );
  const bools = applyValueToSchemaValidations(schema[property]);
  const errors = bools.reduce((acc, curr, idx) => {
    // getErrorMessage :: Schema -> string
    const getErrorMessage = R.path([property, idx, 'errorMessage']);
    return curr ? acc : [...acc, getErrorMessage(schema)];
  }, []);

  return {
    [property]: {
      errors,
      isValid: !errors.length,
    },
  };
});

// validateAll :: Schema -> x -> State
const validateAll = R.curry((schema, value) => {
  return Object.keys(schema).reduce((acc, curr) => {
    return {
      ...acc,
      ...validate(schema, curr, value),
    };
  }, {});
});

// validationStateIsValid :: State -> boolean
const validationStateIsValid = R.compose(
  R.reduce((acc, curr) => acc ? curr.isValid : acc, true),
  R.values,
);

const generateValidationFuncs = (schema) => {
  return {
    isValid: R.compose(validationStateIsValid, validateAll(schema)),
    validate: validate(schema),
    validateAll: validateAll(schema),
  };
};

module.exports = {
  createValidationState,
  generateValidationFuncs,
  validationStateIsValid,
  validate,
  validateAll,
};
