import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

// Replace RSA key with a secret code
const SECRET_CODE = '3f8d92b6a4$#2c2e1f'; // Replace with your actual secret code

export const validPassword = (password, hash, salt) => {
  if (!password || !hash || !salt) {
    return false;
  }

  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

export const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return { salt, hash };
};

export const getTokenDetails = (req) => {
  return new Promise((resolve, reject) => {
    let authToken = req.headers.authorization && req.headers.authorization.match(/^Bearer (.*)$/);
    authToken = authToken && authToken[1] ? authToken[1] : authToken;
    if (!authToken) {
      reject('Token not found in session');
    } else {
      jwt.verify(authToken, SECRET_CODE, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
          reject('Failed to decode token');
        } else {
          const { sub, name, role } = decoded;
          resolve({
            token: authToken,
            userId: sub,
            username: name,
            role: role,
          });
        }
      });
    }
  });
};

export const getCurrentUser = (req) => {
  return new Promise((resolve, reject) => {
    getTokenDetails(req)
      .then((details) => resolve({ username: details.username, userId: details.userId, roles: details.role }))
      .catch((err) =>
        reject({ type: 'invalid_auth_token', msg: err && err.message ? err.message : 'Invalid Access Token!' })
      );
  });
};
