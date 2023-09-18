export const jsInjector = (authInfo) => {
  return `
    // Remove junk
    document.getElementById('staticPanel2').remove();
    document.getElementById('disclaimerPanel').remove();
    document.getElementById('cbo_nn_headerNavBarOuter').remove();
    
  `;
}