const CustomizedCake = require("../models/customizedcakeModel");

const saveCustomizedCake = async (req, res) => {
  const {
    userId,
    fullName,
    email,
    phone,
    date,
    cakeShape,
    spongeFlavor,
    filling,
    eggFree,
    file,
    message,
    promotionalOffers,
  } = req.body;

  console.log(userId);
  
  // Validate user is logged in
  if (!userId) {
    return res
      .status(401)
      .json({ error: "User must be logged in to customize a cake." });
  }

  // Validate required fields
  if (
    !fullName ||
    !email ||
    !phone ||
    !date ||
    !cakeShape ||
    !spongeFlavor ||
    !filling ||
    eggFree === undefined ||
    promotionalOffers === undefined
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled." });
  }

  try {
    const cake = new CustomizedCake({
      userId,
      fullName,
      email,
      phone,
      date,
      cakeShape,
      spongeFlavor,
      filling,
      eggFree,
      file,
      message,
      promotionalOffers,
    });
    await cake.save();
    res
      .status(201)
      .json({
        message:
          "Your cake customization has been submitted. Our customer representative will contact you within 24 hours.",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
};

module.exports = { saveCustomizedCake }
