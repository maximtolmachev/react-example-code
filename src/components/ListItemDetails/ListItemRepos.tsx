import { FC, memo } from "react"
import { IListItemRepos } from "../types"

const ListITemRepos: FC<IListItemRepos> = ({item: { id, url, name, forks_count, stargazers_count }, loginParam}) => {
  return (
    <li className="listItem itemDetails-listItem" key={id}>
      <a rel="noreferrer" href={`https://github.com/${loginParam}/${name}`} target="_blank">{name}</a>
      <div className="itemDetails-statistics">
        <p>{forks_count} Forks</p>
        <p>{stargazers_count} Stars</p>
      </div>
    </li>
  )
}

export default memo(ListITemRepos)