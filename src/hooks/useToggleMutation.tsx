import { QueryClient, useMutation } from '@tanstack/react-query'

/**
 * Custom hook cho toggle mutation
 * @param actionFn hàm gọi API khi active = true
 * @param revertFn hàm gọi API khi active = false
 * @param queryClient client react-query xử lý để call lại API
 **/
function useToggleMutation(
  actionFn: (body: { post_id: string }) => Promise<any>,
  revertFn: (post_id: string) => Promise<any>,
  queryClient: QueryClient
) {
  const actionMutation = useMutation({
    mutationFn: actionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['postsUser'] })
      queryClient.invalidateQueries({ queryKey: ['postsUserLike'] })
    }
  })
  const revertMutation = useMutation({
    mutationFn: revertFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['postsUser'] })
      queryClient.invalidateQueries({ queryKey: ['postsUserLike'] })
    }
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
