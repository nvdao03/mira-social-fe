import { ToastContainer } from 'react-toastify'
import useRouterElements from './useRouterElements'

function App() {
  const routerElements = useRouterElements()

  return (
    <>
      {routerElements}
      <ToastContainer />
    </>
  )
}

export default App
