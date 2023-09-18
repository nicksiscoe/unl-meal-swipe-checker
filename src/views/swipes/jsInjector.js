export const jsInjector = (authInfo) => {
  return `
    window.ReactNativeWebView.postMessage(JSON.stringify({injectionContentIsLoading: true}));
    // MEAL BALANCE SCREEN
    if (window.location.href === 'https://uh-world.unl.edu/StarRez_Forms/Meals/') {
      const swipeInfoHtml = document.querySelector('#frmMeals')?.children;
      const mealPlanType = swipeInfoHtml[0].childNodes[0].nodeValue;
      const mealSwipesRemaining = swipeInfoHtml[2].childNodes[0].nodeValue;
      const transferSwipesRemaining = swipeInfoHtml[4].childNodes[0].nodeValue;
      const diningDollarsRemaining = swipeInfoHtml[6].childNodes[0].nodeValue;
      window.ReactNativeWebView.postMessage(JSON.stringify({mealPlanUsageData: {mealPlanType, mealSwipesRemaining, transferSwipesRemaining, diningDollarsRemaining}}));
    // INITIAL SCREEN
    } else if (window.location.href ==='https://myred.nebraska.edu/psc/myred/NBL/HRMS/s/WEBLIB_NBA_SSO.ISCRIPT1.FieldFormula.IScript_Login?institution=NEUNL&setupid=STARREZUNL') {
      document.querySelector('.card-trueyou')?.children[0].click(); 
    // LOGIN SCREEN
    } else if (window.location.href.includes('https://fed.nebraska.edu/idp/profile/SAML2/Unsolicited/SSO?execution=')) {
      const authErrorPresent = document.querySelector('#banner_alert') !== null;
      if (${JSON.stringify(authInfo)} !== undefined && !authErrorPresent) {
        document.querySelector('#username').value = '${authInfo?.username}';
        document.querySelector('#password').value = '${authInfo?.password}';
        document.getElementsByName("_eventId_proceed")[0].click();
      } else {
        setTimeout(function(){ window.ReactNativeWebView.postMessage(JSON.stringify({injectionContentIsLoading: false})); }, 1000);
        document.getElementsByName("_eventId_proceed")[0]?.addEventListener("click", () => {
          const username = document.querySelector('#username').value;
          const password = document.querySelector('#password').value;
          window.ReactNativeWebView.postMessage(JSON.stringify({authInfo: {username, password}}));
        });
      }
    // CHECK MEAL PLAN BALANCE BUTTON SCREEN
    } else if (window.location.href.includes('https://unl.starrezhousing.com/StarRezPortalX/')) {
      const checkBalanceHref = document.querySelector('div[data-alttext="Check Meal Plan Balance"]').children[0].children[0].children[0].href;
      if (!!checkBalanceHref) {
        window.location.href = checkBalanceHref;
      } else {
        
      }
    }
  `;
}