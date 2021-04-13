const { ShipEngine } = require("../../");

const sendValidateAddressRequest = async (address) => {
  let response;

  try {
    const shipengine = new ShipEngine({
      apiKey: "MY_API_KEY",
      baseUrl: "https://simengine.herokuapp.com",
      timeout: 20000,
    });
    response = await shipengine.validateAddress(address);
    console.log(JSON.stringify(response));
    return response;
  } catch (e) {
    console.log(`Error from test: ${e.message}`);
  }
};

module.exports = {
  sendValidateAddressRequest,
};
