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

const MealSwipeCard = ({ isLoading, mealSwipesRemaining, swipeAllowance, swipesResetWeekly, semesterProgressPct }) => {
  const loader = () => {
    return (
      <ActivityIndicator style={styles.loader} />
    );
  }

  const used = parseFloat(swipeAllowance) - parseFloat(mealSwipesRemaining);
  const progressPct = (used / swipeAllowance) || 0;
  
  let daysPassedThisWeek = new Date().getDay() + 1;
  if (daysPassedThisWeek === 8) {
    daysPassedThisWeek = 1;
  }
  const idealProgressPct = swipesResetWeekly ? (daysPassedThisWeek / 7) : semesterProgressPct;

  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>Meal Swipes Remaining</Text>
        {!isLoading ?
          <Text style={styles.value}>{parseFloat(mealSwipesRemaining) || '⸺'}</Text>
          :
          loader()
        }
      </View>
      {mealSwipesRemaining <= swipeAllowance ?
        <>
          <ProgressBar progressPct={progressPct} idealProgressPct={idealProgressPct} />
          <Text style={styles.progressBarContext}>Used {parseFloat(used) || '⸺'} out of {swipeAllowance || '⸺'}{swipesResetWeekly ? ' this week' : ''}</Text>
        </>
        :
        <>
          <ProgressBar progressPct={0} idealProgressPct={0} />
          <Text style={styles.progressBarContext}>Used {0} out of {swipeAllowance || '⸺'}{swipesResetWeekly ? ' this week' : ''}</Text>
        </>
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
    alignItems: 'center',
    marginBottom: 10
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

export default MealSwipeCard;