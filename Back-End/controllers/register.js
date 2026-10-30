async function handleRegister(req, res, db, hash) {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json("Unable to register");
  }

  try {
    const user = await db.transaction(async (trx) => {
      const storedHash = await hash(password, { cost: 10 });

      const [loginUser] = await trx("login")
        .insert({
          email: email.trim(),
          hash: storedHash,
        })
        .returning("email");

      const [createdUser] = await trx("users")
        .insert({
          email: loginUser.email,
          name: name.trim(),
          joined: new Date(),
        })
        .returning(["id", "name", "email", "entries", "joined"]);

      return createdUser;
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json("Unable to register");
  }
}

module.exports = {
  handleRegister,
};
