import { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import { IRepositoryData, IListItemDetailsRepos, IRepoListItem } from "../types"
import { useParams} from 'react-router-dom'
import '../List/List.scss'
import './ListItemDetails.scss'
import apiCall from "../../services/apiCall"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import ListItemRepos from "./ListItemRepos"

const ListItemDetails: FC = () => {
  const emptyListItemDetails: IRepositoryData = {
    name: '',
    public_repos: 0,
    avatar_url: '',
    events_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    gravatar_id: '',
    html_url: '',
    id: 0,
    login: '',
    node_id: '',
    organizations_url: '',
    received_events_url: '',
    repos_url: '',
    site_admin: false,
    starred_url: '',
    subscriptions_url: '',
    type: '',
    url: '',
    email: '',
    location: '',
    company: '',
    blog: '',
    hireable: false,
    bio: '',
    twitter_username: '',
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: ''
  }
  const { loginParam } = useParams()
  const [user, setUser] = useState<IRepositoryData>(emptyListItemDetails)
  const [repos, setRepos] = useState<IListItemDetailsRepos[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [searchReposValue, setSearchReposValue] = useLocalStorage<string>("searchReposValue",'')

  const toggleVisible = () => {
    setIsVisible((prevState) => !prevState)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchReposValue(e.target.value)
  }

  useEffect(() => { 
    const getUser = async () => {
      try {
        const elem = await apiCall({ url: `users/${loginParam}`})
        const repositories = await apiCall({ url: `users/${loginParam}/repos?per_page=5`})
        setUser(elem)
        const updatedRepos = repositories.map((el: IListItemDetailsRepos) => ({ name: el.name,
        forks_count: el.forks_count,
        stargazers_count: el.stargazers_count,
        id: el.id,
        url: el.url
        }))
        setRepos(updatedRepos)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
     // eslint-disable-next-line
  }, [])

  const {avatar_url, login, email, location, id, created_at, followers, following, bio } = user

  const filterRepos = useMemo(
    () => repos.filter((el: IListItemDetailsRepos) => el.name.toLowerCase().includes(searchReposValue.toLowerCase())),
    [searchReposValue, repos])

  return (
    <div className="itemDetails">
      <div className="itemDetails-top">
        <img alt={`details-avatar-${id}`} src={avatar_url} className="itemDetails-avatar" />
        <ul className="itemDetails-info">
          <li>Username: {login}</li>
          <li>Email: {email}</li>
          <li>Location: {location}</li>
          <li>Join date: {created_at}</li>
          <li>{followers} Followers</li>
          <li>Following {following}</li>
        </ul>
      </div>
      <div className="itemDetails-bio">
        <button onClick={toggleVisible} className="itemDetails-accordion">
          <p>Bio:<span>(click to toggle visibility)</span></p></button>
        <div
          style={{ display: isVisible ? 'block' : 'none'}} className="itemDetails-panel">
          <p>{bio}</p>
        </div>
      </div>
      <div className="itemDetails-repos">
      <input
        className="searchInput"
        placeholder="Search for users"
        value={searchReposValue}
        onChange={handleOnChange}
      />
      <ul className="list itemDetails-listRepos">
        {filterRepos.map((item: IRepoListItem) => (
          <ListItemRepos key={item.id} loginParam={loginParam} item={item} />
        ))}
      </ul>
      </div>
    </div>
  )
}

export default ListItemDetails