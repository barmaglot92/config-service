export const boomError = boomError => {
  const { statusCode, message, error } = boomError.output.payload;
  const err = new Error(message);
  err["status"] = statusCode;
  err["error"] = error;
  return err;
};

export const internalError = (ctx, err) => {
  err["addInfo"] = ctx.request.headers;
  return err;
};
