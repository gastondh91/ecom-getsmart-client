import { gql } from '../utils/tagged-template-noop'

export const LIST_CATEGORIES_QUERY = gql`
  query {
    categories {
      name
      id: _id
    }
  }
`
