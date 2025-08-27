import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook cho toggle mutation
 * @param actionFn hàm gọi API khi active = true
 * @param revertFn hàm gọi API khi active = false
 **/
function useToggleMutation(
  actionFn: (body: { post_id: string }) => Promise<any>,
  revertFn: (post_id: string) => Promise<any>
) {
  const actionMutation = useMutation({
    mutationFn: actionFn
  })
  const revertMutation = useMutation({
    mutationFn: revertFn
  })

  const toggle = (body: { post_id: string }, isActive: boolean) => {
    if (isActive) {
      revertMutation.mutate(body.post_id)
    } else {
      actionMutation.mutate(body)
    }
  }

  return { toggle }
}

export default useToggleMutation
