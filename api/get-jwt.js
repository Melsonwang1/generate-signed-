import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    const PRIVATE_KEY = process.env.DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, "\n");
    const INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
    const USER_GUID = process.env.DOCUSIGN_USER_GUID;

    if (!PRIVATE_KEY || !INTEGRATION_KEY || !USER_GUID) {
      throw new Error("Missing environment variables");
    }

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
