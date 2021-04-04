import fetch from "node-fetch";
import uuid from "uuid";

export async function sendRequest(data: object, apiKey: string): Promise<any> {
  const requestData = {
    jsonrpc: "2.0",
    id: uuid.v4(),
    data,
  };

  try {
    const response = await fetch(process.env.HOST, {
      method: "POST",
      headers: { "API-KEY": apiKey },
      body: JSON.stringify(requestData),
    });
    return response;
  } catch (error) {
    return error;
  }
}
