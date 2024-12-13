const { Client } = require("discord.js-selfbot-v13");

const { mirrors } = require("../../config.json");

const { verifyMessage } = require("../utils/messageVerification");
const { sendWebhook } = require("../utils/messageSend");
const {
  removeChannelMentions,
  removeRoles,
  removeUnknownUsers,
  removeEveryonePing,
  removeHerePing,
} = require("../utils/messageManipulation");

module.exports = class MirrorClient extends Client {
  constructor(options) {
    super(options);
    this.mirrors = mirrors;
    this.bindEvents();
  }

  bindEvents() {
    this.on("ready", this.onReady);
    this.on("messageCreate", this.onMessage);
  }

  async onReady() {
    console.log(`${this.user.tag} is now mirroring >:)`);
  }

  async onMessage(message) {
    try {
      const { channelId } = message;

      const data = this.mirrors.find((m) => m.channelId === channelId);

      await verifyMessage(data, message);

      removeChannelMentions(message);
      removeRoles(message);
      removeUnknownUsers(message);
      removeEveryonePing(message);
      removeHerePing(message);
      console.log(`Message received in ${channelId}: ${message.content}`);

      await sendWebhook(message, data);
    } catch (error) {
      if (error.isOperational) return;
      console.log(error);
    }
  }
};
