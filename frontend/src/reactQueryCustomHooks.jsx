import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';

export function useFetchTasks() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });

  return { data, isError, isLoading };
}

export function useEditTask() {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ isDone, taskId }) => {
      customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { editTask };
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: deleteLoading } = useMutation({
    mutationFn: (taskId) => {
      customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task deleted');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { deleteTask, deleteLoading };
}

export function useAddTask() {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post('/', {
        title: taskTitle,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { isLoading, createTask };
}
