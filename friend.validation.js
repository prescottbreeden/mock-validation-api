const { always, compose, prop } = require('ramda');
const NameValidation = require("./name.validation");
const { generateValidationFuncs } = require('./validation');

const FriendValidation = () => {
  const { validateAll } = generateValidationFuncs(NameValidation());
  return {
    name: [
      {
        errorMessage: 'Must be a valid name.',
        validation: compose(
          validateAll,
          prop('name'),
        ),
      },
    ],
    lengthOfFriendship: [
      {
        errorMessage: 'Your face has a length of friendship...',
        validation: always(false),
      }
    ]
  }
};

module.exports = FriendValidation;
