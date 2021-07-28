const fetchMock = require("../fetch-mock");

function mockTrackByCarrierCodeAndTrackingNumber200() {
  fetchMock.get(
    "https://api.shipengine.com/v1/tracking?carrier_code=stamps_com&tracking_number=1234",
    {
      tracking_number: "332980205337",
      status_code: "DE",
      carrier_detail_code: null,
      status_description: "Delivered",
      carrier_status_code: "Delivery",
      carrier_status_description: "Shipment delivered",
      ship_date: null,
      estimated_delivery_date: null,
      actual_delivery_date: "2021-06-17T05:04:39Z",
      exception_description: null,
      events: [
        {
          occurred_at: "2021-07-23T12:42:00Z",
          carrier_occurred_at: "2021-07-23T07:42:00",
          description: "Out for Delivery, Expected Delivery by 9:00pm",
          city_locality: "MCKINNEY",
          state_province: "TX",
          postal_code: "75071",
          country_code: "",
          company_name: "",
          signer: "",
          event_code: "OF",
          carrier_detail_code: null,
          status_code: "",
          carrier_status_code: "OF",
          latitude: 33.175,
          longitude: -96.6986,
        },
        {
          occurred_at: "2021-07-23T12:31:00Z",
          carrier_occurred_at: "2021-07-23T07:31:00",
          description: "Arrived at Post Office",
          city_locality: "MCKINNEY",
          state_province: "TX",
          postal_code: "75070",
          country_code: "",
          company_name: "",
          signer: "",
          event_code: "07",
          carrier_detail_code: null,
          status_code: "",
          carrier_status_code: "07",
          latitude: 33.175,
          longitude: -96.6986,
        },
      ],
    }
  );
}

function mockTrackByCarrierCodeAndTrackingNumber400() {
  fetchMock.getOnce(
    "https://api.shipengine.com/v1/tracking?carrier_code=stamps_com&tracking_number=1234",
    {
      status: 500,
      body: {
        request_id: "123456789132456789123465789",
        error: {
          message: "Something bad happened",
        },
      },
    },
    { overwriteRoutes: false }
  );
}

module.exports = {
  mockTrackByCarrierCodeAndTrackingNumber200,
  mockTrackByCarrierCodeAndTrackingNumber400,
};
