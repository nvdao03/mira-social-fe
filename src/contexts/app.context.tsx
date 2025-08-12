import React, { createContext, useState } from 'react'
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '../utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  refreshToken: string
  setIsauthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
}

export const initalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  refreshToken: getRefreshTokenFromLocalStorage() as string,
  setIsauthenticated: () => null,
  setRefreshToken: () => null
}

export const AppContext = createContext<AppContextType>(initalAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsauthenticated] = useState<boolean>(initalAppContext.isAuthenticated)
  const [refreshToken, setRefreshToken] = useState<string>(initalAppContext.refreshToken)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        refreshToken,
        setIsauthenticated,
        setRefreshToken
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
