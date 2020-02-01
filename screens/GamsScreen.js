import React,{useState,useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude)=>{
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max-min) + min)
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1,100,props.userChoice)
    );
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [round,setRound] = useState(0)
    const {userChoice, onGameOver} = props


    useEffect(()=>{
        if(currentGuess === userChoice) {
            onGameOver(round)
        }
    },[currentGuess,userChoice,onGameOver])


    const nextGuessHandler = direction => {
        if ((direction == 'lower' && currentGuess < props.userChoice) || direction == 'greater' && currentGuess > props.userChoice) {
            Alert.alert('Don\'t lie', 'you knoe that is wrong', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRound(currenRound => currenRound + 1)
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="lower" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    );
};
 const styles = StyleSheet.create({
     screen: {
         flex: 1,
         padding: 10,
         alignContent:'center',
         alignItems:'center'
     },
     buttonContainer: {
         flexDirection: 'row',
         justifyContent: 'space-around',
         marginTop:20,
         maxWidth:'80%',
         width:300
     }
 })

export default GameScreen
