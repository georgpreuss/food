import React, { useState } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import useResults from '../hooks/useResults'
import ResultsList from '../components/ResultsList'

const SearchScreen = () => {

  const [searchString, setSearchString] = useState('')
  const [searchApi, results, error] = useResults()

  const filterResultsByPrice = (price) => {
    // price === '£' || '££' || '£££'
    return results.filter(result => {
      return result.price === price
    })
  }

  return <>
    <SearchBar
      search={searchString}
      onSearchChange={setSearchString}
      onSearchSubmit={() => searchApi(searchString)}
    />
    {error ? <Text>{error}</Text> : null}
    <ScrollView>
      <ResultsList results={filterResultsByPrice('£')} title='On a Budget' />
      <ResultsList results={filterResultsByPrice('££')} title='Good Value' />
      <ResultsList results={filterResultsByPrice('£££')} title='A Bit Pricey' />
      <ResultsList results={filterResultsByPrice('££££')} title='Big Spender' />
    </ScrollView>
  </>
}

const styles = StyleSheet.create({})

export default SearchScreen