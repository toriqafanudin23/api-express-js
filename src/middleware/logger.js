export const logger = (req, res, next) => {
  console.log("Header", req.headers);
  console.log("Body before routes", req.body);
  next();
};
//# sourceMappingURL=logger.js.map
