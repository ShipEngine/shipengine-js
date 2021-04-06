import { expect } from "chai";
import constants from "../../utils/constants";
import { InternalRpcClient } from "../../../src/shared/models/client/client";

describe("RPC Client test", () => {
  it("should return correct response if validation error!", async () => {
    const client = new InternalRpcClient(
      "MY_API_KEY",
      constants.isomorphicBaseUri
    );
    const response = await client.exec("client", {
      foo: "invalid-request",
    });

    response.onError((r) => {
      expect(r.message).to.eq("Invalid Request");
      expect(r.code).to.eq(-32600);
      expect(r).not.to.have.property("id");
    });
    response.onSuccess(() => {
      expect.fail("should fail.");
    });
  });
});
