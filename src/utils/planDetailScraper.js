import React, { useState, useLayoutEffect } from 'react';
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
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const PlanDetailScraper = ({ hardRefresh, showMealPlanDetailData }) => {
  const [state, setState] = useState({
    webUri: 'https://dining.unl.edu/meal-plans'
  });

  const getMealPlanDetailData = async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem('mealPlanDetailData'));
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  const storeMealPlanDetailData = async (mealPlanDetailData) => {
    try {
      await AsyncStorage.setItem('mealPlanDetailData', JSON.stringify(mealPlanDetailData))
    } catch (e) {
      console.log(e);
    }
  }

  const jsInjection = `
    if (window.location.href === 'https://dining.unl.edu/meal-plans') {
      const headers = [...document.querySelectorAll(".wdn-alt-header")].map(header => {
        return header.innerHTML?.replace("<br>", " ");
      });
      const mealPlanDetailDatas = headers.map(header => {
        let headerQuery = '[data-header="' + header + '"';
        const mealSwipeAllowance = [...document.querySelectorAll(headerQuery)][4].innerHTML;
        const diningDollarAllowance = [...document.querySelectorAll(headerQuery)][5].innerHTML;
        return {header, mealSwipeAllowance, diningDollarAllowance};
      });

      const allAccess = mealPlanDetailDatas[0];
      const platinum = mealPlanDetailDatas[1];
      const diamond = mealPlanDetailDatas[2];
      const gold = mealPlanDetailDatas[3];
      const silver = mealPlanDetailDatas[4];
      const bronze = mealPlanDetailDatas[5];
      window.ReactNativeWebView.postMessage(JSON.stringify({mealPlanDetailData: {allAccess, platinum, diamond, gold, silver, bronze}}));
    }
  `;

  useLayoutEffect(() => {
    getMealPlanDetailData().then(mealPlanDetailData => {
      if (!!mealPlanDetailData && !hardRefresh) {
        showMealPlanDetailData(mealPlanDetailData);
      }
    });
  }, [hardRefresh]);

  return (
    <WebView style={{ position: 'absolute', top: 0, display: 'none' }}
      cacheEnabled={true}
      domStorageEnabled={true}
      source={{ uri: state.webUri }}
      mixedContentMode={'compatibility'}
      javaScriptEnabled={true}
      javaScriptEnabledAndroid={true}
      injectedJavaScript={jsInjection}
      onMessage={async (event) => {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.log) {
          console.log(data.log);
        }
        if (data.mealPlanDetailData !== undefined) {
          const mealPlanDetailData = { ...data.mealPlanDetailData, lastDetailUpdated: new Date().getTime() };
          showMealPlanDetailData(mealPlanDetailData);
          await storeMealPlanDetailData(mealPlanDetailData);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({

});

export default React.memo(PlanDetailScraper, (prevProps, nextProps) => {
  if (prevProps.hardRefresh === nextProps.hardRefresh && prevProps.showMealPlanDetailData === nextProps.showMealPlanDetailData) {
    return true;
  }
  return false;
});