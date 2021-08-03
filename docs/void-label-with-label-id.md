Void Label With Label ID
======================================
[ShipEngine](www.shipengine.com) allows you to void/cancel a previously purchased label. Please see [our docs](https://www.shipengine.com/docs/labels/voiding/) to learn more about voiding a label.

Input Parameters
-------------------------------------

The `voidLabelWithLabelId` method accepts an array of addresses. If you are using TypeScript, you can import the [`ValidateAddressesTypes.Param`](https://github.com/ShipEngine/shipengine-js/blob/main/src/validate-addresses/types/public-params.ts)
type into your project to take advantage of your
IDE's code completion functionality.

Output
--------------------------------
The `voidLabelWithLabelId` method returns an array of address validation result objects.
If you are using TypeScript, you can import the [`ValidateAddressesTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/validate-addresses/types/public-result.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");