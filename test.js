const NameValidation = require('./name.validation');
const {
  createValidationState,
  generateValidationFuncs
} = require('./validation');

const assertEquals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const emptyNameValidation = createValidationState(NameValidation());

// Test Cases
const creates_a_valid_empty_validation_state = () => {
  const expectedValidationState = {
    firstName: { errors: [], isValid: true },
    lastName: { errors: [], isValid: true },
  };
  if (!assertEquals(emptyNameValidation, expectedValidationState)) {
    throw new Error('creates_valid_empty_validation_state returned invalid state')
  };
  return true;
}

const returns_an_object_with_errors = () => {
  const { isValid, validateAll } = generateValidationFuncs(NameValidation());
  const expectedErrorObject = {
    firstName: { errors: ['Dingo is already taken.'], isValid: false },
    lastName: { errors: ['Must be ross.'], isValid: false },
  };
  const payload = { firstName: 'dingo', lastName: '' };
  if (!assertEquals(validateAll(payload), expectedErrorObject)) {
    throw new Error('returns_an_object_with_errors returned an unexpected state')
  };
  if (!assertEquals(isValid(payload), false)) {
    throw new Error('returns_an_object_with_errors isValid expected false but recieved true')
  };
  return true;
}

creates_a_valid_empty_validation_state(),
returns_an_object_with_errors()

console.log('Test State: Passing');
