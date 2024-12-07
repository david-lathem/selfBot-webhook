const { TOKEN } = require("./../config.json");

const MirrorClient = require("./classes/client");

const client = new MirrorClient({});

client.login(TOKEN);
