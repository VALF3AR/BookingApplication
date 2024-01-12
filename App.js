import{ useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Alert,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();


const availableTimeSlots = [
  { id: 1, time: '10:00 AM', date: '2024-01-12', available: true },
  { id: 2, time: '10:30 AM', date: '2024-01-12', available: true },
  { id: 3, time: '11:00 AM', date: '2024-01-12', available: true },
  { id: 4, time: '11:30 AM', date: '2024-01-12', available: true },
  { id: 5, time: '12:00 PM', date: '2024-01-12', available: true },
  { id: 6, time: '12:30 PM', date: '2024-01-12', available: true },
  
];

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.heading}>Available Time Slots</Text>
      <FlatList
        data={availableTimeSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              margin: 5,
              borderWidth: 1,
              borderColor: item.available ? 'green' : 'red',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('Booking', { timeSlot: item })}
            disabled={!item.available}
          >
            <Text>{`${item.time} - ${item.date}`}</Text>
            <Text>{item.available ? 'Available' : 'Booked'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const BookingScreen = ({ route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(route.params.timeSlot);

  const handleBooking = () => {
    if (name && email) {
      const updatedTimeSlots = availableTimeSlots.map((slot) =>
        slot.id === selectedTimeSlot.id ? { ...slot, available: false } : slot
      );
      Alert.alert('Booking Successful', 'Your appointment has been booked successfully!');

      

      
    } else {
      Alert.alert('Validation Error', 'Please fill in all the fields.');
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 20 }}>Booking Form</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <Button title="Submit Booking" onPress={handleBooking} />
    </View>
  );
};

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles=StyleSheet.create({
  
})