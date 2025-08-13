module.exports.config = {
  name: "kicknotice",
  eventType: ["log:unsubscribe"],
  version: "2.1.0",
  credits: "Joy Ahmed",
  description: "Minimal kick notice with tag, UID, date, and profile link"
};

module.exports.run = async function ({ api, event }) {
  const { threadID, author, logMessageData } = event;

  const kickedID = logMessageData?.leftParticipantFbId;
  const kickerID = author;

  if (!kickedID || kickedID === kickerID) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const kickedUser = threadInfo.userInfo.find(u => u.id === kickedID);
    const kickerUser = threadInfo.userInfo.find(u => u.id === kickerID);

    const kickedName = kickedUser?.name || "Unknown";
    const kickerName = kickerUser?.name || "Unknown";

    const date = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const msg =
`╭╼|━━━━━━━━━━━━━━|╾╮
  বাল পাকনামির কারণে কিক খাইলো 😂💔
👣 ${kickedName} (${kickedID})
🔗 https://facebook.com/${kickedID}
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
𝐂𝐑𝐄𝐀𝐓𝐎𝐑:𝐒𝐔𝐌𝐎𝐍 𝐈𝐒𝐋𝐀𝐌
╰╼|━━━━━━━━━━━━━━|╾╯`;

    return api.sendMessage({
      body: msg,
      mentions: [{
        tag: `@${kickerName}`,
        id: kickerID
      }]
    }, threadID);
  } catch (err) {
    console.error("❌ KickNotice Error:", err);
  }
};
