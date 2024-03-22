const logger = require("./loggers");
const Code = require("../model/code");

exports.generateCode = async (req, res) => {
  try {
    const newCode = await Code.create({
      value: generateCode(),
      expiration: new Date(Date.now() + 60000),
    });
    logger.info(`Code generated: ${newCode.value} at ${newCode.createdAt}`);
    res.json({ code: newCode.value });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.useCode = async (req, res) => {
  const enteredCode = req.body.code;

  try {
    const existingCode = await Code.findOne({ value: enteredCode });

    if (!existingCode) {
      res.status(400).json({ error: "Enter a valid code" });
    } else if (existingCode.used) {
      res.status(400).json({ error: "This code has already been used" });
    } else if (existingCode.expiration < new Date()) {
      logger.warn(
        `Code expired: ${existingCode.value} at ${existingCode.expiration}`
      );
      res.status(400).json({ error: "The code has expired" });
    } else {
      logger.info(`Code used successfully: ${existingCode.value}`);
      existingCode.used = true;
      await existingCode.save();
      res.json({ message: "Code is correct" });
    }
  } catch (error) {
    console.error("Error using code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 6;

  let result = "";

  // Generate 4 letters
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.random() * 52);
  }

  // Generate 2 numbers
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.random() * 10 + 52);
  }

  // Shuffle the characters randomly
  const shuffled = result.split("").sort(() => Math.random() - 0.5);
  return shuffled.join("");
}
