import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const register = (req, res) => {
  // check if user already exists
  const que = 'SELECT * FROM users where email = ? OR username = ?';

  db.query(que, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exist!');

    // hash and store password to create user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = 'INSERT INTO users(`username`, `email`, `password`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};

export const login = (req, res) => {
  // check user

  const q = 'SELECT * FROM users where username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) res.json(err);
    if (data.length === 0) return res.status(404).json('User not found');

    // check password
    const passwordCompare = bcrypt.compareSync(req.body.password, data[0].password);

    if (!passwordCompare) return res.status(400).json('Wrong username or password!');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey');
    const { password, ...other } = data[0];

    // cannot access cookie (token) directly
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out');
};
