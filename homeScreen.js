import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, Modal, TouchableOpacity, Alert, Platform, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import { globalStyles } from './styles.js';

// Open the database; the name is a string, not an object.
const db = SQLite.openDatabase('studyBuddy.db');

export default function HomeScreen() {
  const [test, setTest] = useState([]);
  const [naziv, setNaziv] = useState('');
  const [datum, setDatum] = useState(new Date());
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getGreeting = (hours) => {
    if (hours < 12) return 'Dobro jutro';
    if (hours < 18) return 'Dobar dan';
    return 'Dobro večer';
  };

  // Hook for updating the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0'); // Format hours to 2 digits
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Format minutes to 2 digits
      setCurrentTime(`${hours}:${minutes}`); // Set time in HH:MM format
      setGreeting(getGreeting(now.getHours()));
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Hook for database transactions
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Test (TestID INTEGER PRIMARY KEY AUTOINCREMENT, naziv varchar(35) NOT NULL, datum DATE NOT NULL);",
        [],
        () => fetchTests(),
        (tx, error) => console.error("Error creating table: ", error)
      );
    });
  }, []); // The empty dependency array ensures this effect runs once on component mount

  const fetchTests = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT TestID, naziv, datum FROM Test;",
        [],
        (_, { rows: { _array } }) => {
          const formattedData = _array.map(item => {
            // Ensure that item.datum exists before calling substring and split
            const dateParts = item.datum ? item.datum.split("-") : ['Unknown', 'Date'];
            const formattedDate = dateParts[2] && dateParts[1] ? `${dateParts[2]}.${dateParts[1]}` : 'Unknown Date';
            return { ...item, datum: formattedDate };
          });

          // Process the formattedData as needed
          setTest(formattedData);
        },
        (tx, error) => {
          console.error("Error fetching tests: ", error);
        }
      );
    });
  };

  const handleAddTest = () => {
    console.log(`Adding test: ${naziv}, ${datum.toISOString().split('T')[0]}`);
    const defaultreminder = "false"
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Test (naziv, datum) VALUES (?, ?);",
        [naziv, datum.toISOString().split('T')[0], defaultreminder],
        () => {
          setNaziv('');
          setDatum(new Date());
          setModalVisible(false);
          fetchTests();
        },
        (tx, error) => console.error("Error adding test: ", error)
      );
    });
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleRemoveTest = (testID) => {
    Alert.alert(
      "Brisanje testa",
      "Da li ste sigurni da želite obrisati test?",
      [
        { text: "Ne", style: "Ne" },
        { text: "Da", onPress: () => deleteTest(testID) }
      ]
    );
  };

  const deleteTest = (testID) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Test WHERE TestID = ?;",
        [testID],
        () => {
          console.log(`Test with ID ${testID} removed`);
          fetchTests();
        },
        (tx, error) => console.error("Error removing test: ", error)
      );
    });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || datum;
    setShowDatePicker(Platform.OS === 'ios');
    setDatum(currentDate);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[globalStyles.marginTop, globalStyles.GreetingMessage]}>{greeting}</Text>
      <View style={globalStyles.clockView}>
        <Text style={globalStyles.clockText}>{currentTime}</Text>
      </View>

      <View style={globalStyles.TestContainer}>
        <ScrollView>
          <View style={globalStyles.NadolazeciView}>
            <Text style={globalStyles.NadolazeciText}>Nadolazeći testovi:</Text>
          </View>
          {test.map((item) => (
            <TouchableOpacity key={item.TestID.toString()} onPress={() => handleRemoveTest(item.TestID)} style={globalStyles.TestRow}>
              <Text style={globalStyles.TestNaziv}>{item.naziv}</Text>
              <Text style={globalStyles.TestDatum}>{item.datum}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={globalStyles.AddRemoveTest}>
          <Icon name="add-circle-outline" size={30} color="#FFFF" onPress={() => {
              setModalVisible(true);
              setShowDatePicker(Platform.OS === 'ios');
          }} />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={globalStyles.modalOverlay}>
          <View style={globalStyles.modalContent}>
            <TextInput
              placeholder="Naziv testa"
              style={globalStyles.input}
              onChangeText={text => setNaziv(text)}
              value={naziv}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={datum}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            {!showDatePicker && (
              <Button title="Odaberi datum" onPress={() => setShowDatePicker(true)} />
            )}
            <Button title="Dodaj test" onPress={handleAddTest} />
            <Button title="Otkaži" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
