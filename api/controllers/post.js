import jwt from 'jsonwebtoken';
import { json } from 'express';
import { db } from '../db.js';

export const getPosts = (req, res) => {
  const que = req.query.cat ? 'SELECT * FROM posts WHERE cat = ?' : 'SELECT * FROM posts';

  db.query(que, [req.query.cat], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const que =
    'SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';

  db.query(que, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated to perform!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token found!');

    const que = 'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)';

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, userInfo.id];
    db.query(que, [values], (err, data) => {
      if (err) res.status(500).json(err);
      return res.json('Post has been created');
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated to perform!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token found !');

    const postId = req.params.id;
    const que = 'DELETE FROM posts WHERE id = ? AND uid = ?';

    db.query(que, [postId, userInfo.id], (err, data) => {
      if (err) res.status(403).json('Unable to delete post!');

      return res.json('Post deleted!');
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated to perform!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token found!');

    const postId = req.params.id;

    const que = 'UPDATE posts SET `title`=?, `desc`=?, `img`=?, `title`=? WHERE `id` = ? AND `uid` = ? ';

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, userInfo.id];
    db.query(que, [...values, postId, userInfo.id], (err, data) => {
      if (err) res.status(500).json(err);
      return res.json('Post has been updated');
    });
  });
};
