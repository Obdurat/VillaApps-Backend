import { removePublished } from "../utils/removePublished"
import { RequestResource } from "../utils/fetcher"
import CustomError from "../presentation/errors/custom.error"
import { removeDeleted } from "../utils/removeDeleted"
import Scheduler from "../utils/scheduler"

type Params = {
  owner: string,
  repo: string
}

export const request = async ({owner, repo}: Params) => {
  const ghURL = `https://api.github.com/repos/${owner}/${repo}/issues?per_page=100`
  const webhookURL = `https://webhook.site/token/59dd4e34-3883-4e4f-8eec-e3233fb8a54d/requests?query=content:${owner}\\/${repo}`
  const [gh, webhook] = await Promise.all([RequestResource(ghURL), RequestResource(webhookURL)])
  if (gh.length == undefined) { throw new CustomError(`Invalid GitHub Username: ${owner} or Repository name: ${repo}`, 404) }
  const result = removePublished(gh, webhook)
  if (Scheduler.removedIssues[`${owner}:${repo}`]) {
    return removeDeleted(result, Scheduler.removedIssues[`${owner}:${repo}`])
  }
  return result
}