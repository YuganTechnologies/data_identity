import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function issueJWT(user) {
  const { uid, username, role } = user;
  const expirationDuration = 60 * 24 * 60 * 60 * 1000;
  const expirationTime = Date.now() + expirationDuration;
  const payload = {
    sub: uid,
    name: username,
    role: role,
    iat: Date.now(),
    exp: expirationTime,
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' });
  return {
    token: 'Bearer ' + signedToken,
  };
}


export { issueJWT };
