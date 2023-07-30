import { RequestHandler } from "express";
import { request } from "../domain/ghRequest";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Handler: RequestHandler = async (req, res) => {
  const {owner, repo} = req.params
  const result = await request({owner, repo})
  return res.status(200).json(result)
}