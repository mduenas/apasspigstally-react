/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  PixelRatio
} from 'react-native';

// Admob
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob'

var Banner = require("react-native-admob")
var Toast = require('react-native-toast')
var density = PixelRatio.get();
var pigstally = require("./pigstally");


class apasspigstally extends Component {

  constructor(props) {
    super(props);

    this.pigsTally = new pigstally(1);
    this.players = new Array();
    this.players.push(this.pigsTally);
    this.state = {
      pig1: 'ready!',
      pig2: 'ready!',
      score: 0,
      bank: 0,
      playerName: 'Player 1',
      playerCount: 1,
      currentPlayer: 0,
      fadeAnim: new Animated.Value(1)
    }
  }

  reset() {
    this.pigsTally = new pigstally(1);
    this.players = new Array();
    this.players.push(this.pigsTally);
    this.setState({
      pig1: 'ready!',
      pig2: 'ready!',
      score: 0,
      bank: 0,
      playerName: 'Player 1',
      playerCount: 1,
      currentPlayer: 0,
      fadeAnim: new Animated.Value(1)
    });
  }

  addPlayer() {

    var count = this.state.playerCount + 1;
    this.players.push(new pigstally(count));
    this.setState({
      playerCount: count,
      currentPlayer: count - 1
    });
    this.refresh();
    Animated.sequence([Animated.timing(this.state.fadeAnim,{toValue: 0},), Animated.timing(this.state.fadeAnim,{toValue: 1},)]).start();
  }

  refresh() {

    this.pigsTally = this.players[this.state.currentPlayer];
    this.setState({
      pig1: this.pigsTally.getFirstRoll(),
      pig2: this.pigsTally.getSecondRoll(),
      score: this.pigsTally.getScore(),
      bank: this.pigsTally.getBankScore(),
      playerName: this.pigsTally.getPlayerName()
    });
  }

  pressedButton(whichButton) {

    //console.log('pressed: ' + whichButton);
    //Alert.alert('Warning', 'That is a lot of digits, are you sure?', [{text: 'Cancel', onPress: ()=>this.onPressCancel()},{text: 'Proceed', onPress: ()=>this.onPressOk()}]);

    // if roll returns true then go to the next player
    if (this.pigsTally.roll(whichButton))
    {

      if (this.state.currentPlayer == this.state.playerCount -1) {
        this.setState({
          currentPlayer: 0
        });
      } else {
        this.setState({
          currentPlayer: this.state.currentPlayer + 1
        });
      }

      Animated.sequence([Animated.timing(this.state.fadeAnim,{toValue: 0},), Animated.timing(this.state.fadeAnim,{toValue: 1},)]).start();
      if (this.pigsTally.getPigout()) {
          Toast.showShortCenter('Pigout!');
      }
    }
    this.refresh();
  }

  render() {

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleView}>
        <TouchableHighlight
          underlayColor='#dddddd'
          onPress={() => this.reset()}>
          <View style={styles.leftToolbar}>
            <Text style={styles.shareTextLeft}>Reset</Text>
          </View>
        </TouchableHighlight>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>Pigs Tally</Text>
          </View>
          <TouchableHighlight
            underlayColor='#dddddd'
            onPress={() => this.addPlayer()}>
            <View style={styles.rightToolbar}>
              <Text style={styles.shareText}>Add Player</Text>
            </View>
          </TouchableHighlight>
        </View>
        <AdMobBanner
          style={styles.bannerContainer}
          bannerSize={"banner"}
          adUnitID={"ca-app-pub-7540731406850248/9946550555"}
          didFailToReceiveAdWithError={this.bannerError} />
          <Text>{this.bannerError}</Text>
        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Sider")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Sider!</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Sider dot")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Sider dot!</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Trotter")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Trotter!</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Razorback")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Razorback!</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Snouter")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Snouter!</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Leaning Jowler")}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Leaning Jowler!</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputcontainer}>
          <View style={styles.pigcontainer}>
            <Text style={styles.instructions}>Pig 1</Text>
            <Text style={styles.pigroll}>{this.state.pig1}</Text>
          </View>
          <View style={styles.pigcontainer}>
            <Text style={styles.instructions}>Pig 2</Text>
            <Text style={styles.pigroll}>{this.state.pig2}</Text>
          </View>
        </View>
        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Bank It")}
            underlayColor='#dddddd'>
            <Text style={styles.btnTextDark}>Bank It!</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.pressedButton("Total Loss (pigs touching)")}
            underlayColor='#dddddd'>
            <Text style={styles.btnTextDark}>Total Loss! (pigs touching)</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputcontainer}>
            <View style={styles.pigcontainer}>
              <Text style={styles.labelscore}>Score:</Text><Text style={styles.score}>{this.state.score}</Text>
            </View>
            <View style={styles.pigcontainer}>
              <Text style={styles.labelscore}>Banked:</Text><Text style={styles.score}>{this.state.bank}</Text>
            </View>
        </View>
        <Animated.View style={{marginTop: 5,padding: 5,flexDirection: 'row',opacity: this.state.fadeAnim}}>
          <Text style={styles.playerText}>{this.state.playerName}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#efebe9',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#ff8a65',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    flex: 1,
    fontSize: 20,
  },
  titleBar: {
    flex: 2,
  },
  leftToolbar: {
    flex: 1,
  },
  rightToolbar: {
    flex: 1,
  },
  shareTextLeft:{
    color: '#33cccc',
    textAlign: 'center',
    fontWeight: 'normal',
    paddingTop: 25,
    paddingLeft: 20,
    flex: 1,
    fontSize: 14,
  },
  shareText:{
    color: '#33cccc',
    textAlign: 'center',
    fontWeight: 'normal',
    paddingTop: 25,
    paddingRight: 20,
    flex: 1,
    fontSize: 14,
  },
  inputcontainer: {
    marginTop: 2,
    padding: 2,
    flexDirection: 'row'
  },
  scorecontainer: {
    marginTop: 5,
    padding: 5,
    flexDirection: 'column'
  },
  pigcontainer: {
    flex: 2,
    marginTop: 2,
    padding: 2,
    flexDirection: 'column'
  },
  bannerContainer: {
    padding: 2,
    justifyContent: 'center',
    backgroundColor: '#055',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ffd54f',
    borderRadius: 4,
    color: '#ffb74d'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#33cccc',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 2,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  btnTextDark: {
    fontSize: 18,
    color: '#000000',
    marginTop: 6,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ff8a65',
    marginBottom: 5,
    fontSize: 16,
    flex: 2,
  },
  playerText: {
    textAlign: 'center',
    color: '#ff8a65',
    marginBottom: 5,
    fontSize: 22,
    flex: 2,
  },
  labelscore: {
    textAlign: 'center',
    color: '#ffd54f',
    marginBottom: 5,
    fontSize: 20,
    flex: 3,
  },
  score: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
    flex: 4,
  },
  pigroll: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
    flex: 2,
  },
});

AppRegistry.registerComponent('apasspigstally', () => apasspigstally);
