Void Label With Label Id
================================
[ShipEngine](www.shipengine.com) allows you to attempt to void a previously purchased label. Please see [our docs](https://www.shipengine.com/docs/labels/voiding/) to learn more about voiding a label.

Input Parameters
-------------------------------------

The `voidLabelWithLabelId` method accepts a string that contains the label Id that is being voided.

Output
--------------------------------
The `voidLabelWithLabelId` method returns an object that indicates the status of the void label request.
If you are using TypeScript, you can import the [`VoidLabelWithLabelIdTypes.Result`](https://github.com/ShipEngine/shipengine-js/blob/main/src/void-label-with-label-id/types/public.ts)
type into your project to take advantage of your IDE's code completion functionality.

Example
==============================
```javascript
const ShipEngine = require("shipengine");
const shipengine = new ShipEngine("api_key");

async function voidLabelWithLabelId() {
  try {
    const result = await shipengine.voidLabelWithLabelId("se-451990109");

    if (result.approved === true) {
      // Success!
      console.log("Successfully voided the label!");
      console.log(result);
   }
   else {
     // Error
     console.log("Unable to void the label");
     console.log(result);
   }
  } catch (e) {
    console.log("Error voiding the requested label: ", e.message);
  }
}

voidLabelWithLabelId();
```

Example Output
-----------------------------------------------------

### Successful Address Validation
```javascript
{
  approved: true,
  message: "Request for refund submitted.  This label has been voided."
}
```
