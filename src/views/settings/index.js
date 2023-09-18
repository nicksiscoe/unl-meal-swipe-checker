import React, { useState, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from '../../assets/icon';

var Mixpanel = require('react-native-mixpanel');

const Settings = (props) => {
  const [state, setState] = useState({
    isLoading: true
  });

  useLayoutEffect(() => {
    setState({
      ...state,
      isLoading: false
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButtonWrapper} disabled={state.refreshingMealPlanUsageData} onPress={() => {
            props.navigation.navigate('Home');
          }}>
            <Icon name="CaretLeft" fill='#d00000' width={30} height={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>Settings</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 28, opacity: 0.1, fontWeight: '600' }}>Coming Soon: New Customization Options</Text>
        </View>
        <View style={{ alignSelf: 'flex-start', padding: 20 }}>
          <Text>Interested in advertizing your campus RSO? Contact the number below.</Text>
        </View>
        <View style={{ alignSelf: 'flex-start', padding: 20 }}>
          <Text>Enjoy this app? Please share it with UNL peers!</Text>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text style={styles.caption}>Feature ideas? Problems? Text </Text>
            <Text style={styles.caption} selectable={true}>(913)-200-9625</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#262626',
    padding: 8
  },
  backButtonWrapper: {
    padding: 10
  },
  content: {
    padding: 20,
    flex: 1
  },
  caption: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.35)',
    marginTop: 4,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.35)'
  }
});

export default Settings;