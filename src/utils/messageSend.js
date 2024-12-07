const { WEBHOOK_URL } = require("./../../config.json");

const sendWebhook = async (message, data) => {
  const { content } = message;
  const { sourceId } = data;

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
