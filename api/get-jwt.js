import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    const privateKeyPath = path.join(process.cwd(), "private-key.pem");
    const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf8");

    const INTEGRATION_KEY = "f6436269-ccb8-4a66-ad87-1e01a5a3919d";
    const USER_GUID = "59d376b3-0a6b-4307-a9a7-83eb92e3fa59";

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: INTEGRATION_KEY,
      sub: USER_GUID,
      aud: "account-d.docusign.com",
      iat: now,
      exp: now + 3600,
      scope: "signature impersonation"
    };

    const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });

    res.status(200).json({ jwt: token });
  } catch (err) {
    console.error("JWT generation error:", err);
    res.status(500).json({ error: err.message });
  }
}
