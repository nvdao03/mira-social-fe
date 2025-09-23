import React, { createContext, useState } from 'react'
import { getAccessToken, getAvatar, getId, getName, getRefreshToken, getUsername } from '../utils/auth'

// --- AppContext Type ---
interface AppContextType {
  id: string
  isAuthenticated: boolean
  refreshToken: string
  avatar: string
  username: string
  name: string

  setIsauthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
  setAvatar: React.Dispatch<React.SetStateAction<string>>
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setName: React.Dispatch<React.SetStateAction<string>>
  setId: React.Dispatch<React.SetStateAction<string>>
  resetAppContext: () => void
}

// --- Inital Value ---
const initialValues = {
  id: getId() as string,
  isAuthenticated: Boolean(getAccessToken()),
  refreshToken: getRefreshToken() as string,
  avatar: getAvatar() as string,
  username: getUsername() as string,
  name: getName() as string
}

// --- Inital Context ---
export const initalAppContext: AppContextType = {
  ...initialValues,

  setIsauthenticated: () => null,
  setRefreshToken: () => null,
  setAvatar: () => null,
  setUsername: () => null,
  setName: () => null,
  setId: () => null,
  resetAppContext: () => null
}

export const AppContext = createContext<AppContextType>(initalAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsauthenticated] = useState<boolean>(initalAppContext.isAuthenticated)
  const [refreshToken, setRefreshToken] = useState<string>(initalAppContext.refreshToken)
  const [avatar, setAvatar] = useState<string>(initalAppContext.avatar)
  const [username, setUsername] = useState<string>(initalAppContext.username)
  const [name, setName] = useState<string>(initalAppContext.name)
  const [id, setId] = useState<string>(initalAppContext.id)

  const resetAppContext = () => {
    setIsauthenticated(false)
    setRefreshToken('')
    setAvatar('')
    setUsername('')
    setName('')
    setId('')
  }

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
        setId,
        resetAppContext
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
