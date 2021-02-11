const { generateValidationFuncs } = require('./validation');
const FriendValidation = require('./friend.validation');
const NameValidation = require('./name.validation');
const PandaValidation = require('./panda.validation');

const { validateAll: validateName } = generateValidationFuncs(NameValidation());
const { validateAll: validateFriend } = generateValidationFuncs(FriendValidation());
const { validateAll: validatePanda } = generateValidationFuncs(PandaValidation());

module.exports = {
  postName: (req, res) => res.json(validateName(req.body)),
  postFriend: (req, res) => res.json(validateFriend(req.body)),
  postPanda: (req, res) => res.json(validatePanda(req.body)),
};

