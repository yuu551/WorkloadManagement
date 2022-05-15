import { useQuery } from 'react-query'
import axios from 'axios'
import { Category } from '../types/Category'
import { getCategories } from '../firebase/getFirestore'

export const useQueryCategories = () => {
  const getCategoriesQuery = async () => {
    return await getCategories();
  }

  return useQuery<Category[], Error>({
    queryKey: 'categories',
    queryFn: getCategoriesQuery,
    staleTime: Infinity,
  })
}
