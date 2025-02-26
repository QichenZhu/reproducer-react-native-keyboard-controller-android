import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';

function SlowLoadingComponent(): React.JSX.Element {
  const data: number[] = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 100; j++) {
      data.push(Math.random());
    }
  }
  return (
    <View style={{ height: 100, overflow: 'hidden' }}>
      {data.map((num, index) => (
        <Text key={index} style={{textAlign: 'center'}}>{num}</Text>
      ))}
    </View>
  );
}

function Screen1(props: any): React.JSX.Element {
  const textInputRef = useRef<TextInput | null>(null);
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <View style={{backgroundColor: 'grey', flex: 1}}>
        <TextInput ref={textInputRef} placeholder="Show keyboard" style={{ backgroundColor: 'lightgrey', width: '100%', height: 100, textAlign: 'center' }} />
        <TouchableOpacity
          onPress={() => {
            textInputRef.current?.blur();
            props.navigation.replace('Screen2');
          }}
          style={{ backgroundColor: 'teal', width: '100%' }}>
          <Text style={{ color: 'white', lineHeight: 100, textAlign: 'center' }}>Go to screen 2</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

function Screen2(props: any): React.JSX.Element {
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <View style={{backgroundColor: 'grey', flex: 1}}>
        <SlowLoadingComponent />
        <TouchableOpacity
          onPress={() => props.navigation.replace('Screen1')}
          style={{ backgroundColor: 'teal', width: '100%' }}>
          <Text style={{ color: 'white', lineHeight: 100, textAlign: 'center' }}>Go to screen 1</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardProvider>
  );
}

export default App;
