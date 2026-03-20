const { rateLimit } = require("express-rate-limit");

// Custom IP key generator that handles both IPv4 and IPv6 addresses, to group IPv6 addresses
const generateSecureIpKey = (req) => {
  const ip = req.ip || "unknown";

  if (ip.includes(":")) {
    // IPv6-Adresse
    const parts = ip.split(":");
    if (parts.length >= 4) {
      // group the first 4 segments of the IPv6 address
      return parts.slice(0, 4).join(":");
    }
  }

  // IPv4
  return ip;
};

exports.globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minute)
  message: {
    message: "Zu viele Anfragen. Bitte versuchen Sie es in 1 Minute erneut.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { ip: false, keyGeneratorIpFallback: false },
  keyGenerator: generateSecureIpKey,
});

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each Username to 5 login requests per `window` (here, per 15 minutes)
  message: {
    message:
      "Zu viele Anmeldeversuche. Bitte versuchen Sie es in 15 Minuten erneut.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { ip: false },

  keyGenerator: (req, res) => {
    if (req.body && req.body.username) {
      return req.body.username; // Limit based on username if provided
    }
    return generateSecureIpKey(req); // Fallback to IP-based limiting if no username is available
  },
});

exports.refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP/Refreshtoken to 10 refresh token requests per `window` (here, per 15 minutes)
  message: {
    message: "Zu viele Anfragen. Bitte versuchen Sie es in 15 Minuten erneut.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { ip: false },

  keyGenerator: (req, res) => {
    if (req.body && req.body.refreshToken) {
      return req.body.refreshToken; // Limit based on refreshToken if available
    }
    return generateSecureIpKey(req); // Fallback to IP-based limiting if no username is available
  },
});

exports.generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute
  max: 30, // Limit each user / ip to 30 requests per `window` (here, 5 minute)
  message: {
    message:
      "Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minute erneut.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { ip: false },

  keyGenerator: (req, res) => {
    if (req.tokenData && req.tokenData.sub) {
      return req.tokenData.sub; // Limit based on user ID if available
    }
    return generateSecureIpKey(req); // Fallback to IP-based limiting if no username is available
  },
});
