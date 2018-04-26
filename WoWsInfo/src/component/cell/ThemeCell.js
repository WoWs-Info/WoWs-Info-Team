import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import store from 'react-native-simple-store';
import { WoWsTouchable } from '..';
import { LocalData } from '../../constant/value';
import { getTextColour } from '../../constant/colour';
import { startAppIOS, startAppAndroid } from '../../app/App';

class ThemeCell extends Component {
  constructor(props) {
    super();
    this.colour = props.colour;
  }

  render() {
    const { viewStyle } = styles
    return (
      <WoWsTouchable onPress={this.changeTheme}>
        <View style={[viewStyle, {backgroundColor: this.colour[500]}]}>
          <Text style={{fontSize: 16, color: getTextColour(this.colour[500])}}>{this.colour[500]}</Text>
        </View>
      </WoWsTouchable>        
    )
  }

  changeTheme = () => {
    global.theme = this.colour;
    store.save(LocalData.theme, this.colour);
    !android ? startAppIOS() : startAppAndroid();
  }
}

const viewHeight = Dimensions.get('window').height * 0.15;
export const styles = StyleSheet.create({
  viewStyle: {
    height: viewHeight, flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export { ThemeCell };