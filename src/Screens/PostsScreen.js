// import { useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'

export const PostsScreen = () => {
  // const { params } = useRoute()

  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
