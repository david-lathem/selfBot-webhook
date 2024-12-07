const { WEBHOOK_URL } = require("./../../config.json");

const sendWebhook = async (message, data) => {
  const {
    content,
    author: { id, username },
    author,
    attachments,
    embeds,
  } = message;
  const { webhook, custom_names, use_user_profile, sourceId } = data;

  //   const reply = {
  //     content: content || null,
  //     files: [...attachments.values()],
  //     // username: webhook.useCustomProfile ? webhook.name : author.username,
  //     // avatarURL: webhook.useCustomProfile
  //     // 	? webhook.avatarUrl
  //     // 	: author.displayAvatarURL(),
  //     embeds: embeds,
  //   };

  //   if (custom_names && custom_names[id]) reply.username = custom_names[id];

  //   if (use_user_profile) {
  //     reply.username = username;
  //     reply.avatarURL = author.displayAvatarURL();
  //   }

  //   return await webhook.send(reply);

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `Source ${sourceId} - ${content}`,
  });

  if (!res.ok) {
    console.log(await res.text());
    throw new Error(res.status, ": ", res.statusText);
  }
};

module.exports = { sendWebhook };
