import fs from "fs";
import jwt from "jsonwebtoken";

// Environment variables (set these in Vercel dashboard)
const PRIVATE_KEY = process.env.DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, "\n");
const INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
const USER_GUID = process.env.DOCUSIGN_USER_GUID;

export default function handler(req, res) {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: INTEGRATION_KEY,
    sub: USER_GUID,
    aud: "account-d.docusign.com", // use account.docusign.com for production
    iat: now,
    exp: now + 3600,
    scope: "signature impersonation"
  };

  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });

  res.status(200).json({ jwt: token });
}
