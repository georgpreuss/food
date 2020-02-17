import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const searchApi = async (searchTerm) => {
    console.log('oi!')
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'London'
        }
      })
      setResults(response.data.businesses)
    } catch (err) {
      setError('something went wrong')
    }
  }

  // Call searchApi when component is first rendered
  useEffect(() => {
    searchApi('')
  }, [])

  return [searchApi, results, error]
}