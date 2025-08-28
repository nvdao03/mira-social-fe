import React, { createContext, useState } from 'react'
import {
  getAccessTokenFromLocalStorage,
  getAvatarFromLocalStorage,
  getIdFromLocalStorage,
  getNameFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getUsernameFromLocalStorage
} from '../utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  refreshToken: string
  avatar: string
  username: string
  name: string
  id: string
  setIsauthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
  setAvatar: React.Dispatch<React.SetStateAction<string>>
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setName: React.Dispatch<React.SetStateAction<string>>
  setId: React.Dispatch<React.SetStateAction<string>>
}

export const initalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  refreshToken: getRefreshTokenFromLocalStorage() as string,
  avatar: getAvatarFromLocalStorage() as string,
  username: getUsernameFromLocalStorage() as string,
  name: getNameFromLocalStorage() as string,
  id: getIdFromLocalStorage() as string,
  setIsauthenticated: () => null,
  setRefreshToken: () => null,
  setAvatar: () => null,
  setUsername: () => null,
  setName: () => null,
  setId: () => null
}

export const AppContext = createContext<AppContextType>(initalAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsauthenticated] = useState<boolean>(initalAppContext.isAuthenticated)
  const [refreshToken, setRefreshToken] = useState<string>(initalAppContext.refreshToken)
  const [avatar, setAvatar] = useState<string>(initalAppContext.avatar)
  const [username, setUsername] = useState<string>(initalAppContext.username)
  const [name, setName] = useState<string>(initalAppContext.name)
  const [id, setId] = useState<string>(initalAppContext.id)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        refreshToken,
        avatar,
        username,
        name,
        id,
        setIsauthenticated,
        setRefreshToken,
        setAvatar,
        setName,
        setUsername,
        setId
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
