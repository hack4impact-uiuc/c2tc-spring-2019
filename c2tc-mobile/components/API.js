async function getBusStops() {
  try {
    let response = await fetch("https://backend-xnbrzeooeu.now.sh/busStops");
    let responseJson = await response.json();
    return responseJson.result.busStops;
  } catch (error) {
    console.error(error);
  }
}

async function getCrimes() {
  try {
    let response = await fetch("https://backend-xnbrzeooeu.now.sh/crimes");
    let responseJson = await response.json();
    return responseJson.result.crimes;
  } catch (error) {
    console.error(error);
  }
}

async function getBusinesses() {
  try {
    let response = await fetch("https://backend-xnbrzeooeu.now.sh/businesses");
    let responseJson = await response.json();
    return responseJson.result.businesses;
  } catch (error) {
    console.error(error);
  }
}

async function getEmergencyPhones() {
  try {
    let response = await fetch(
      "https://backend-xnbrzeooeu.now.sh/emergencyPhones"
    );
    let responseJson = await response.json();
    return responseJson.result.emergencyPhones;
  } catch (error) {
    console.error(error);
  }
}

//This function is commented because the backend data is not available yet.

/*
async function getStreetLight() {
  try {
    let response = await fetch("https://backend-xnbrzeooeu.now.sh/streetLight");
    let responseJson = await response.json();
    console.log(responseJson.result.streetLight);
  } catch (error) {
    console.error(error);
  }
}
*/
export { getBusStops, getCrimes, getBusinesses, getEmergencyPhones };