import React,{useState} from 'react'
import { View, StyleSheet, Text, Alert, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Card from '../components/Card';
import ThemeColor from '../constants/colors'
import Input from '../components/input';
import NumberContainer from '../components/NumberContainer';

const StartGamesScreen = props => {
    const[enteredValue, setEnteredValue]=useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, SetSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,'') );
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }
    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue)
        if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99 || choseNumber === ''){
            Alert.alert('Invalid number' , 'number has to be between 1 and 99',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
        }
        setConfirmed(true);
        SetSelectedNumber(parseInt(choseNumber));
        setEnteredValue('');
        Keyboard.dismiss()

    };
    let confirmedOutput;
    if(confirmed){
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You Selected: </Text>
            <View>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title="Start Game" onPress={()=>{props.onStartGame(selectedNumber)}}/>
            </View>
        </Card>
    }
    return(
        <TouchableWithoutFeedback onPress={() =>{ Keyboard.dismiss();}}>
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
                <View style={styles.inputContainer}>
                    <Text>Select a Number </Text>
                    <Input style={styles.input}
                           blurOnSubmit autoCapitalize='none'
                           autoCorrect={false}
                           keyboardType="number-pad"
                           maxLenght={2}
                           onChangeText={numberInputHandler}
                           value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={ThemeColor.accent}/></View>
                       <View styles={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={ThemeColor.primary}/></View>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    button: {
        width:100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems:'center'
    }
})
export default StartGamesScreen
