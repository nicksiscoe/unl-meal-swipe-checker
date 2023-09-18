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

const DiningDollarCard = ({ isLoading, diningDollarsRemaining, diningDollarAllowance, semesterProgressPct }) => {
  const loader = () => {
    return (
      <ActivityIndicator style={styles.loader} />
    );
  }

  const used = parseFloat(diningDollarAllowance) - parseFloat(diningDollarsRemaining);
  const progressPct = (used / diningDollarAllowance) || 0;

  if (!isLoading && diningDollarsRemaining === 0 && diningDollarAllowance === 0) {
    return null;
  }
  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>Dining Dollars Remaining</Text>
        {!isLoading ?
          <Text style={styles.value}>${parseFloat(diningDollarsRemaining) || '⸺'}</Text>
          :
          loader()
        }
      </View>
      {diningDollarsRemaining <= diningDollarAllowance ?
        <View style={styles.progressBarContainer}>
          <ProgressBar progressPct={progressPct} idealProgressPct={semesterProgressPct} />
          <Text style={styles.progressBarContext}>Used ${parseFloat(used).toFixed(2) || '⸺'} out of ${diningDollarAllowance || '⸺'}</Text>
        </View>
        :
        (diningDollarAllowance !== 0 ?
          <View style={styles.progressBarContainer}>
            <ProgressBar progressPct={0} idealProgressPct={0} />
            <Text style={styles.progressBarContext}>Used ${0} out of ${diningDollarAllowance || '⸺'}</Text>
          </View>
          :
          null
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginTop: 4,
    marginBottom: 4
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18,
    marginRight: 4
  },
  value: {
    color: '#262626',
    fontSize: 28,
    fontWeight: '600'
  },
  progressBarContainer: {
    marginTop: 10
  },
  progressBarContext: {
    alignSelf: 'flex-end',
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 11,
    marginTop: 8
  },
  loader: {
    alignSelf: 'flex-start',
    height: 33.5,
    zIndex: 3
  }
});

export default DiningDollarCard;