const NameValidation = () => {
  return {
    firstName: [
      {
        errorMessage: 'Dingo is already taken.',
        validation: (name) => name.firstName !== 'dingo',
      }
    ],
    lastName: [
      {
        errorMessage: 'Must be ross.',
        validation: (name) => name.lastName === 'ross',
      }
    ]
  }
};

module.exports = NameValidation;
