import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar
} from 'react-native';
import ProgressBar from '../../../components/progressBar';
import calendarUtil from '../../../utils/calendar';

const SemesterProgressCard = ({ isLoading, semesterName, semesterProgressPct, semesterWeeksRemaining }) => {
  const loader = () => {
    return (
      <ActivityIndicator style={styles.loader} />
    );
  }

  return (
    <>
      <View style={styles.infoRow}>
        <Text style={styles.title}>{semesterName}</Text>
        {!isLoading ?
          <Text style={styles.progressBarContext}>{semesterWeeksRemaining ? `${semesterWeeksRemaining} weeks remaining` : ''}</Text>
          :
          loader()
        }
      </View>
      <ProgressBar progressPct={semesterProgressPct} idealProgressPct={0} />
    </>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18
  },
  value: {
    color: '#262626',
    fontSize: 28,
    fontWeight: '600'
  },
  progressBarContext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 16
  },
  loader: {
    alignSelf: 'flex-start',
    height: 33.5,
    zIndex: 3
  }
});

export default SemesterProgressCard;