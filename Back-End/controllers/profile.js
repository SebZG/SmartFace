async function handleProfile(req, res, db) {
  const { id } = req.params;

  try {
    const [user] = await db("users")
      .select("id", "name", "email", "entries", "joined")
      .where({ id });

    if (!user) {
      return res.status(404).json("Not found");
    }

    return res.json(user);
  } catch (err) {
    return res.status(400).json("Error getting user");
  }
}

module.exports = {
  handleProfile,
};
