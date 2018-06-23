import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
import { WikiCell, DrawerCell, SettingCell, SettingView } from '../../component';
import { navStyle } from '../../constant/colour';
import language from '../../constant/language';
import { iconsMap } from '../../constant/icon';
import { LocalData } from '../../constant/value';

export default class Wiki extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      let store = require('react-native-simple-store');
      store.save(LocalData.saved_tab, 2);
    }
  }

  render() {
    const { achievement, commander, consumable, collection, warship, map } = data;
    if (android) {
      return (
        <View>
          <DrawerCell icon={require('../../img/Achievement-Android.png')} 
            title={language.wiki_achievement + ' (' + Object.keys(achievement).length + ')'} 
            onPress={() => this.pushToBasic(language.wiki_achievement, {info: achievement}, true)}/>
          <DrawerCell icon={require('../../img/Warship-Android.png')} 
            title={language.wiki_warship + ' (' + Object.keys(warship).length + ')'} 
            onPress={() => this.pushToWarship()}/>
          <DrawerCell icon={require('../../img/Upgrade-Android.png')} title={language.wiki_upgrade} 
            onPress={() => this.pushToBasic(language.wiki_upgrade, {info: consumable, upgrade: true})}/>
          <DrawerCell icon={require('../../img/Camouflage-Android.png')} 
            title={language.wiki_flag_camouflage} 
            onPress={() => this.pushToBasic(language.wiki_flag_camouflage, {info: consumable})}/>
          <DrawerCell icon={require('../../img/CommanderSkill-Android.png')} 
            title={language.wiki_commander} onPress={() => this.pushToBasic(language.wiki_commander, {info: commander})}/>
          <DrawerCell icon={iconsMap['map']} 
            title={language.wiki_map + ' (' + Object.keys(map).length + ')'} onPress={() => this.pushToMap()}/>
          <DrawerCell icon={require('../../img/Collection-Android.png')} 
            title={language.wiki_collection} 
            onPress={() => this.pushToBasic(language.wiki_collection, {info: collection})}/>
        </View>
      )
    } else return (
      <ScrollView>
        <View ref={(ref) => (this.preview = ref)} animation='fadeInRight'>
          <SettingView>
            <SettingCell divider image={require('../../img/Achievement.png')} 
              title={language.wiki_achievement + ' (' + Object.keys(achievement).length + ')'} 
              onPress={() => this.pushToBasic(language.wiki_achievement, {info: achievement}, true)}/>
            <SettingCell divider  image={require('../../img/Warship.png')} 
              title={language.wiki_warship + ' (' + Object.keys(warship).length + ')'} 
              onPress={() => this.pushToWarship()}/>
            <SettingCell divider  image={require('../../img/Upgrade.png')} title={language.wiki_upgrade} 
              onPress={() => this.pushToBasic(language.wiki_upgrade, {info: consumable, upgrade: true})}/>
            <SettingCell divider  image={require('../../img/Camouflage.png')} 
              title={language.wiki_flag_camouflage} 
              onPress={() => this.pushToBasic(language.wiki_flag_camouflage, {info: consumable})}/>
            <SettingCell divider  image={require('../../img/CommanderSkill.png')} 
              title={language.wiki_commander} onPress={() => this.pushToBasic(language.wiki_commander, {info: commander})}/>
            <SettingCell divider  image={require('../../img/Map.png')} 
              title={language.wiki_map + ' (' + Object.keys(map).length + ')'} onPress={() => this.pushToMap()}/>
            <SettingCell image={require('../../img/Collection.png')} 
              title={language.wiki_collection} 
              onPress={() => this.pushToBasic(language.wiki_collection, {info: collection})}/>
          </SettingView>
        </View>
      </ScrollView>
    )
  }
  
  /**
   * Push to basic screen
   * @param {string} title 
   * @param {*} info 
   */
  pushToBasic(title, info, preview) {
    // Close drawer for android
    if (android) this.props.drawer();
    this.props.navigator.push({
      screen: 'wiki.basic',
      title: title,
      passProps: info,
      navigatorStyle: navStyle()
    })
  }

  /**
   * Push to map screen
   */
  pushToMap = () => {
    // Close drawer for android
    if (android) this.props.drawer();
    this.props.navigator.push({
      screen: 'wiki.map',
      title: language.wiki_map,
      navigatorStyle: navStyle()
    })
  }

  /**
   * Push to warship screen
   */
  pushToWarship() {
    // Close drawer for android
    if (android) this.props.drawer();
    this.props.navigator.push({
      screen: 'wiki.ship',
      title: language.wiki_warship,
      navigatorButtons: {
        rightButtons: [ 
          {id: 'reset', icon: iconsMap['undo']},
          {id: 'filter', icon: iconsMap['filter']}
        ]
      },
      navigatorStyle: navStyle()
    })
  }
}

