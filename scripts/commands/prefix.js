const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "Joy",
  prefix: true,
  description: "guide",
  category: "system",
  premium: false,
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const { threadID, messageID, body } = event;

  const dataThread = await Threads.getData(threadID);
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  const arr = [
    "mpre",
    "mprefix",
    "prefix",
    "command mark",
    "What is the prefix of the bot?",
    "PREFIX"
  ];

  arr.forEach(async i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() || body === i || body === str) {
      const prefix = threadSetting.PREFIX || global.config.PREFIX;

      // Borders
      const borderTop = "🌟╭╼|━━━━━━━━━━━━━━|╾╮🌟";
      const borderBottom = "🌟╰╼|━━━━━━━━━━━━━━|╾╯🌟";

      const msg = `${borderTop}
✨ 𝗣𝗿𝗲𝗳𝗶𝘅: ${prefix}
${borderBottom}

${borderTop}
👑 𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: 𝗝𝗼𝘆 𝗔𝗵𝗺𝗲𝗱
📎 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://www.facebook.com/profile.php?id=100001435123762
${borderBottom}`;

      // Image download
      const imgPath = path.join(__dirname, "owner.jpg");
      const url = "https://graph.facebook.com/100001435123762/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";

      const response = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

      // Send message with image
      return api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(imgPath)
        },
        threadID,
        () => fs.unlinkSync(imgPath) // auto delete image after sending
      );
    }
  });
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("no prefix commands 😂😆", event.threadID);
};
