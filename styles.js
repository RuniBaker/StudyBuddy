import { StyleSheet, Dimensions  } from 'react-native';
import * as Font from 'expo-font';
const { width, height } = Dimensions.get('window');

async function loadFonts() {
  await Font.loadAsync({
    'Inter': require('./assets/fonts/Inter-Black.ttf'),
    // Add other fonts here
  });
}
loadFonts();
export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#C8D4E3', 
  },
  
  marginTop: {
    marginTop: 50
  },

  GreetingMessage:{
    marginLeft: 30,
    fontSize: 34,
    color: '#FFFFFF',
    fontFamily: 'Inter'
  },

  clockView:{
    margin:21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F67A6',
    borderRadius: 25,
  },

  clockText:{
    fontSize:80,
    color: '#FFFFFF',
    fontFamily: 'Inter'
  },

  TestContainer:{
    flex: 1,
    margin: 21,
    
    backgroundColor: '#1F67A6',
    borderRadius: 25,
  },

  AddRemoveTest:{
    position: 'absolute',
  right: 10,
  bottom: 10,
  alignItems: 'right',
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    },
    modalView: {
      width: '80%', // set the modal width as a percentage of screen width
      aspectRatio: 1, // using aspectRatio 1 will make it a square
      alignSelf: 'center', // center the modal on screen
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    
    
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Set width as you prefer
    borderRadius: 5
    },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eaeaea', // Change background color as needed
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Change header background color as needed
    padding: 10,
    margin: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  NadolazeciView:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  NadolazeciText:{
    fontSize:24,
    color: '#FFFFFF',
    margin:10,
    fontFamily: 'Inter',
  },

  TestRow:{
    margin: 10,
    backgroundColor: '#012E40',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  TestNaziv:{
    fontSize:24,
    color: '#FFFFFF',
    margin:10,
    
  },

  TestDatum:{
    fontSize:20,
    color: '#FFFFFF',
    margin:10,
    
  },

  testDatumView:{
    justifyContent: 'flex-end',
  },

  modalView:{ 
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    backgroundColor:'#1F67A6',
},
  modalAdd:{
    width: '80%', // Set the width of the modal
    backgroundColor: 'white',
    borderRadius: 20, // Optional: if you want rounded corners
    padding: 20,
  },
  FocusView:{
    margin:21,
    backgroundColor: '#1F67A6',
    borderRadius: 25,
    justifyContent: 'center',
  },
  FocusText:{
    marginLeft:20,
    margin: 40,
    fontSize:24,
    color: '#FFFFFF',
    fontFamily: 'Inter'
  },

  RasporedView:{
    margin:21,
    backgroundColor: '#1F67A6',
    borderRadius: 25,
    justifyContent: 'center',

  },
  RasporedText:{
    marginHorizontal: 20,
    marginVertical:50,
    fontSize:20,
    color: '#FFFFFF',
    fontFamily: 'Inter'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background color
  },
  
  modalContent: {
    alignSelf: 'center', // Center the modal on screen horizontally
    backgroundColor: '#1F67A6', // Background color for the modal
    borderRadius: 20, // Rounded corners for the modal
    padding: 20, // Padding inside the modal
    width: '80%', // Width of the modal as a percentage of screen width
    maxWidth: 500, // Optional: Maximum width for larger screens
    alignItems: 'center', // Center items horizontally inside the modal
    justifyContent: 'center', // Center items vertically inside the modal
    marginTop: '10%', // Top margin
    marginBottom: '10%'
  },
  
  OcjeneContainer:{
    flex: 1,
    marginVertical: 30,
    marginHorizontal:21,
    backgroundColor: '#1F67A6',
    borderRadius: 25,
  },
  gradesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This pushes children to opposite ends
    alignItems: 'center', // This ensures they are centered vertically
    width: '100%', // Ensure the container takes full width
  },
  
  
  OcjeneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This ensures space between the subject title, grades, and average
    alignItems: 'center', // Align items vertically in the center
    width: '100%', // OcjeneRow should take full width
    marginVertical:5,
    backgroundColor: '#012E40',
    borderRadius: 25,
    height: 50,
  },
  
  averageGradeContainer: {
    // This will be the container for the average grade text
    alignItems: 'flex-end', // Align text to the end (right)
    justifyContent: 'center', // Center the text if there's extra vertical space
    flexShrink: 0, // Prevent the container from shrinking
  },
  
  averageGrade: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight:10,
    fontFamily: 'Inter'
    // Add margin or padding if needed
  },
  
  
  modalButton: {
    backgroundColor: '#1F67A6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%', // ensure full width
    alignSelf: 'center', // this will center the button
  },
  modalButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Inter'
  },
  
  
  modalSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Use the full width of the modal content
    marginBottom: 10,
  },
  scrollViewStyle: {
    margin: 10,
  },
  subjectContainer: {
    backgroundColor: '#1E88E5', // A lighter shade for the subject container
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  subjectTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    margin: 10 ,
    fontFamily: 'Inter'
  },
  grade: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 5, // Spacing between grades
    
  },

  dial: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#61DBFB', // React Blue color for the dial
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 200,
  },
  button: {
    marginHorizontal: 55,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F67A6',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter'
  },
  svgContainer: {
    marginTop:70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerText: {
    position: 'absolute',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1F67A6',
    top: '42%',
    left: '42%',
    transform: [{ translateX: -50 }, { translateY: -12 }],
    fontFamily: 'Inter'
  }
});
