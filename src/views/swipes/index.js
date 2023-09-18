import React, { useState, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  View,
  Text,
  StatusBar
} from 'react-native';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import InternalAPI from '../../api/internal';
import MealSwipeCard from './components/mealSwipeCard';
import DiningDollarCard from './components/diningDollarCard';
import SemesterProgressCard from './components/semesterProgressCard';
import Icon from '../../assets/icon';
import calendarUtil from '../../utils/calendar';
import { jsInjector } from './jsInjector';

var Mixpanel = require('react-native-mixpanel');

const internalAPI = new InternalAPI();

const Swipes = (props) => {
  const [injectionContentIsLoading, setInjectionContentIsLoading] = useState(false);
  const [state, setState] = useState({
    demoMode: false,
    webUri: 'https://myred.nebraska.edu/psc/myred/NBL/HRMS/s/WEBLIB_NBA_SSO.ISCRIPT1.FieldFormula.IScript_Login?institution=NEUNL&setupid=STARREZUNL',
    jsInjection: undefined,
    isLoading: true,
    refreshingMealPlanUsageData: false,
    mealPlanUsageData: undefined,
    mealPlanDetailAndSemesterData: undefined,
    resetBrowser: false
  });

  const getAuthInfo = async () => {
    try {
      return JSON.parse(await RNSecureKeyStore.get('authInfo'));
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  const storeAuthInfo = async (authInfo) => {
    try {
      Mixpanel.default.createAlias(authInfo.username);
      Mixpanel.default.identify(authInfo.username);
      Mixpanel.default.set({ username: authInfo.username });
      await RNSecureKeyStore.set('authInfo', JSON.stringify(authInfo), { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
    } catch (e) {
      console.log(e);
    }
  }

  const getMealPlanUsageData = async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem('mealPlanUsageData'));
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  const storeMealPlanUsageData = async (mealPlanUsageData) => {
    try {
      await AsyncStorage.setItem('mealPlanUsageData', JSON.stringify(mealPlanUsageData))
    } catch (e) {
      console.log(e);
    }
  }

  const getMealPlanDetailAndSemesterData = async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem('mealPlanDetailAndSemesterData'));
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  const storeMealPlanDetailAndSemesterData = async (mealPlanDetailAndSemesterData) => {
    try {
      await AsyncStorage.setItem('mealPlanDetailAndSemesterData', JSON.stringify(mealPlanDetailAndSemesterData))
    } catch (e) {
      console.log(e);
    }
  }

  const fetchData = async () => {
    await Mixpanel.default.sharedInstanceWithToken("51d54c929c5566d94d10fda385e60563");
    getMealPlanUsageData().then(mealPlanUsageData => {
      let jsInjection = undefined;
      getAuthInfo().then(authInfo => {
        if (authInfo !== undefined) {
          jsInjection = jsInjector(authInfo);
          Mixpanel.default.createAlias(authInfo.username);
          Mixpanel.default.identify(authInfo.username);
          Mixpanel.default.set({ username: authInfo.username });
        } else {
          jsInjection = jsInjector();
        }
        if (!mealPlanUsageData) {
          setState({
            ...state,
            jsInjection,
            isLoading: false
          });
        } else {
          getMealPlanDetailAndSemesterData().then(mealPlanDetailAndSemesterData => {
            if (!mealPlanDetailAndSemesterData) {
              setState({
                ...state,
                jsInjection,
                isLoading: false,
                mealPlanUsageData
              });
            } else {
              setState({
                ...state,
                jsInjection,
                isLoading: false,
                mealPlanDetailAndSemesterData,
                mealPlanUsageData
              });
            }
            internalAPI.getMealPlanDetailData().then(mealPlanDetailData => {
              internalAPI.getCurrentSemesterData().then(semesterData => {
                const newMealPlanDetailAndSemesterData = {
                  mealPlanDetailData,
                  currentSemesterData: semesterData[semesterData.length - 1]
                };
                storeMealPlanDetailAndSemesterData(newMealPlanDetailAndSemesterData);
                setState({
                  ...state,
                  jsInjection,
                  isLoading: false,
                  mealPlanDetailAndSemesterData: newMealPlanDetailAndSemesterData,
                  mealPlanUsageData
                });
              });
            });
          });
          setState({
            ...state,
            jsInjection,
            isLoading: false,
            mealPlanUsageData
          });
        }
      });
    });
  }

  useLayoutEffect(() => {
    fetchData();
  }, [state.resetBrowser]);

  // Last Updated Timestamp
  const lastUpdatedObject = new Date(state.mealPlanUsageData?.lastUpdated);
  let lastUpdated = `${lastUpdatedObject.getMonth()}/${lastUpdatedObject.getDate()}/${lastUpdatedObject.getYear()}`;
  if (state.mealPlanUsageData === undefined) {
    lastUpdated = '';
  } else if (lastUpdatedObject.getDate() === new Date().getDate()) {
    lastUpdated = `${lastUpdatedObject.toLocaleTimeString()}`;
  } else if (lastUpdatedObject > (new Date().setDate(new Date().getDate() - 1))) {
    lastUpdated = `Yesterday ${lastUpdatedObject.toLocaleTimeString()}`;
  } else if (lastUpdatedObject > (new Date().setDate(new Date().getDate() - 7))) {
    lastUpdated = `${calendarUtil.daysOfWeek[lastUpdatedObject.getDay()]} ${lastUpdatedObject.toLocaleTimeString()}`;
  }

  const mealPlanType = state.mealPlanUsageData?.mealPlanType.trim();
  const currentMealPlanDetails = state.mealPlanDetailAndSemesterData?.mealPlanDetailData.find(mealPlanDetailAndSemesterDataItem => mealPlanType === mealPlanDetailAndSemesterDataItem.balanceSiteIdentifier);

  const readableTodaysDate = `${calendarUtil.daysOfWeek[new Date().getDay()]}, ${calendarUtil.months[new Date().getMonth()]} ${new Date().getDate()}`;

  // Semester Date Stuff
  const startDate = calendarUtil.parseYYYYMMDD(state.mealPlanDetailAndSemesterData?.currentSemesterData?.startDate);
  const endDate = calendarUtil.parseYYYYMMDD(state.mealPlanDetailAndSemesterData?.currentSemesterData?.endDate);
  if (startDate?.getTime() > endDate?.getTime()) {
    startDate = endDate;
  }
  const totalSemesterDays = calendarUtil.differenceInDays(startDate, endDate);
  const daysPassed = calendarUtil.differenceInDays(startDate, new Date());
  const semesterProgressPct = (daysPassed / totalSemesterDays) || 0;
  const semesterWeeksRemaining = calendarUtil.differenceInWeeks(new Date(), endDate);

  if (state.isLoading) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <ActivityIndicator style={{ margin: 'auto', flex: 1 }} />
        </SafeAreaView>
      </>
    );
  } else if (state.demoMode) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.renderedContent}>
            <View style={styles.header}>
              <Text style={styles.subtitle}>Demo Meal Plan</Text>
              <Button style={{ margin: 0, alignSelf: 'flex-end' }} disabled={state.refreshingMealPlanUsageData} title="Refresh" onPress={() => {
                setState({
                  demoMode: true
                });
              }} />
            </View>
            <View style={styles.values}>
              <Text style={styles.value}>Meal Swipes: 14</Text>
              <Text style={[styles.value, { marginTop: 0 }]}>Dining Dollars: $193.12</Text>
            </View>
            <Text style={styles.caption}>Last Updated: {new Date().toLocaleTimeString()}</Text>
          </View>
          <View style={{ alignSelf: 'flex-start', padding: 20, paddingTop: 0, flexDirection: 'row' }}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.35)' }}>Issues? Feature requests? Text </Text><Text style={{ color: 'rgba(0, 0, 0, 0.35)' }} selectable={true}>(913)-991-2986</Text>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        {state.refreshingMealPlanUsageData ?
          <SafeAreaView style={styles.webView}>
            <WebView style={[styles.innerWebView, { display: injectionContentIsLoading ? 'none' : 'flex' }]}
              resetBrowser={state.resetBrowser}
              cacheEnabled={true}
              domStorageEnabled={true}
              source={{ uri: state.webUri }}
              mixedContentMode={'compatibility'}
              javaScriptEnabled={true}
              javaScriptEnabledAndroid={true}
              injectedJavaScript={state.jsInjection}
              onMessage={async (event) => {
                const data = JSON.parse(event.nativeEvent.data);
                if (data.log) {
                  console.log(data.log);
                }
                if (data.injectionContentIsLoading !== undefined) {
                  if (data.injectionContentIsLoading === true) {
                    setInjectionContentIsLoading(true);
                  } else {
                    setInjectionContentIsLoading(false);
                  }
                }
                if (data.authInfo !== undefined) {
                  if (data.authInfo.username.toUpperCase() === 'USERNAME' && data.authInfo.password.toUpperCase() === 'PASSWORD') {
                    setState({
                      demoMode: true
                    });
                  } else {
                    storeAuthInfo(data.authInfo);
                  }
                }
                if (data.mealPlanUsageData !== undefined) {
                  const mealPlanUsageData = { ...data.mealPlanUsageData, lastUpdated: new Date().getTime() };
                  setState({ ...state, refreshingMealPlanUsageData: false, mealPlanUsageData });
                  setInjectionContentIsLoading(false);
                  await storeMealPlanUsageData(mealPlanUsageData);
                  if (!state.mealPlanDetailAndSemesterData) {
                    internalAPI.getMealPlanDetailData().then(mealPlanDetailData => {
                      internalAPI.getCurrentSemesterData().then(semesterData => {
                        const newMealPlanDetailAndSemesterData = {
                          mealPlanDetailData,
                          currentSemesterData: semesterData[semesterData.length - 1]
                        };
                        storeMealPlanDetailAndSemesterData(newMealPlanDetailAndSemesterData);
                        setState({
                          ...state,
                          refreshingMealPlanUsageData: false,
                          mealPlanUsageData,
                          mealPlanDetailAndSemesterData: newMealPlanDetailAndSemesterData
                        });
                      });
                    });
                  }
                }
                if (data.resetBrowser) {
                  setState({
                    jsInjection: undefined,
                    isLoading: true,
                    refreshingMealPlanUsageData: true,
                    mealPlanUsageData: undefined,
                    resetBrowser: !state.resetBrowser
                  });
                }
              }}
            />
          </SafeAreaView>
          :
          null
        }
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.topDateContent}>
            <View style={styles.topDateHeader}>
              <Text style={{ fontSize: 24 }}>{readableTodaysDate}</Text>
              <TouchableOpacity style={styles.settingsWrapper} disabled={state.refreshingMealPlanUsageData} onPress={() => {
                props.navigation.navigate('Settings');
              }}>
                <Icon name="Settings" fill='#d00000' width={26} height={26} />
              </TouchableOpacity>
            </View>
            <SemesterProgressCard
              isLoading={state.isLoading}
              semesterName={state.mealPlanDetailAndSemesterData?.currentSemesterData?.semesterName}
              semesterProgressPct={semesterProgressPct}
              semesterWeeksRemaining={semesterWeeksRemaining}
            />
          </View>
          <ScrollView
            style={{marginTop: -60, zIndex: -1}}
            contentContainerStyle={styles.renderedContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.subtitle}>{mealPlanType?.trim() || (state.refreshingMealPlanUsageData ? "Loading..." : "Tap 'Refresh'")}</Text>
            </View>
            <View style={styles.values}>
              <MealSwipeCard isLoading={state.refreshingMealPlanUsageData} mealSwipesRemaining={parseFloat(state.mealPlanUsageData?.mealSwipesRemaining) + parseFloat(state.mealPlanUsageData?.transferSwipesRemaining)} swipeAllowance={currentMealPlanDetails?.swipeAllowance} swipesResetWeekly={currentMealPlanDetails?.swipesResetWeekly} semesterProgressPct={semesterProgressPct} />
              <DiningDollarCard isLoading={state.refreshingMealPlanUsageData} diningDollarsRemaining={state.mealPlanUsageData?.diningDollarsRemaining} diningDollarAllowance={currentMealPlanDetails?.diningDollarAllowance} semesterProgressPct={semesterProgressPct} />
            </View>
            <View style={styles.footer}>
              <Text style={styles.lastUpdated} numberOfLines={1}>Last Updated: {lastUpdated || '⸺'}</Text>
              <TouchableOpacity style={styles.refreshButton} disabled={state.refreshingMealPlanUsageData} onPress={() => {
                Mixpanel.default.track('Meal Plan Usage Refresh');
                setInjectionContentIsLoading(true);
                setState({ ...state, refreshingMealPlanUsageData: true });
              }}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
                <Icon name="Refresh" fill='#f4f4f4' width={16} height={16} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  webView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  innerWebView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  loader: {
    alignSelf: 'flex-start',
    zIndex: 3
  },
  renderedContent: {
    position: 'relative',
    flex: 1,
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center'
  },
  topDateContent: {
    padding: 28,
    backgroundColor: '#f4f4f4'
  },
  topDateHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingsWrapper: {
    margin: 0,
    padding: 0
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#262626',
    padding: 8
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#262626',
    padding: 8
  },
  refreshButton: {
    margin: 0,
    alignSelf: 'flex-end',
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#d00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 4
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#262626'
  },
  values: {
    marginTop: 2,
    marginBottom: 8
  },
  value: {
    fontSize: 26,
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 4,
    color: '#262626'
  },
  boldText: {
    fontWeight: '600',
  },
  lastUpdated: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.3)',
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
    overflow: 'hidden',
    flexShrink: 1
  }
});

export default Swipes;