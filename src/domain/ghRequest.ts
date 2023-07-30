type Params = {
  owner: string,
  repo: string
}

export const request = async ({owner, repo}: Params) => {
  const URL = `https://api.github.com/repos/${owner}/${repo}/issues`
  const result = await fetch(URL).then((res) => res.json())
  return result
}