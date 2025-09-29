import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    // Hardcoded RSA private key
    const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEArvRAuv7bhCvfuPnWm2iZoxU0ih1CcNiMsY7Nfaqa09faBJOn
mE0zuOYTFYaqVLz0hmu3WzcjH9Anzn83CLJUXrXre509TXs4+BmUfZkdqaehnkS
iJ62r7cRETTJkwrkvSQbM1QaJnpwERyiHuXtay0JyHp+1PBf6YxN9RjikftngkE+
mfTcrruqdlr+am0dPo/vVnBQmAwfTjkdEaFGYu45FCc4XCkVVaZecoRufEGq79iz
Qsd8wvtKrWxnB7QxmgYbXL2ieH7AmRuAeqopJxRV2hx6oek5yowlmxiUQJxhzEs2
BIXKbTqerTRwqtvZ3qqLlE5bCgV69eNlvZMcAQIDAQABAoIBAAHRJlBn8tQ7lGqa
Yr3sz+gIJHAuxW3JU2qPNWNRudG83sqCSVaq9GkEATy8FfD2FQ6XPczTTfjlBuP3
uTTWQjJEKhEWpNB/f+AOWhvfQyEdyVWwvR5DwSrejttGEnAK9tRIaRPokrJohAfN
1DvApNYikhBwrrKHogR2pwYR/Resp36i7Pjy/A3vhIUo6tyrUkHMEa2znkkIWpLa
xBOeadRD4cqFpE/oceXDshJI6Xv4w4xdih5lMaTop0Ye/Zx0oxQPD7zzeXRXIqtq
RRuy92UVmLEA6FdykSOvdQc/tPLaFmS6shStm9YNe7tWiLgPHfWm3h0ugtT5vpOk
c7Yl5wUCgYEA792k+NyyzS9VWF5rsoFnll7SWXz83zUi8fvwH9S1cClWcbj/qMKI
2Gqe57SIzACstE9r75tYhTtR1POFWGBfMBbkeWOpDq5nOq04AS05GMljJDODKYLF
UVxf9OyIobMJOMmda9zWH90X+xvDXDbH2lKfT5x+L1cqO5zbd8PSoNsCgYEAurjd
hbE9CGplOd6iY5/ZTzK0uLWkaWE8ALlrRqz9wZdJY1yZR439PyFX4NCfxxQOUo5f
UMHZbYYurIToN8pawSxvSsbxRlgt++JNo7Hwmeda1uIS6ah1PI1Ex52zz0Lido9Q
T2ZXW8Ybm6JeoO7Spi+m7s+bX0iBfUMIyb6+b1MCgYEAsvtKTEAyUxTMtCHQbuRM
bVHX19qBvfQiXTpG1RmdQVI3JKiMbFqsTgBRDkgSA1dFh030FlhuVwwKZcJIb8eJ
f5K1bTbGQSQ19vyl24rpHeu3xJ2Dc4gWwD0ThOiykyXK7crTYlbol+IcMM1omvht
bCVWpsr5BU4fP1guE1HVax0CgYAX8C9mPmzGsW082BAVmZ6wip2kuJTVdcPNi/f2
3aLCuPSNqod0Jv36o/myNszlJusXJm2N2uxXIEbHk1p6HJU6AspZ2duA2zk5+69c
dymTcZexyNYH4rL1Cl9xAATXY4nJDWKMa2BzwZg0gcKD+1pCOAW8xBz1QERpnLh5
tNyRRQKBgQDmTXttDrCawl9HVh1HC1lUFFL7b6J16WdgT1c5dneHHMhzNXgDilZs
7C/billI7skkz5HZJi6FAaLtR8R+tXFLKjh2b666Sslsgb51OZOLAItP8SINO7qD
JojorW445RdToNhYaIG6h3S9SAwwwVnNnk3HeS9q1NkVJ7MUQ7XLVg==
-----END RSA PRIVATE KEY-----
`;

    // Hardcoded integration key and user GUID
    const INTEGRATION_KEY = "YOUR_INTEGRATION_KEY";
    const USER_GUID = "59d376b3-0a6b-4307-a9a7-83eb92e3fa59";

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      iss: INTEGRATION_KEY,
      sub: USER_GUID,
      aud: "account-d.docusign.com",
      iat: now,
      exp: now + 3600, // expires in 1 hour
      scope: "signature impersonation"
    };

    const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });

    res.status(200).json({ jwt: token });
  } catch (err) {
    console.error("JWT generation error:", err);
    res.status(500).json({ error: err.message });
  }
}
