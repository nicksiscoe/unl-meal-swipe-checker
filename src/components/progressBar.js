import React from 'react';
import { StyleSheet, View } from 'react-native';

const ProgressBar = ({ progressPct, idealProgressPct = 0 }) => {

  const aheadOfSchedule = progressPct > idealProgressPct;

  return (
    <View style={styles.wrapper}>
      <View style={styles.background}>
        <View style={[styles.foreground, {
          width: `${progressPct * 100}%`,
          zIndex: aheadOfSchedule ? 1 : 2
        }]}></View>
        <View style={[styles.ideal, {
          width: `${idealProgressPct * 100}%`,
          zIndex: aheadOfSchedule ? 2 : 1,
          backgroundColor: aheadOfSchedule ? 'rgba(0, 0, 0, 0.18)' : 'rgba(0, 0, 0, 0.08)',
        }]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  background: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 100,
    height: 10,
    width: '100%'
  },
  foreground: {
    position: 'relative',
    backgroundColor: '#d00000',
    borderRadius: 100,
    height: 10
  },
  ideal: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 100,
    height: 10,
  }
});

export default ProgressBar;