import { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  useEffect( () => {
    try {
      if ( localStorage.getItem( "todo" ) ) {
        let data = JSON.parse( localStorage.getItem( "todo" ) )
        setTodos( data )
        console.log( typeof data )
        console.table( data )
      }
    } catch ( error ) {
      console.log( error )
    }
  }, [] )

  const [work, setWork] = useState( "" )
  const [items, setItems] = useState()
  const [todos, setTodos] = useState( [] )
  const handleDelete = ( sno ) => {
    setTodos( ( prevTodos ) => {
      return prevTodos.filter( todo => todo.sno !== sno )
    } )
    localStorage.setItem( "todo", ( prevTodos ) => {
      return prevTodos.filter( todo => todo.sno !== sno )
    } )
  }
  const addTodos = () => {
    if ( !work ) {
      Alert.alert( "Please fill the field" )
    }
    else {
      setTodos( [...todos, { work: work, sno: todos.length + 1 }] )
      setWork( "" )
      localStorage.setItem( "todo", JSON.stringify( todos ) );
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <TailwindProvider>
        <Text className="mt-10 text-center text-4xl p-4 border-b border-dashed">ToDo List</Text>
        <View className="flex flex-row justify-evenly my-6">
          <View className="w-7/12">
            <TextInput value={work} onChangeText={( value ) => setWork( value )} className="h-8 w-[90vw] px-2 border-b border-dotted border-gray-500" placeholder='Enter Work' />
          </View>
          <TouchableOpacity onPress={() => { addTodos() }} className="flex w-2/12 justify-center items-center">
            <AntDesign name="pluscircleo" size={28} color="green" />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={( item ) => { item.sno }}
          data={todos}
          renderItem={( { item } ) => {
            return (
              <TouchableOpacity className="py-5 bg-cyan-50 my-3 mx-4 border-2 border-dashed border-cyan-700 rounded-lg flex flex-row justify-around" onPress={() => { handleDelete( item.sno ) }}>
                <Text className="capitalize text-2xl">{item.work}</Text>
                <MaterialIcons name="delete-forever" size={32} color="red" />
              </TouchableOpacity>
            )
          }}
        />
      </TailwindProvider>
    </TouchableWithoutFeedback>
  );
}
