import { ErrorRequestHandler, Response } from "express";
import CustomError from "src/presentation/errors/custom.error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorHandler: ErrorRequestHandler = (err: CustomError, _req, res: Response, _next): Response => {
  return res.status(err.getStatus()).json({ message: err.message});
};