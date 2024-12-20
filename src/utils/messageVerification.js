const { MessageFlags } = require("discord.js-selfbot-v13");
const AppError = require("../classes/AppError");

const isEphemeral = (message) =>
  message.flags.has(MessageFlags.FLAGS.EPHEMERAL);

const isDirectMessage = (message) => !message.guild;

const verifyMessage = async (data, message) => {
  const errMsg = `Bypass failed: Not target message`;
  const { system } = message;

  if (system || isDirectMessage(message) || isEphemeral(message) || !data)
    throw new AppError(errMsg);
};

module.exports = {
  verifyMessage,
};
