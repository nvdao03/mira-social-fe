import { useSearchParams } from 'react-router-dom'

function useQueryParam() {
  const [searchParam] = useSearchParams()
  const resultParam = Object.fromEntries(searchParam.entries())
  return resultParam
}

export default useQueryParam
