module.exports.config = {
  name: "goiadmin",
  version: "1.0.1",
  permission: 0,
  credits: "Joy Ahmed",
  description: "Don't mention admin without reason",
  prefix: true,
  category: "user",
  usages: "tag",
  cooldowns: 5,
};

const adminUIDs = [ 
  "100053532276127", 
  "100053532276127", 
];

module.exports.handleEvent = function({ api, event }) {
  const mentionIDs = Object.keys(event.mentions || {});
  const isMentioningAdmin = mentionIDs.some(id => adminUIDs.includes(id));
  
  if (!isMentioningAdmin || adminUIDs.includes(event.senderID)) return;

  const msgList = [
    "╭╼|━━━━━━━━━━━━━━|╾╮\n⛔ 𝙈𝙖𝙣𝙩𝙞𝙤𝙣 𝙙𝙞𝙨𝙤 𝙠𝙚𝙣 pagol naki 😡\n╰╼|━━━━━━━━━━━━━━|╾╯",
    "╭╼|━━━━━━━━━━━━━━|╾╮\n🥀 MaHi বস এখন বিজি! পরে কথা বলো।\n╰╼|━━━━━━━━━━━━━━|╾╯",
    "╭╼|━━━━━━━━━━━━━━|╾╮\n😾 এত মেনশন না দিয়ে ইনবক্সে গিয়ে চুম্মা চাটি করো! 💌\n╰╼|━━━━━━━━━━━━━━|╾╯",
    "╭╼|━━━━━━━━━━━━━━|╾╮\n🤐 মেনশন কইরা লাভ নাই, প্রেম পাইবা না 🙃\n╰╼|━━━━━━━━━━━━━━|╾╯",
    "╭╼|━━━━━━━━━━━━━━|╾╮\n💔 Mahi এখন ভাঙা হৃদয়ে গান শুনতেছে, disturb কইরো না 😭\n╰╼|━━━━━━━━━━━━━━|╾╯",
    "╭╼|━━━━━━━━━━━━━━|╾╮\n💋 মেনশন দিলে চুম্মা দিতে হবে  virtual! 😽\n╰╼|━━━━━━━━━━━━━━|╾╯",
  ];

  const randomMsg = msgList[Math.floor(Math.random() * msgList.length)];
  return api.sendMessage(randomMsg, event.threadID, event.messageID);
};

module.exports.run = function() {};
