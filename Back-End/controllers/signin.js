async function handleSignin(req, res, db, verify) {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json("Unable to sign in");
  }

  try {
    const [loginUser] = await db("login")
      .select("email", "hash")
      .where({ email: email.trim() });

    if (!loginUser) {
      return res.status(400).json("Wrong credentials");
    }

    const isValid = await verify(password, loginUser.hash);

    if (!isValid) {
      return res.status(400).json("Wrong credentials");
    }

    const [user] = await db("users")
      .select("id", "name", "email", "entries", "joined")
      .where({ email: email.trim() });

    if (!user) {
      return res.status(400).json("Unable to sign in");
    }

    res.json(user);
  } catch (err) {
    res.status(400).json("Unable to sign in");
  }
}

module.exports = {
  handleSignin,
};
