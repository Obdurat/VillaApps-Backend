import { RequestHandler } from "express";
import { request } from "../data/ghRequest";
import Scheduler from "../utils/scheduler";
require('express-async-errors');

export const getIssues: RequestHandler = async (req, res) => {
  const {owner, repo} = req.params
  const result = await request({owner, repo})
  return res.status(200).json(result)
}

export const dispatchIssues: RequestHandler = async (req, res) => {
  const {owner, repo} = req.params
  Scheduler.setSchedules(`${owner}:${repo}`, req.body)
  return res.status(201).json({message: "Schedules created successfully"})
}

export const removeIssues: RequestHandler = async (req, res) => {
  const {owner, repo, issue_id} = req.params
  Scheduler.removeIssue(`${owner}:${repo}`, issue_id)
  return res.status(204).send()
}
