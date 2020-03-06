
import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View } from "react-native";
import axios from 'axios';

axios.defaults.baseURL = 'http://airlock-example.test';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard Screen Logged In View</Text>
      <Text>User: {user.email}</Text>
      <Text>User from Server: {name}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Text>User: {user.email}</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}
