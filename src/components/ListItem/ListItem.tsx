import { FC, memo } from "react"
import {Link} from 'react-router-dom'
import { IListITemProps } from "../types"
import './ListItem.scss'

const ListItem: FC<IListITemProps> = ({item: { id, avatar_url, name, public_repos, html_url, login }}) => {
  return (
    <li className="listItem">
      <Link to={`/users/${login}`}>
        <img alt={`avatar-${id}`} src={avatar_url}/>
        <p className="listItemName">{name}</p>
      </Link>
      <a rel="noreferrer" href={html_url} target="_blank">
        Repo: {public_repos}
      </a>
  </li>
  )
}

export default memo(ListItem)