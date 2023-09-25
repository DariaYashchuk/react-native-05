import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { LoginScreen } from './src/Screens/LoginScreen.js'
import { RegistrationScreen } from './src/Screens/RegistrationScreen.js'
import { PostsScreen } from './src/Screens/PostsScreen.js'
import { HomeScreen } from './src/Screens/HomeScreen.js'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

const MainStack = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          {/* <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          /> */}
          <MainStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
