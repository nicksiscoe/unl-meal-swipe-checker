"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _readOnlyError2=_interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _reactNativeSecureKeyStore=_interopRequireWildcard(require("react-native-secure-key-store"));var _asyncStorage=_interopRequireDefault(require("@react-native-async-storage/async-storage"));var _reactNativeWebview=require("react-native-webview");var _internal=_interopRequireDefault(require("../../api/internal"));var _mealSwipeCard=_interopRequireDefault(require("./components/mealSwipeCard"));var _diningDollarCard=_interopRequireDefault(require("./components/diningDollarCard"));var _semesterProgressCard=_interopRequireDefault(require("./components/semesterProgressCard"));var _calendar=_interopRequireDefault(require("../../utils/calendar"));var _jsInjector=require("./jsInjector");var _this=void 0,_jsxFileName="/Users/nicksiscoe/Projects/unl-swipe-checker/src/views/swipes/index.js";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){(0,_defineProperty2["default"])(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var Mixpanel=require('react-native-mixpanel');var internalAPI=new _internal["default"]();var Swipes=function Swipes(props){var _state$mealPlanUsageD,_state$mealPlanUsageD2,_state$mealPlanDetail,_state$mealPlanDetail2,_state$mealPlanDetail3,_state$mealPlanDetail4,_state$mealPlanDetail5,_startDate;var _useState=(0,_react.useState)(false),_useState2=(0,_slicedToArray2["default"])(_useState,2),injectionContentIsLoading=_useState2[0],setInjectionContentIsLoading=_useState2[1];var _useState3=(0,_react.useState)({demoMode:false,webUri:'https://myred.nebraska.edu/psc/myred/NBL/HRMS/s/WEBLIB_NBA_SSO.ISCRIPT1.FieldFormula.IScript_Login?institution=NEUNL&setupid=STARREZUNL',jsInjection:undefined,isLoading:true,refreshingMealPlanUsageData:false,mealPlanUsageData:undefined,mealPlanDetailAndSemesterData:undefined,resetBrowser:false}),_useState4=(0,_slicedToArray2["default"])(_useState3,2),state=_useState4[0],setState=_useState4[1];var getAuthInfo=function getAuthInfo(){return _regenerator["default"].async(function getAuthInfo$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;_context.t0=JSON;_context.next=4;return _regenerator["default"].awrap(_reactNativeSecureKeyStore["default"].get('authInfo'));case 4:_context.t1=_context.sent;return _context.abrupt("return",_context.t0.parse.call(_context.t0,_context.t1));case 8:_context.prev=8;_context.t2=_context["catch"](0);console.log(_context.t2);return _context.abrupt("return",undefined);case 12:case"end":return _context.stop();}}},null,null,[[0,8]]);};var storeAuthInfo=function storeAuthInfo(authInfo){return _regenerator["default"].async(function storeAuthInfo$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;Mixpanel["default"].createAlias(authInfo.username);Mixpanel["default"].identify(authInfo.username);Mixpanel["default"].set({username:authInfo.username});_context2.next=6;return _regenerator["default"].awrap(_reactNativeSecureKeyStore["default"].set('authInfo',JSON.stringify(authInfo),{accessible:_reactNativeSecureKeyStore.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY}));case 6:_context2.next=11;break;case 8:_context2.prev=8;_context2.t0=_context2["catch"](0);console.log(_context2.t0);case 11:case"end":return _context2.stop();}}},null,null,[[0,8]]);};var getMealPlanUsageData=function getMealPlanUsageData(){return _regenerator["default"].async(function getMealPlanUsageData$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.prev=0;_context3.t0=JSON;_context3.next=4;return _regenerator["default"].awrap(_asyncStorage["default"].getItem('mealPlanUsageData'));case 4:_context3.t1=_context3.sent;return _context3.abrupt("return",_context3.t0.parse.call(_context3.t0,_context3.t1));case 8:_context3.prev=8;_context3.t2=_context3["catch"](0);console.log(_context3.t2);return _context3.abrupt("return",undefined);case 12:case"end":return _context3.stop();}}},null,null,[[0,8]]);};var storeMealPlanUsageData=function storeMealPlanUsageData(mealPlanUsageData){return _regenerator["default"].async(function storeMealPlanUsageData$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.prev=0;_context4.next=3;return _regenerator["default"].awrap(_asyncStorage["default"].setItem('mealPlanUsageData',JSON.stringify(mealPlanUsageData)));case 3:_context4.next=8;break;case 5:_context4.prev=5;_context4.t0=_context4["catch"](0);console.log(_context4.t0);case 8:case"end":return _context4.stop();}}},null,null,[[0,5]]);};var getMealPlanDetailAndSemesterData=function getMealPlanDetailAndSemesterData(){return _regenerator["default"].async(function getMealPlanDetailAndSemesterData$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.prev=0;_context5.t0=JSON;_context5.next=4;return _regenerator["default"].awrap(_asyncStorage["default"].getItem('mealPlanDetailAndSemesterData'));case 4:_context5.t1=_context5.sent;return _context5.abrupt("return",_context5.t0.parse.call(_context5.t0,_context5.t1));case 8:_context5.prev=8;_context5.t2=_context5["catch"](0);console.log(_context5.t2);return _context5.abrupt("return",undefined);case 12:case"end":return _context5.stop();}}},null,null,[[0,8]]);};var storeMealPlanDetailAndSemesterData=function storeMealPlanDetailAndSemesterData(mealPlanDetailAndSemesterData){return _regenerator["default"].async(function storeMealPlanDetailAndSemesterData$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.prev=0;_context6.next=3;return _regenerator["default"].awrap(_asyncStorage["default"].setItem('mealPlanDetailAndSemesterData',JSON.stringify(mealPlanDetailAndSemesterData)));case 3:_context6.next=8;break;case 5:_context6.prev=5;_context6.t0=_context6["catch"](0);console.log(_context6.t0);case 8:case"end":return _context6.stop();}}},null,null,[[0,5]]);};var fetchData=function fetchData(){return _regenerator["default"].async(function fetchData$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:_context7.next=2;return _regenerator["default"].awrap(Mixpanel["default"].sharedInstanceWithToken("51d54c929c5566d94d10fda385e60563"));case 2:getMealPlanUsageData().then(function(mealPlanUsageData){var jsInjection=undefined;getAuthInfo().then(function(authInfo){if(authInfo!==undefined){jsInjection=(0,_jsInjector.jsInjector)(authInfo);Mixpanel["default"].createAlias(authInfo.username);Mixpanel["default"].identify(authInfo.username);Mixpanel["default"].set({username:authInfo.username});}else{jsInjection=(0,_jsInjector.jsInjector)();}if(!mealPlanUsageData){setState(_objectSpread({},state,{jsInjection:jsInjection,isLoading:false}));}else{getMealPlanDetailAndSemesterData().then(function(mealPlanDetailAndSemesterData){if(!mealPlanDetailAndSemesterData){setState(_objectSpread({},state,{jsInjection:jsInjection,isLoading:false,mealPlanUsageData:mealPlanUsageData}));}else{setState(_objectSpread({},state,{jsInjection:jsInjection,isLoading:false,mealPlanDetailAndSemesterData:mealPlanDetailAndSemesterData,mealPlanUsageData:mealPlanUsageData}));}internalAPI.getMealPlanDetailData().then(function(mealPlanDetailData){internalAPI.getCurrentSemesterData().then(function(semesterData){var newMealPlanDetailAndSemesterData={mealPlanDetailData:mealPlanDetailData,currentSemesterData:semesterData[semesterData.length-1]};storeMealPlanDetailAndSemesterData(newMealPlanDetailAndSemesterData);setState(_objectSpread({},state,{jsInjection:jsInjection,isLoading:false,mealPlanDetailAndSemesterData:newMealPlanDetailAndSemesterData,mealPlanUsageData:mealPlanUsageData}));});});});setState(_objectSpread({},state,{jsInjection:jsInjection,isLoading:false,mealPlanUsageData:mealPlanUsageData}));}});});case 3:case"end":return _context7.stop();}}});};(0,_react.useLayoutEffect)(function(){fetchData();},[state.resetBrowser]);var lastUpdatedObject=new Date((_state$mealPlanUsageD=state.mealPlanUsageData)==null?void 0:_state$mealPlanUsageD.lastUpdated);var lastUpdated="".concat(lastUpdatedObject.getMonth(),"/").concat(lastUpdatedObject.getDate(),"/").concat(lastUpdatedObject.getYear());if(state.mealPlanUsageData===undefined){lastUpdated='';}else if(lastUpdatedObject.getDate()===new Date().getDate()){lastUpdated="".concat(lastUpdatedObject.toLocaleTimeString());}else if(lastUpdatedObject>new Date().setDate(new Date().getDate()-1)){lastUpdated="Yesterday at ".concat(lastUpdatedObject.toLocaleTimeString());}else if(lastUpdatedObject>new Date().setDate(new Date().getDate()-7)){lastUpdated="".concat(_calendar["default"].daysOfWeek[lastUpdatedObject.getDay()]," at ").concat(lastUpdatedObject.toLocaleTimeString());}var mealPlanType=(_state$mealPlanUsageD2=state.mealPlanUsageData)==null?void 0:_state$mealPlanUsageD2.mealPlanType.trim();var currentMealPlanDetails=(_state$mealPlanDetail=state.mealPlanDetailAndSemesterData)==null?void 0:_state$mealPlanDetail.mealPlanDetailData.find(function(mealPlanDetailAndSemesterDataItem){return mealPlanType===mealPlanDetailAndSemesterDataItem.balanceSiteIdentifier;});var readableTodaysDate="".concat(_calendar["default"].daysOfWeek[new Date().getDay()],", ").concat(_calendar["default"].months[new Date().getMonth()]," ").concat(new Date().getDate());var startDate=_calendar["default"].parseYYYYMMDD((_state$mealPlanDetail2=state.mealPlanDetailAndSemesterData)==null?void 0:(_state$mealPlanDetail3=_state$mealPlanDetail2.currentSemesterData)==null?void 0:_state$mealPlanDetail3.startDate);var endDate=_calendar["default"].parseYYYYMMDD((_state$mealPlanDetail4=state.mealPlanDetailAndSemesterData)==null?void 0:(_state$mealPlanDetail5=_state$mealPlanDetail4.currentSemesterData)==null?void 0:_state$mealPlanDetail5.endDate);if(((_startDate=startDate)==null?void 0:_startDate.getTime())>(endDate==null?void 0:endDate.getTime())){startDate=((0,_readOnlyError2["default"])("startDate"),endDate);}var totalSemesterDays=_calendar["default"].differenceInDays(startDate,endDate);var daysPassed=_calendar["default"].differenceInDays(startDate,new Date());var semesterProgressPct=daysPassed/totalSemesterDays||0;var semesterWeeksRemaining=_calendar["default"].differenceInWeeks(new Date(),endDate);if(state.isLoading){return _react["default"].createElement(_react["default"].Fragment,null,_react["default"].createElement(_reactNative.StatusBar,{barStyle:"dark-content",__self:_this,__source:{fileName:_jsxFileName,lineNumber:195,columnNumber:9}}),_react["default"].createElement(_reactNative.SafeAreaView,{style:styles.safeAreaView,__self:_this,__source:{fileName:_jsxFileName,lineNumber:196,columnNumber:9}},_react["default"].createElement(_reactNative.ActivityIndicator,{style:{margin:'auto',flex:1},__self:_this,__source:{fileName:_jsxFileName,lineNumber:197,columnNumber:11}})));}else if(state.demoMode){return _react["default"].createElement(_react["default"].Fragment,null,_react["default"].createElement(_reactNative.StatusBar,{barStyle:"dark-content",__self:_this,__source:{fileName:_jsxFileName,lineNumber:204,columnNumber:9}}),_react["default"].createElement(_reactNative.SafeAreaView,{style:styles.safeAreaView,__self:_this,__source:{fileName:_jsxFileName,lineNumber:205,columnNumber:9}},_react["default"].createElement(_reactNative.View,{style:styles.renderedContent,__self:_this,__source:{fileName:_jsxFileName,lineNumber:206,columnNumber:11}},_react["default"].createElement(_reactNative.View,{style:styles.header,__self:_this,__source:{fileName:_jsxFileName,lineNumber:207,columnNumber:13}},_react["default"].createElement(_reactNative.Text,{style:styles.subtitle,__self:_this,__source:{fileName:_jsxFileName,lineNumber:208,columnNumber:15}},"Demo Meal Plan"),_react["default"].createElement(_reactNative.Button,{style:{margin:0,alignSelf:'flex-end'},disabled:state.refreshingMealPlanUsageData,title:"Refresh",onPress:function onPress(){setState({demoMode:true});},__self:_this,__source:{fileName:_jsxFileName,lineNumber:209,columnNumber:15}})),_react["default"].createElement(_reactNative.View,{style:styles.values,__self:_this,__source:{fileName:_jsxFileName,lineNumber:215,columnNumber:13}},_react["default"].createElement(_reactNative.Text,{style:styles.value,__self:_this,__source:{fileName:_jsxFileName,lineNumber:216,columnNumber:15}},"Meal Swipes: 14"),_react["default"].createElement(_reactNative.Text,{style:[styles.value,{marginTop:0}],__self:_this,__source:{fileName:_jsxFileName,lineNumber:217,columnNumber:15}},"Dining Dollars: $193.12")),_react["default"].createElement(_reactNative.Text,{style:styles.caption,__self:_this,__source:{fileName:_jsxFileName,lineNumber:219,columnNumber:13}},"Last Updated: ",new Date().toLocaleTimeString())),_react["default"].createElement(_reactNative.View,{style:{alignSelf:'flex-start',padding:20,paddingTop:0,flexDirection:'row'},__self:_this,__source:{fileName:_jsxFileName,lineNumber:221,columnNumber:11}},_react["default"].createElement(_reactNative.Text,{style:{color:'rgba(0, 0, 0, 0.35)'},__self:_this,__source:{fileName:_jsxFileName,lineNumber:222,columnNumber:13}},"Issues? Feature requests? Text "),_react["default"].createElement(_reactNative.Text,{style:{color:'rgba(0, 0, 0, 0.35)'},selectable:true,__self:_this,__source:{fileName:_jsxFileName,lineNumber:222,columnNumber:98}},"(913)-991-2986"))));}else{var _state$mealPlanDetail6,_state$mealPlanDetail7,_state$mealPlanUsageD3,_state$mealPlanUsageD4,_state$mealPlanUsageD5;return _react["default"].createElement(_react["default"].Fragment,null,state.refreshingMealPlanUsageData?_react["default"].createElement(_reactNative.SafeAreaView,{style:styles.webView,__self:_this,__source:{fileName:_jsxFileName,lineNumber:231,columnNumber:11}},_react["default"].createElement(_reactNativeWebview.WebView,{style:[styles.innerWebView,{display:injectionContentIsLoading?'none':'flex'}],resetBrowser:state.resetBrowser,cacheEnabled:true,domStorageEnabled:true,source:{uri:state.webUri},mixedContentMode:'compatibility',javaScriptEnabled:true,javaScriptEnabledAndroid:true,injectedJavaScript:state.jsInjection,onMessage:function _callee(event){var data,mealPlanUsageData;return _regenerator["default"].async(function _callee$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:data=JSON.parse(event.nativeEvent.data);if(data.log){console.log(data.log);}if(data.injectionContentIsLoading!==undefined){if(data.injectionContentIsLoading===true){setInjectionContentIsLoading(true);}else{setInjectionContentIsLoading(false);}}if(data.authInfo!==undefined){if(data.authInfo.username.toUpperCase()==='USERNAME'&&data.authInfo.password.toUpperCase()==='PASSWORD'){setState({demoMode:true});}else{storeAuthInfo(data.authInfo);}}if(!(data.mealPlanUsageData!==undefined)){_context8.next=11;break;}mealPlanUsageData=_objectSpread({},data.mealPlanUsageData,{lastUpdated:new Date().getTime()});setState(_objectSpread({},state,{refreshingMealPlanUsageData:false,mealPlanUsageData:mealPlanUsageData}));setInjectionContentIsLoading(false);_context8.next=10;return _regenerator["default"].awrap(storeMealPlanUsageData(mealPlanUsageData));case 10:if(!state.mealPlanDetailAndSemesterData){internalAPI.getMealPlanDetailData().then(function(mealPlanDetailData){internalAPI.getCurrentSemesterData().then(function(semesterData){var newMealPlanDetailAndSemesterData={mealPlanDetailData:mealPlanDetailData,currentSemesterData:semesterData[semesterData.length-1]};storeMealPlanDetailAndSemesterData(newMealPlanDetailAndSemesterData);setState(_objectSpread({},state,{refreshingMealPlanUsageData:false,mealPlanUsageData:mealPlanUsageData,mealPlanDetailAndSemesterData:newMealPlanDetailAndSemesterData}));});});}case 11:if(data.resetBrowser){setState({jsInjection:undefined,isLoading:true,refreshingMealPlanUsageData:true,mealPlanUsageData:undefined,resetBrowser:!state.resetBrowser});}case 12:case"end":return _context8.stop();}}});},__self:_this,__source:{fileName:_jsxFileName,lineNumber:232,columnNumber:13}})):null,_react["default"].createElement(_reactNative.StatusBar,{barStyle:"dark-content",__self:_this,__source:{fileName:_jsxFileName,lineNumber:300,columnNumber:9}}),_react["default"].createElement(_reactNative.SafeAreaView,{style:styles.safeAreaView,__self:_this,__source:{fileName:_jsxFileName,lineNumber:301,columnNumber:9}},_react["default"].createElement(_reactNative.View,{style:styles.topDateContent,__self:_this,__source:{fileName:_jsxFileName,lineNumber:302,columnNumber:11}},_react["default"].createElement(_reactNative.Text,{style:{fontSize:24},__self:_this,__source:{fileName:_jsxFileName,lineNumber:303,columnNumber:13}},readableTodaysDate),_react["default"].createElement(_reactNative.TouchableOpacity,{style:styles.refreshButton,disabled:state.refreshingMealPlanUsageData,onPress:function onPress(){props.navigation.navigate('Settings');},__self:_this,__source:{fileName:_jsxFileName,lineNumber:304,columnNumber:13}},_react["default"].createElement(_reactNative.Text,{style:styles.refreshButtonText,__self:_this,__source:{fileName:_jsxFileName,lineNumber:307,columnNumber:15}},"Refresh")),_react["default"].createElement(_semesterProgressCard["default"],{isLoading:state.isLoading,semesterName:(_state$mealPlanDetail6=state.mealPlanDetailAndSemesterData)==null?void 0:(_state$mealPlanDetail7=_state$mealPlanDetail6.currentSemesterData)==null?void 0:_state$mealPlanDetail7.semesterName,semesterProgressPct:semesterProgressPct,semesterWeeksRemaining:semesterWeeksRemaining,__self:_this,__source:{fileName:_jsxFileName,lineNumber:309,columnNumber:13}})),_react["default"].createElement(_reactNative.ScrollView,{contentContainerStyle:styles.renderedContent,showsVerticalScrollIndicator:false,__self:_this,__source:{fileName:_jsxFileName,lineNumber:316,columnNumber:11}},_react["default"].createElement(_reactNative.View,{style:styles.header,__self:_this,__source:{fileName:_jsxFileName,lineNumber:320,columnNumber:13}},_react["default"].createElement(_reactNative.Text,{style:styles.subtitle,__self:_this,__source:{fileName:_jsxFileName,lineNumber:321,columnNumber:15}},(mealPlanType==null?void 0:mealPlanType.trim())||(state.refreshingMealPlanUsageData?"Loading...":"Tap 'Refresh'"))),_react["default"].createElement(_reactNative.View,{style:styles.values,__self:_this,__source:{fileName:_jsxFileName,lineNumber:323,columnNumber:13}},_react["default"].createElement(_mealSwipeCard["default"],{isLoading:state.refreshingMealPlanUsageData,mealSwipesRemaining:parseFloat((_state$mealPlanUsageD3=state.mealPlanUsageData)==null?void 0:_state$mealPlanUsageD3.mealSwipesRemaining)+parseFloat((_state$mealPlanUsageD4=state.mealPlanUsageData)==null?void 0:_state$mealPlanUsageD4.transferSwipesRemaining),swipeAllowance:currentMealPlanDetails==null?void 0:currentMealPlanDetails.swipeAllowance,swipesResetWeekly:currentMealPlanDetails==null?void 0:currentMealPlanDetails.swipesResetWeekly,semesterProgressPct:semesterProgressPct,__self:_this,__source:{fileName:_jsxFileName,lineNumber:324,columnNumber:15}}),_react["default"].createElement(_diningDollarCard["default"],{isLoading:state.refreshingMealPlanUsageData,diningDollarsRemaining:(_state$mealPlanUsageD5=state.mealPlanUsageData)==null?void 0:_state$mealPlanUsageD5.diningDollarsRemaining,diningDollarAllowance:currentMealPlanDetails==null?void 0:currentMealPlanDetails.diningDollarAllowance,semesterProgressPct:semesterProgressPct,__self:_this,__source:{fileName:_jsxFileName,lineNumber:325,columnNumber:15}})),_react["default"].createElement(_reactNative.View,{style:styles.footer,__self:_this,__source:{fileName:_jsxFileName,lineNumber:327,columnNumber:13}},_react["default"].createElement(_reactNative.Text,{style:styles.caption,numberOfLines:1,__self:_this,__source:{fileName:_jsxFileName,lineNumber:328,columnNumber:15}},"Last Updated: ",lastUpdated||'⸺'," aijshdiuahsdihasidhjiahjshdkjha"),_react["default"].createElement(_reactNative.TouchableOpacity,{style:styles.refreshButton,disabled:state.refreshingMealPlanUsageData,onPress:function onPress(){Mixpanel["default"].track('Meal Plan Usage Refresh');setInjectionContentIsLoading(true);setState(_objectSpread({},state,{refreshingMealPlanUsageData:true}));},__self:_this,__source:{fileName:_jsxFileName,lineNumber:329,columnNumber:15}},_react["default"].createElement(_reactNative.Text,{style:styles.refreshButtonText,__self:_this,__source:{fileName:_jsxFileName,lineNumber:334,columnNumber:17}},"Refresh")))),_react["default"].createElement(_reactNative.View,{style:{alignSelf:'flex-start',padding:20,paddingTop:10,flexDirection:'row'},__self:_this,__source:{fileName:_jsxFileName,lineNumber:338,columnNumber:11}},_react["default"].createElement(_reactNative.Text,{style:{color:'rgba(0, 0, 0, 0.35)',fontSize:12},__self:_this,__source:{fileName:_jsxFileName,lineNumber:339,columnNumber:13}},"Problems? Feature requests? Text "),_react["default"].createElement(_reactNative.Text,{style:{color:'rgba(0, 0, 0, 0.35)',fontSize:12},selectable:true,__self:_this,__source:{fileName:_jsxFileName,lineNumber:339,columnNumber:114}},"(913)-991-2986"))));}};var styles=_reactNative.StyleSheet.create({safeAreaView:{position:'relative',flex:1,backgroundColor:'#f4f4f4'},webView:{position:'absolute',width:'100%',height:'100%',zIndex:2},innerWebView:{position:'relative',flex:1,backgroundColor:'#f4f4f4'},loader:{alignSelf:'flex-start',zIndex:3},renderedContent:{position:'relative',flex:1,marginTop:-10,paddingLeft:20,paddingRight:20,justifyContent:'center'},topDateContent:{padding:28},header:{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',color:'#262626',padding:8},footer:{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',color:'#262626',padding:8},refreshButton:{margin:0,alignSelf:'flex-end',borderRadius:100,paddingLeft:10,paddingRight:10,paddingTop:6,paddingBottom:6,backgroundColor:'#d00'},refreshButtonText:{color:'#fff',fontWeight:'700'},subtitle:{fontSize:18,fontWeight:'600',marginTop:8,marginBottom:4,color:'#262626'},values:{marginTop:2,marginBottom:8},value:{fontSize:26,fontWeight:'400',marginTop:4,marginBottom:4,color:'#262626'},boldText:{fontWeight:'600'},caption:{fontWeight:'600',fontSize:11,color:'rgba(0, 0, 0, 0.3)',marginTop:4,marginBottom:4}});var _default=Swipes;exports["default"]=_default;