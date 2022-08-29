import { LIST_CATEGORIES_QUERY } from '../../utils/queries'
import axios from 'axios'
import { ICategory } from '../../utils/interfaces'
import { GRAPHQL_URL } from '../../utils/environments'

interface IResponse {
  data: IData
}

interface IData {
  data: { categories: ICategory[] }
  errors?: Error[]
}

export const getCategories = async (): Promise<ICategory[]> => {
  const { data: response }: IResponse = await axios({
    url: GRAPHQL_URL,
    method: 'POST',
    data: {
      query: LIST_CATEGORIES_QUERY
    }
  })

  if (response.errors) {
    throw response.errors[0]
  }

  return response.data.categories
}
