import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ListItem from '@/components/UI/Collection_component/ListItem'

const All = () => {
  return (
    <View style={styles.container}>
      <FlatList
      data={Array(15)}
      contentContainerStyle={{
        paddingHorizontal: 20
      }}
      renderItem={({item}) =>{
        return(
            <ListItem />
        )
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})

export default All