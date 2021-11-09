import axios from "../axios";

async function SendRequest(url, method, payload, headers) {
  try {
    const { data } = await axios({
      method,
      url,
      data: payload,
      headers: headers || {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

export { SendRequest };
