export const notFoundError = (req, res, next) => {
  res.status(404).send({ error: "Not found" });
};
