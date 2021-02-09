import {
  apiMockList
} from './mock'

export default ({
  query
}) => {
  return apiMockList(query).then(res => {
    return {
      data: res
    }
  })
}
