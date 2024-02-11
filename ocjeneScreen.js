import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import { globalStyles } from './styles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('studyBuddy.db');

export default function OcjeneScreen() {
  const [subjects, setSubjects] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newGrade, setNewGrade] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Ocjena (OcjenaID INTEGER PRIMARY KEY AUTOINCREMENT, ocjena INTEGER NOT NULL, predmet VARCHAR(30) NOT NULL);",
        [],
        () => {
          console.log("Table created or already exists");
          fetchGrades();
        },
        (tx, error) => {
          console.error("Error creating table: ", error);
        }
      );
    });
  }, []);

  const handleAddGrade = () => {
    const parsedGrade = parseInt(newGrade, 10);
    if (!newSubject || isNaN(parsedGrade)) {
      Alert.alert('Invalid Input', 'Please enter a valid subject and grade.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Ocjena (ocjena, predmet) VALUES (?, ?)",
        [parsedGrade, newSubject],
        () => {
          setModalVisible(false);
          fetchGrades();
        },
        (tx, error) => {
          console.error("Error adding grade: ", error);
        }
      );
    });
  };

  const fetchGrades = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT OcjenaID, ocjena, predmet FROM Ocjena;", // Make sure the column names here match your table definition
        [],
        (_, { rows }) => {
          console.log('Fetched rows:', rows._array);
          const newSubjects = rows._array.reduce((acc, current) => {
            const { OcjenaID, ocjena, predmet } = current; // Use "predmet" here, matching the column name
            if (!acc[predmet]) { // Make sure this matches the destructured property above
              acc[predmet] = {
                grades: [],
                average: 0,
              };
            }
            acc[predmet].grades.push({ id: OcjenaID, value: ocjena });
            acc[predmet].average = acc[predmet].grades.reduce((sum, grade) => sum + grade.value, 0) / acc[predmet].grades.length;
            return acc;
          }, {});
          setSubjects(newSubjects);
        },
        (tx, error) => {
          console.error("Error fetching grades: ", error);
        }
      );
    });
  };
  
  
  const handleRemoveGrade = (subject, index) => {
    Alert.alert(
      "Brisanje ocjene",
      "Da li ste sigurni da želite obrisati ocjenu?",
      [
        {
          text: "Ne",
          style: "cancel"
        },
        { text: "Da", onPress: () => removeGrade(subject, index) }
      ]
    );
  };

  const removeGrade = (subject, index) => {
    const gradeID = subjects[subject].grades[index].id;
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Ocjena WHERE OcjenaID = ?;",
        [gradeID],
        () => {
          console.log(`Grade with ID ${gradeID} removed`);
          const updatedGrades = subjects[subject].grades.filter((_, gradeIndex) => gradeIndex !== index);
          const newSubjects = {...subjects};
          newSubjects[subject].grades = updatedGrades;

          if (updatedGrades.length > 0) {
            newSubjects[subject].average = updatedGrades.reduce((sum, grade) => sum + grade.value, 0) / updatedGrades.length;
          } else {
            delete newSubjects[subject];
          }

          setSubjects(newSubjects);
        },
        (tx, error) => {
          console.error("Error removing grade: ", error);
        }
      );
    });
  };
  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[globalStyles.marginTop, globalStyles.GreetingMessage]}>Ocjene</Text>
      <View style={globalStyles.OcjeneContainer}>
        <ScrollView style={globalStyles.scrollViewStyle}>
          {Object.keys(subjects).map((subject) => (
            <View key={subject} style={globalStyles.OcjeneRow}>
              <Text style={globalStyles.subjectTitle}>{subject}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', flexGrow: 1 }}>
              {subjects[subject].grades.map((grade, index) => (
              <TouchableOpacity key={grade.id || `${subject}-${index}`} onPress={() => handleRemoveGrade(subject, index)}>
              <Text style={globalStyles.grade}> {grade.value}</Text>
             </TouchableOpacity>
              ))}
              </View>
              <View style={globalStyles.averageGradeContainer}>
                <Text style={globalStyles.averageGrade}>
                  {subjects[subject].average.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
  
        <View style={globalStyles.AddRemoveTest}>
          <Icon name="add-circle-outline" size={30} color="#FFFFFF" onPress={() => setModalVisible(true)} />
        </View>
      </View>
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.modalOverlay}>
          <View style={globalStyles.modalContent}>
            <TextInput
              placeholder="Predmet"
              value={newSubject}
              onChangeText={setNewSubject}
              style={globalStyles.input}
            />
            <TextInput
              placeholder="Ocjena"
              value={newGrade}
              onChangeText={setNewGrade}
              keyboardType="numeric"
              style={globalStyles.input}
            />
            <TouchableOpacity style={globalStyles.modalButton} onPress={handleAddGrade}>
              <Text style={globalStyles.modalButtonText}>Dodaj ocjenu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.modalButton, { backgroundColor: 'red' }]} onPress={() => setModalVisible(false)}>
              <Text style={globalStyles.modalButtonText}>Otkaži</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
