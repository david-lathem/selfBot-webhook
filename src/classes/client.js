const { Client } = require("discord.js-selfbot-v13");

const { mirrors } = require("../../config.json");

const { verifyMessage } = require("../utils/messageVerification");
const { sendWebhook } = require("../utils/messageSend");
const {
  addGuildName,
  removeInviteLinks,
  addReplyIfExists,
  removeEveryonePing,
  removeChannelMentions,
  removeRoles,
  removeUnknownUsers,
} = require("../utils/messageManipulation");
const messageMap = require("../cache/messageMap");
const { useChatGptToConvertMessage } = require("../utils/openai");

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

      await sendWebhook(message, data);
    } catch (error) {
      if (error.isOperational) return;
      console.log(error);
    }
  }
};
