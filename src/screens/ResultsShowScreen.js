import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation }) => {

  const [result, setResult] = useState(null)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  }

  return <>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        // contentContainerStyle={{ alignItems: 'center' }}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <>
            <Image source={{ url: item }} style={styles.image} />
          </>
        }}
      />
    </View>
  </>
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 5
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 10
  }
})

export default ResultsShowScreen