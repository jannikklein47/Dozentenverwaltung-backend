/**
 * Sends JSON data as a downloadable file
 */
exports.sendAsJSON = (res, filename, data) => {
  res.setHeader("Content-Type", "application/json");
  res.attachment(`${filename}.json`);
  res.send(JSON.stringify(data, null, 2));
};