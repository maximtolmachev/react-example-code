import { FC, useEffect, ChangeEvent, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import apiCall from "../../services/apiCall";
import ListItem from "../ListItem";
import { IFullListItem, IListITem, IRepositoryData } from "../types";
import './List.scss'

const List: FC = () => {
  const [users, setUsers] = useLocalStorage<IFullListItem[]>("users", [])
  const [searchUsersValue, setSearchUsersValue] = useLocalStorage<string>("searchUsersValue",'')
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUsersValue(e.target.value)
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await apiCall({url: 'users?per_page=5&since=199'})
        const logins = data.map((el: IListITem) => el.login)
        const repoData: IRepositoryData[] = []
        for (const login of logins) {
          const elem = await apiCall({ url: `users/${login}`})
          repoData.push(elem)
        }
        const updatedRepoData = await data.map((el: IListITem) => {
          const repoDataElem = repoData.find(repoElem => el.id === repoElem.id)
          return {
            ...el,
            public_repos: repoDataElem?.public_repos ?? 0,
            name: repoDataElem?.name ?? '',
          }
        })
        setUsers((updatedRepoData))
      } catch(error) {
        console.log(error)
      }
    }
    getUsers()
  }, [setUsers])

  const filteredUsers = useMemo(
    () => users.filter((el: IFullListItem) => el.name.toLowerCase().includes(searchUsersValue.toLowerCase())),
  [users, searchUsersValue]) 

  return (
    <div className="listWrapper">
      <input
        className="searchInput"
        placeholder="Search for users"
        value={searchUsersValue}
        onChange={handleOnChange}
      />
      <ul className="list">
        {filteredUsers.map((item: IFullListItem) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}
export default List