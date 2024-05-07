export const signup = (req, res) => {
  const { name, email, token } = req.user;

  res.status(201).json({
    token,
    user: {
      name,
      email,
    },
  });
};

export const login = (req, res) => {
  const { name, email, token } = req.user;

  res.json({
    token,
    user: {
      name,
      email,
    },
  });
};

export const logout = (req, res) => {
  res.sendStatus(204);
};

export const current = (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

export const verifyByEmailController = (req, res) => {
  res.json({ message: "Verification successful" });
};

export const resendVerifyController = (req, res) => {
  res.json({ message: "Verification email sent" });
};

export const updateAvatarController = (req, res) => {
  const { avatar } = req.user;

  res.json({ avatar });
};
