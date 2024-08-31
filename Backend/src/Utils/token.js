import jwt from 'jsonwebtoken';

const SECRET_CODE = '3f8d92b6a4$#2c2e1f'; // Replace with your actual secret code

function issueJWT(user) {
  const { uid, username, role } = user;
  const expirationDuration = 60 * 24 * 60 * 60 * 1000; // 60 days
  const expirationTime = Date.now() + expirationDuration;
  
  const payload = {
    sub: uid,
    name: username,
    role: role,
    iat: Date.now(),
    exp: expirationTime,
  };
  
  const signedToken = jwt.sign(payload, SECRET_CODE, { algorithm: 'HS256' });
  
  return {
    token: 'Bearer ' + signedToken,
    expires: expirationTime,
  };
}

export { issueJWT };
