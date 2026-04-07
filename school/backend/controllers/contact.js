exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json({
      status: "Y",
      message: contacts.length ? "Success" : "No data found",
      data: contacts || []
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      message: "Internal Server Error"
    });
  }
};