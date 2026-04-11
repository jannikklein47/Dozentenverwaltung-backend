const { Parser } = require("json2csv");

/**
 * Converts JSON data to CSV and sends it as a downloadable file
 */
exports.sendAsCSV = (res, filename, data, fields = null) => {
  try {
    const opts = fields ? { fields } : {};
    const parser = new Parser(opts);
    const csvString = parser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.attachment(`${filename}.csv`);
    res.send(csvString);
  } catch (error) {
    throw new Error(`CSV Parsing failed: ${error.message}`);
  }
};