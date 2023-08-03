type ghUser = {
  avatar_url: string,
  login: string,
}

type Params = {
  id: string,
  url: string,
  title: string,
  user: ghUser,
  state: string,
  scheduled_to?: Date
}

export default class Issue {
  id: string
  url: string
  title: string
  user: ghUser
  state: string
  scheduled_to?: Date

  constructor({ id, url, title, user: { avatar_url, login }, state, scheduled_to}: Params) {
    this.id = id;
    this.url = url
    this.title = title
    this.user = { avatar_url, login }
    this.state = state
    if (scheduled_to) this.scheduled_to = scheduled_to
  }
}