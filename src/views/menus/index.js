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
import { WebView } from 'react-native-webview';
import { jsInjector } from './jsInjector';

var Mixpanel = require('react-native-mixpanel');

const Menus = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [state, setState] = useState({
    webUri: 'http://menu.unl.edu/',
    jsInjection: undefined,
    isLoading: true
  });

  useLayoutEffect(() => {
    const jsInjection = jsInjector();
    setState({
      ...state,
      jsInjection,
      isLoading: false
    });
  }, [])

  const webViewLoader = () => {
    return (
      <SafeAreaView style={[styles.onLoadLoader, { display: showWebView ? 'none' : 'flex' }]}>
        <View style={styles.innerLoaderWrapper}>
          <ActivityIndicator />
          <Text style={{fontWeight: '600', opacity: 0.5, marginTop: 20}}>Loading Dining Hall Menus...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <WebView style={[styles.webView, { display: showWebView ? 'flex' : 'none' }]}
          onLoad={() => setShowWebView(true)}
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
            if (data.showWebView !== undefined) {
              if (data.showWebView === true) {
                Mixpanel.default.track("Checked Dining Menu");
                setShowWebView(true);
              } else {
                setShowWebView(false);
              }
            }
          }}
        />
      </SafeAreaView>
      {webViewLoader()}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  webView: {
    flex: 1
  },
  onLoadLoader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    alignSelf: 'center'
  },
  innerLoaderWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#262626'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
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
  caption: {
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.35)',
    marginTop: 4,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.35)'
  }
});

export default Menus;