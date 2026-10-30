async function handleImage(req, res, db) {
  const { id } = req.body;

  try {
    const [user] = await db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries");

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json(user.entries);
  } catch (err) {
    res.status(400).json("Unable to update entries");
  }
}

module.exports = {
  handleImage,
};
