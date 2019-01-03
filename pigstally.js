'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class pigstally extends Component {

  constructor(props) {
    super(props);

    // nothing to see here
    this.playerInfo = {tempScore:0, bankScore:0, firstRoll:0, firstRollString:"ready!", secondRollString:"ready!", pigout:false, bankIt: false, playerName: 'Player ' + props};
    // var tempScore = 0;
    // var bankScore = 0;
    // var firstRoll = 0;
    // var firstRollString = "";
    // var secondRollString = "";
    // var pigout = false;
    // var playerName = "Player 1";
  }

  getScore() {
    return this.playerInfo.tempScore;
  }

  getBankScore() {
    return this.playerInfo.bankScore;
  }

  getFirstRoll() {
    return this.playerInfo.firstRollString;
  }

  getSecondRoll() {
    return this.playerInfo.secondRollString;
  }

  getPlayerName() {
    return this.playerInfo.playerName;
  }

  getPigout() {
    return this.playerInfo.pigout;
  }

  getBankIt() {
    return this.playerInfo.bankIt;
  }

  roll(msg) {

		this.playerInfo.pigout = false;
    	this.playerInfo.bankIt = false;
		var currentRoll = msg.trim();
		if (currentRoll !== 'Bank It' && currentRoll !== 'Total Loss (pigs touching)')
		{
			var roll = 0;
			if (currentRoll === 'Sider')
			{
				roll = 1;
			}
			if (currentRoll === 'Sider dot')
			{
				roll = 1;
			}
			if (currentRoll === 'Trotter')
			{
				roll = 5;
			}
			if (currentRoll === 'Razorback')
			{
				roll = 5;
			}
			if (currentRoll === 'Snouter')
			{
				roll = 10;
			}
			if (currentRoll === 'Leaning Jowler')
			{
				roll = 15;
			}
			if (this.playerInfo.firstRoll > 0)
			{
				// This is the second roll
				if (this.playerInfo.firstRoll == 1)
				{
					// need to check for "pig out"
					if (this.playerInfo.firstRollString === currentRoll)
					{
						// for a double sider we only give 1 point
						this.playerInfo.tempScore =this.playerInfo.tempScore + this.playerInfo.firstRoll;
						// set pig2 roll
						this.playerInfo.secondRollString = currentRoll;
						// reset first roll
						this.playerInfo.firstRoll = 0;
					}
					else
					{
						if (currentRoll.indexOf("Sider") > -1)
						{
							// pig out (no score added to total)
							this.playerInfo.tempScore = 0;
							this.playerInfo.firstRoll = 0;
							// reset Pig1 Roll
							this.playerInfo.firstRollString = 'ready!';
							// reset Pig2 Roll
							this.playerInfo.secondRollString = 'ready!';
							this.playerInfo.pigout = true;
						}
						else
						{
							// for any roll combination with a sider
							// only the non-sider roll is counted (i.e. Trotter + Sider = Trotter (5))
							this.playerInfo.tempScore =this.playerInfo.tempScore + roll;
							// set text
							this.playerInfo.secondRollString = currentRoll;
							// reset values
							this.playerInfo.firstRoll = 0;
						}
					}
				}
				else
				{
					// add additional points for doubles
					if (this.playerInfo.firstRollString === currentRoll)
					{
						if (currentRoll === 'Trotter')
						{
							roll = roll + 10;
						}
						if (currentRoll === 'Razorback')
						{
							roll = roll + 10;
						}
						if (currentRoll === 'Snouter')
						{
							roll = roll + 20;
						}
						if (currentRoll === 'Leaning Jowler')
						{
							roll = roll + 30;
						}
					}
					// add the previous roll and the current roll to the temporary total
					// unless it's a sider, then just leave the 1 out
					if (roll == 1)
					{
						this.playerInfo.tempScore =this.playerInfo.tempScore +this.playerInfo.firstRoll;
					}
					else
					{
						this.playerInfo.tempScore =this.playerInfo.tempScore +this.playerInfo.firstRoll + roll;
					}
					// set text
					this.playerInfo.secondRollString = currentRoll;
					// reset values
					this.playerInfo.firstRoll = 0;
				}
			}
			else
			{
				// This is the first roll
				this.playerInfo.firstRollString = currentRoll;
				this.playerInfo.firstRoll = roll;
				this.playerInfo.secondRollString = "ready!";
			}
		}
		else
		{
			// Allow the user to bank the current running tally
			if (currentRoll === 'Bank It')
			{
				this.playerInfo.bankScore =this.playerInfo.bankScore +this.playerInfo.tempScore;
				this.playerInfo.tempScore = 0;
				this.playerInfo.firstRollString = 'ready!';
				this.playerInfo.secondRollString = 'ready!';
        this.playerInfo.bankIt = true;
			}
			// Pigs touching is total loss of current tally and all banked total
			if (currentRoll === 'Total Loss (pigs touching)')
			{
				this.playerInfo.tempScore = 0;
				this.playerInfo.bankScore = 0;
				this.playerInfo.firstRollString = 'ready!';
				this.playerInfo.secondRollString = 'ready!';
        this.playerInfo.pigout = true;
			}
		}
    //console.log('roll1' +this.playerInfo.firstRollString + ' roll2: ' +this.playerInfo.secondRollString);
    return (this.playerInfo.pigout || this.playerInfo.bankIt);
	}
}

module.exports = pigstally;
