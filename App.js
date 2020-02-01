/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import Header from './components/Header';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import StartGamesScreen from './screens/StartGameScreen';
import GameScreen from './screens/GamsScreen';
import GameOverScreen from './screens/GameOverScreen';

const App: () => React$Node = () => {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };
    const configNewGameHandler = ()=> {
      setGuessRounds(0);
      setUserNumber(null)
    }
    const gameOverHanlder = numOfRounds => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGamesScreen onStartGame={startGameHandler}/>;
    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHanlder}/>;
    } else if (guessRounds > 0) {
        content = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onRestart={configNewGameHandler}/>;
    }

    return (
        <View style={styles.screen}>
            <Header title='Guess a Number'/>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

});

export default App;
