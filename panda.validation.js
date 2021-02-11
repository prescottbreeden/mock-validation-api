const { always, compose, prop } = require('ramda');
const NameValidation = require("./name.validation");
const { generateValidationFuncs } = require('./validation');

const PandaValidation = () => {
  const { validateAll: validateName } = generateValidationFuncs(NameValidation());
  return {
    name: [
      {
        errorMessage: 'Must be a valid name.',
        validation: compose(
          validateName,
          prop('name'),
        ),
      },
    ],
    friend: [
      {
        errorMessage: 'Your face has a length of friendship...',
        validation: always(false),
      }
    ]
  }
};

module.exports = PandaValidation;
