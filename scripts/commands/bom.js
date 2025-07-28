const axios = require("axios");

module.exports.config = {
  name: "bom",
  version: "1.9",
  permission: 2,
  credits: "Joy",
  prefix: true,
  description: "BOM attack using 2 GitHub JSON sources (crash-proof)",
  usages: "[count]",
  category: "fun",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  const adminURL = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/admins.json";
  const url1 = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/bom.json";
  const url2 = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/bom2.json";

  try {
    // ✅ Admin check
    let adminRes;
    try {
      adminRes = await axios.get(adminURL);
    } catch (err) {
      console.error("Admin fetch error:", err);
      return api.sendMessage("❌ Admin তালিকা আনতে সমস্যা হয়েছে!", threadID, messageID);
    }

    const adminList = adminRes.data.admins;
    if (!Array.isArray(adminList) || !adminList.includes(senderID)) {
      return api.sendMessage("❌ অনুমোদন নেই! GitHub admins.json-এ UID খুঁজে পাওয়া যায়নি।", threadID, messageID);
    }

    // ✅ BOM message fetch
    let res1, res2;
    try {
      [res1, res2] = await Promise.all([axios.get(url1), axios.get(url2)]);
    } catch (err) {
      console.error("BOM JSON fetch error:", err);
      return api.sendMessage("❌ BOM বার্তা আনতে সমস্যা হয়েছে!", threadID, messageID);
    }

    const messages1 = Array.isArray(res1.data.message) ? res1.data.message : [res1.data.message || "💣 বোম ফাটলো!"];
    const messages2 = Array.isArray(res2.data.message) ? res2.data.message : [res2.data.message || "🔥 বোমা পড়লো!"];

    const count = Math.min(Math.max(parseInt(args[0]) || 5, 1), 50);
    await api.sendMessage(`🧨 ${count} রাউন্ড বোমাবর্ষণ শুরু হচ্ছে...`, threadID, messageID);

    for (let i = 0; i < count; i++) {
      setTimeout(async () => {
        try {
          const msg1 = messages1[i % messages1.length];
          const msg2 = messages2[i % messages2.length];

          await api.sendMessage(`💣 ${msg1}`, threadID);
          setTimeout(async () => {
            try {
              await api.sendMessage(`🔥 ${msg2}`, threadID);
            } catch (err) {
              console.error("🔥 Second BOM send error:", err);
            }
          }, 1000);
        } catch (err) {
          console.error("💣 First BOM send error:", err);
        }
      }, i * 2500);
    }

  } catch (err) {
    console.error("General BOM error:", err);
    return api.sendMessage("❌ অপ্রত্যাশিত সমস্যা হয়েছে!", threadID, messageID);
  }
};
