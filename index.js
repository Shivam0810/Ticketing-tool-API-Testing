const axios = require("axios");

const mainCRMData = {
  VIN_NO: "89916490634626393163",
  ICCID: "89916490634626393163",
  UIN_NO: "ACON4IA202200079317",
  DEVICE_IMEI: "868274066912314",
  DEVICE_MAKE: "Accolade",
  DEVICE_MODEL: "ACON4NA",
  ENGINE_NO: "ENGINE_SR_N_30032103",
  REG_NUMBER: "PB09AZ2103",
  VEHICLE_OWNER_FIRST_NAME: "Shivam",
  VEHICLE_OWNER_MIDDLE_NAME: "Shivam",
  VEHICLE_OWNER_LAST_NAME: "Shivam",
  ADDRESS_LINE_1: "123",
  ADDRESS_LINE_2: "456",
  VEHICLE_OWNER_CITY: "Belgavi",
  VEHICLE_OWNER_DISTRICT: "Belgavi",
  VEHICLE_OWNER_STATE: "Karanataka",
  VEHICLE_OWNER_COUNTRY: "India",
  VEHICLE_OWNER_PINCODE: "411045",
  VEHICLE_OWNER_REGISTERED_MOBILE: "9156419214",
  DEALER_CODE: "1133",
  POS_CODE: "AB123",
  POA_DOC_NAME: "PANAB123",
  POA_DOC_NO: "PAN1AB123",
  POI_DOC_TYPE: "ADHARAB123",
  POI_DOC_NO: "ADHARXYZ123",
  RTO_OFFICE_CODE: "MH 12",
  RTO_STATE: "MH",
  PRIMARY_OPERATOR: "BSNL",
  PRIMARY_MOBILE_NUMBER: "1234567890",
  SECONDARY_OPERATOR: "BHA",
  SECONDARY_MOBILE_NUMBER: "9876543210",
  VEHICLE_MODEL: "NANO",
  COMMERCIAL_ACTIVATION_START_DATE: "2023-10-04",
  COMMERCIAL_ACTIVATION_EXPIRY_DATE: "",
  ACCOLADE_POSTING_DATE_TIME: "2023-10-04",
  MFG_YEAR: "2023",
  INVOICE_DATE: "2023-10-04",
};

const mainFEData = {
  VIN_NO: "89916555634626394163",
  ICCID: "89916490634626390375",
  REQUEST_TYPE: "New",
  CERTIFICATE_VALIDITY_DURATION_IN_YEAR: 2,
  RTO_STATE: "MAHARASHTRA",
  RTO_OFFICE_CODE: "MH01",
  VEHICLE_OWNER_REGISTERED_MOBILE: "999999999",
  VEHICLE_OWNER_NAME: "Rajesh Kumar",
  COMMERCIAL_ACTIVATION_START_DATE: "2023-06-01",
  COMMERCIAL_ACTIVATION_EXPIRY_DATE: "2025-06-01",
};

const mainTicketStatusData = {
  VIN_NO: "89916555634626391631",
  ICCID: "89916490634626390375",
  Ticket_No: "AEPL-240121-2",
};

const qaTokenRequestBody = { username: "accoladeCrm", password: "admin@123" };
const productionTokenRequestBody = {
  username: "accoladeCrm",
  password: "admin@123",
};
const mainTokenRequestBody = qaTokenRequestBody;

async function makeRequest(url, options) {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function dateGeneratorYYMMDD() {
  const today = new Date();

  const year = today.getFullYear() % 100;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  return formattedDate; // Output: YYMMDD
}

async function tokenGenerator(tokenRequestBody) {
  const tokenURL = "http://20.219.88.214:6109/api/crm/generateToken";
  const tokenHeaders = { "Content-Type": "application/json" };

  const tokenResponse = await makeRequest(tokenURL, {
    method: "POST",
    headers: tokenHeaders,
    body: JSON.stringify(tokenRequestBody),
  });
  return tokenResponse;
}

async function saveCRMDataAPI(headers, saveCRMDataRequestBody) {
  const saveCRMDataURL = "http://20.219.88.214:6109/api/crm/saveCrmData";

  const tokenResponse = await makeRequest(saveCRMDataURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(saveCRMDataRequestBody),
  });
  return tokenResponse;
}

async function saveFleetedgeDataAPI(headers, saveFleetedgeRequestBody) {
  const saveFleetedgeURL =
    "http://20.219.88.214:6109/api/crm/saveFleetedgeData";

  const fleetedgeResponse = await makeRequest(saveFleetedgeURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(saveFleetedgeRequestBody),
  });
  return fleetedgeResponse;
}

async function getTicketStatusAPI(headers, getTicketStatusRequestBody) {
  const getTicketStatusURL =
    "http://20.219.88.214:6109/api/crm/getTicketStatus";

  try {
    const ticketResponse = await axios.get(getTicketStatusURL, {
      headers: headers,
      data: getTicketStatusRequestBody,
    });
    return ticketResponse;
  } catch (error) {
    return error; // Handle error appropriately
  }
}

/*
 Test Cases for Generate Token API
 */

async function generateToken_ValidUsernameValidPassword_TokenGenerated() {
  let tokenRequestBody = mainTokenRequestBody;
  const tokenResponse = await tokenGenerator(tokenRequestBody);

  const responseData = await tokenResponse.json();
  const errors = [];

  // Assertions
  if (tokenResponse.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${tokenResponse.status}" expected "200"`
    );
  }
  if (tokenResponse.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${tokenResponse.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not True in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Token Generated") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Token Generated"`
    );
  }
  if (!responseData.token) {
    errors.push(`Token is not present in the response expected a Token`);
  }
  if (errors.length > 0) {
    console.log(
      "Test generateToken_ValidUsernamePassword_TokenGenerated: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test generateToken_ValidUsernamePassword_TokenGenerated: PASS"
    );
  }
}

async function generateToken_InvalidUsernameInvalidPassword_TokenNotGenerated() {
  let tokenRequestBody = JSON.parse(JSON.stringify(mainTokenRequestBody));
  tokenRequestBody.username = "invalid username";
  tokenRequestBody.password = "invalid password";
  const tokenResponse = await tokenGenerator(tokenRequestBody);
  const responseData = await tokenResponse.json();
  const errors = [];

  // Assertions
  if (tokenResponse.status !== 500) {
    errors.push(
      `Response status is not 500 in the response. Response Status: "${tokenResponse.status}" expected "500"`
    );
  }
  if (tokenResponse.statusText !== "Internal Server Error") {
    errors.push(
      `Response status text is not Internal Server Error in the response. Response Status: "${tokenResponse.statusText}" expected "Internal Server Error"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not False in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (responseData.message !== "Invalid User") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Invalid User"`
    );
  }
  if (responseData.token) {
    errors.push(`Token should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test generateToken_InvalidUsernameInvalidPassword_TokenNotGenerated: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test generateToken_InvalidUsernameInvalidPassword_TokenNotGenerated: PASS"
    );
  }
}

async function generateToken_MissingPassword_TokenNotGenerated() {
  let tokenRequestBody = {
    username: "accoladeCrm",
  };
  const tokenResponse = await tokenGenerator(tokenRequestBody);
  const responseData = await tokenResponse.json();
  const errors = [];

  // Assertions
  if (tokenResponse.status !== 500) {
    errors.push(
      `Response status is not 500 in the response. Response Status: "${tokenResponse.status}" expected "500"`
    );
  }
  if (tokenResponse.statusText !== "Internal Server Error") {
    errors.push(
      `Response status text is not Internal Server Error in the response. Response Status: "${tokenResponse.statusText}" expected "Internal Server Error"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not False in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (
    responseData.message !==
    "The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined"
  ) {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined"`
    );
  }
  if (responseData.token) {
    errors.push(`Token should not be present in the response`);
  }
  if (!responseData.data.length === 0) {
    errors.push(`Data should empty in the response`);
  }
  if (errors.length > 0) {
    console.log("Test generateToken_MissingPassword_TokenNotGenerated: FAIL");
    console.log("\tErrors: ", errors);
  } else {
    console.log("Test generateToken_MissingPassword_TokenNotGenerated: PASS");
  }
}

async function generateToken_MissingUsername_TokenNotGenerated() {
  const tokenRequestBody = { password: "admin123" };
  const tokenResponse = await tokenGenerator(tokenRequestBody);
  const responseData = await tokenResponse.json();
  const errors = [];

  // Assertions
  if (tokenResponse.status !== 500) {
    errors.push(
      `Response status is not 500 in the response. Response Status: "${tokenResponse.status}" expected "500"`
    );
  }
  if (tokenResponse.statusText !== "Internal Server Error") {
    errors.push(
      `Response status text is not Internal Server Error in the response. Response Status: "${tokenResponse.statusText}" expected "Internal Server Error"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not False in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (responseData.message !== "Invalid User") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Invalid User"`
    );
  }
  if (responseData.token) {
    errors.push(`Token should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log("Test generateToken_MissingUsername_TokenNotGenerated: FAIL");
    console.log("\tErrors: ", errors);
  } else {
    console.log("Test generateToken_MissingUsername_TokenNotGenerated: PASS");
  }
}

/*
 Test Cases for Save CRM Data API
 */

async function saveCrmData_ValidData_ValidToken_DataSavedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== true) {
      errors.push(
        `Data status is not true in the responseData. Response Status: "${responseData.data[0].status}" expected "true"`
      );
    }
    if (responseData.data[0].message !== "Data saved Successfully") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data saved Successfully"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length !== 0) {
      errors.push(`Validation Error should be present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidData_ValidToken_DataSavedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidData_ValidToken_DataSavedSuccessfully: PASS"
    );
  }
}

async function saveCrmData_ValidData_InvalidToken_UnauthorizedAccess() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: "token",
  };

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 401) {
    errors.push(
      `Response status is not 401 in the response. Response Status: "${response.status}" expected "401"`
    );
  }
  if (response.statusText !== "Unauthorized") {
    errors.push(
      `Response status text is not Unauthorized in the response. Response Status: "${response.statusText}" expected "Unauthorized"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "unauthorized-access") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "unauthorized-access"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidData_InvalidToken_UnauthorizedAccess: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidData_InvalidToken_UnauthorizedAccess: PASS"
    );
  }
}

async function saveCrmData_ValidData_MissingToken_PleasePassToken() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
  };

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.status}" expected "400"`
    );
  }
  if (response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "Please pass token") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Please pass token"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidData_MissingToken_PleasePassToken: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidData_MissingToken_PleasePassToken: PASS"
    );
  }
}

async function saveCrmData_EmptyList_ValidToken_DataFetchedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  const saveCRMDataRequestBody = [];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.status}" expected "400"`
    );
  }

  if (response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (responseData.message !== "No data provided") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "No data provided"`
    );
  }
  if (!responseData.data) {
    errors.push(`Data should be present in the response`);
  } else if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_EmptyList_ValidToken_DataFetchedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_EmptyList_ValidToken_DataFetchedSuccessfully: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "";
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_01") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== "") {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: ""`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_01") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ICCID_Empty_ERR_02() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "";
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_02") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ICCID_Empty_ERR_02: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ICCID_Empty_ERR_02: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ICCID_Missing_ERR_02() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "";
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.ICCID;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_02") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ICCID_Missing_ERR_02: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ICCID_Missing_ERR_02: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_UIN_NO_Empty_ERR_03() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = "";
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_03") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_UIN_NO_Empty_ERR_03: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_UIN_NO_Empty_ERR_03: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_UIN_NO_Missing_ERR_03() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = "";
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.UIN_NO;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_03") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_UIN_NO_Missing_ERR_03: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_UIN_NO_Missing_ERR_03: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Empty_ERR_04() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = "";

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_04") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Empty_ERR_04: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Empty_ERR_04: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Missing_ERR_04() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = "";

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.DEVICE_IMEI;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }

    if (responseData.data[0].VALIDATION_ERROR[0] !== "ERR_04") {
      errors.push(`Validation Error For VIN_No not present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Missing_ERR_04: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Missing_ERR_04: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Empty_ERR_05() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.DEVICE_MAKE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (
        !(
          responseData.data[0].VALIDATION_ERROR.length === 1 &&
          responseData.data[0].VALIDATION_ERROR.includes("ERR_05")
        )
      ) {
        errors.push(
          `Validation Error For DEVICE_MAKE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_05".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Empty_ERR_05: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Empty_ERR_05: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Missing_ERR_05() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.DEVICE_MAKE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (
        !(
          responseData.data[0].VALIDATION_ERROR.length === 1 &&
          responseData.data[0].VALIDATION_ERROR.includes("ERR_05")
        )
      ) {
        errors.push(
          `Validation Error For DEVICE_MAKE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_05".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Missing_ERR_05: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Missing_ERR_05: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MAKE_ERR_06() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.DEVICE_MAKE = "AA";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }
    if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_06")) {
      errors.push(
        `Validation Error For DEVICE_MAKE not present in the response`
      );
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MAKE_ERR_06: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MAKE_ERR_06: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Empty_ERR_07() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.DEVICE_MODEL = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (
        !(
          responseData.data[0].VALIDATION_ERROR.length === 1 &&
          responseData.data[0].VALIDATION_ERROR.includes("ERR_07")
        )
      ) {
        errors.push(
          `Validation Error For DEVICE_MODEL not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_07".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Empty_ERR_07: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Empty_ERR_07: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Missing_ERR_07() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.DEVICE_MODEL;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (
        !(
          responseData.data[0].VALIDATION_ERROR.length === 1 &&
          responseData.data[0].VALIDATION_ERROR.includes("ERR_07")
        )
      ) {
        errors.push(
          `Validation Error For DEVICE_MODEL not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_07".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Missing_ERR_07: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Missing_ERR_07: PASS"
    );
  }
}

async function saveCrmData_ValidToken_ValidData_Valid_DEVICE_MODEL_DataSavedSuccessfully() {
  let deviceModelList = [
    "ACONITS140",
    "ACONITS140A",
    "ACONITS140G",
    "ACONITS140I",
    "ACON4IA",
    "ACON4CA",
    "ACON4IE",
    "AEPL051401",
    "AEPL051400",
    "ACON4NA",
    "ACON4TA",
    "ACON4PA",
  ];
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);
  const errors = [];

  await Promise.all(
    deviceModelList.map(async (deviceModel) => {
      let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
      saveCRMData.VIN_NO = VIN_NO;
      saveCRMData.ICCID = ICCID;
      saveCRMData.UIN_NO = UIN_NO;
      saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
      saveCRMData.DEVICE_MODEL = deviceModel;

      const saveCRMDataRequestBody = [saveCRMData];
      const response = await saveCRMDataAPI(
        saveCRMDataHeaders,
        saveCRMDataRequestBody
      );

      const responseData = await response.json();

      // Assertions
      if (response.status !== 200) {
        errors.push(
          `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
        );
      }

      if (response.statusText !== "OK") {
        errors.push(
          `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
        );
      }
      if (responseData.status !== true) {
        errors.push(
          `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
        );
      }
      if (responseData.message !== "Data fetched successfully") {
        errors.push(
          `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
        );
      }
      if (responseData.data.length === 0) {
        errors.push(
          `Data response should be present in the response for Device Model ${deviceModel}`
        );
      } else {
        if (responseData.data[0].VIN_NO !== VIN_NO) {
          errors.push(
            `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
          );
        }
        if (responseData.data[0].ICCID !== ICCID) {
          errors.push(
            `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
          );
        }
        if (responseData.data[0].UIN_NO !== UIN_NO) {
          errors.push(
            `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
          );
        }
        if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
          errors.push(
            `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
          );
        }
        if (responseData.data[0].status !== true) {
          errors.push(
            `Data status is not true in the responseData for Device Model ${deviceModel}. Response Status: "${responseData.data[0].status}" expected "true"`
          );
        }
        if (responseData.data[0].message !== "Data saved Successfully") {
          errors.push(
            `Unexpected message in the response for Device Model ${deviceModel}: "${responseData.data[0].message}" expected "Data saved Successfully"`
          );
        }
        if (responseData.data[0] && responseData.data[0].VALIDATION_ERROR) {
          // Your existing validation logic for VALIDATION_ERROR
          console.log("VALIDATION_ERROR");
          if (!responseData.data[0].VALIDATION_ERROR.length === 0) {
            errors.push(
              `Validation Error should not be present For DEVICE_MODEL "${deviceModel}" in the response`
            );
          }
        } else {
          errors.push(`Validation Error part missing in the response`);
        }
      }
    })
  );

  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_Valid_DEVICE_MODEL_DataSavedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_Valid_DEVICE_MODEL_DataSavedSuccessfully: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MODEL_ERR_08() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);
  const errors = [];

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.DEVICE_MODEL = "aa";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    }
    if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_08")) {
      errors.push(
        `Validation Error For DEVICE_MODEL not present in the response`
      );
    }
  }

  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MODEL_ERR_08: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MODEL_ERR_08: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ENGINE_NO_Empty_ERR_10() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.ENGINE_NO = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_10")) {
        errors.push(
          `Validation Error For ENGINE_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_10".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ENGINE_NO_Empty_ERR_10: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ENGINE_NO_Empty_ERR_10: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ENGINE_NO_Missing_ERR_10() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.ENGINE_NO;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_10")) {
        errors.push(
          `Validation Error For ENGINE_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_10".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ENGINE_NO_Missing_ERR_10: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ENGINE_NO_Missing_ERR_10: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_REG_NUMBER_Empty_ERR_11() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.REG_NUMBER = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_11")) {
        errors.push(
          `Validation Error For REG_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_11".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_REG_NUMBER_Empty_ERR_11: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_REG_NUMBER_Empty_ERR_11: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_REG_NUMBER_Missing_ERR_11() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.REG_NUMBER;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_11")) {
        errors.push(
          `Validation Error For REG_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_11".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_REG_NUMBER_Missing_ERR_11: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_REG_NUMBER_Missing_ERR_11: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Empty_ERR_13() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_OWNER_LAST_NAME = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_13")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_LAST_NAME not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_13".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Empty_ERR_13: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Empty_ERR_13: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Missing_ERR_13() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.VEHICLE_OWNER_LAST_NAME;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_13")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_LAST_NAME not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_13".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Missing_ERR_13: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Missing_ERR_13: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Empty_ERR_14() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.ADDRESS_LINE_1 = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_14")) {
        errors.push(
          `Validation Error For ADDRESS_LINE_1 not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_14".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Empty_ERR_14: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Empty_ERR_14: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Missing_ERR_14() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.ADDRESS_LINE_1;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_14")) {
        errors.push(
          `Validation Error For ADDRESS_LINE_1 not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_14".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Missing_ERR_14: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Missing_ERR_14: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Empty_ERR_15() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_OWNER_CITY = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_15")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_CITY not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_15".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Empty_ERR_15: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Empty_ERR_15: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Missing_ERR_15() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.VEHICLE_OWNER_CITY;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_15")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_CITY not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_15".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Missing_ERR_15: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Missing_ERR_15: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Empty_ERR_16() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_OWNER_REGISTERED_MOBILE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_16")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_REGISTERED_MOBILE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_16".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Empty_ERR_16: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Empty_ERR_16: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Missing_ERR_16() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.VEHICLE_OWNER_REGISTERED_MOBILE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_16")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_REGISTERED_MOBILE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_16".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Missing_ERR_16: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Missing_ERR_16: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Non_Numeric_ERR_17() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_OWNER_REGISTERED_MOBILE = "asdasd";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_17")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_REGISTERED_MOBILE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_17".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Non_Numeric_ERR_17: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Non_Numeric_ERR_17: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Length_Equal_10_ERR_18() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_OWNER_REGISTERED_MOBILE = "91584221801";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_18")) {
        errors.push(
          `Validation Error For VEHICLE_OWNER_REGISTERED_MOBILE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_18".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Length_Equal_10_ERR_18: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Length_Equal_10_ERR_18: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEALER_CODE_Empty_ERR_19() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.DEALER_CODE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_19")) {
        errors.push(
          `Validation Error For DEALER_CODE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_19".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEALER_CODE_Empty_ERR_19: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEALER_CODE_Empty_ERR_19: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_DEALER_CODE_Missing_ERR_19() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.DEALER_CODE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_19")) {
        errors.push(
          `Validation Error For DEALER_CODE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_19".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEALER_CODE_Missing_ERR_19: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_DEALER_CODE_Missing_ERR_19: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Empty_ERR_20() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.POA_DOC_NAME = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_20")) {
        errors.push(
          `Validation Error For POA_DOC_NAME not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_20".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Empty_ERR_20: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Empty_ERR_20: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Missing_ERR_20() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.POA_DOC_NAME;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_20")) {
        errors.push(
          `Validation Error For POA_DOC_NAME not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_20".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Missing_ERR_20: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Missing_ERR_20: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Empty_ERR_21() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.POA_DOC_NO = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_21")) {
        errors.push(
          `Validation Error For POA_DOC_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_21".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Empty_ERR_21: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Empty_ERR_21: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Missing_ERR_21() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.POA_DOC_NO;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_21")) {
        errors.push(
          `Validation Error For POA_DOC_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_21".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Missing_ERR_21: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Missing_ERR_21: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Empty_ERR_22() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.POI_DOC_TYPE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_22")) {
        errors.push(
          `Validation Error For POI_DOC_TYPE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_22".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Empty_ERR_22: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Empty_ERR_22: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Missing_ERR_22() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.POI_DOC_TYPE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_22")) {
        errors.push(
          `Validation Error For POI_DOC_TYPE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_22".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Missing_ERR_22: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Missing_ERR_22: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Empty_ERR_23() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.POI_DOC_NO = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_23")) {
        errors.push(
          `Validation Error For POI_DOC_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_23".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Empty_ERR_23: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Empty_ERR_23: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Missing_ERR_23() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.POI_DOC_NO;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_23")) {
        errors.push(
          `Validation Error For POI_DOC_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_23".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Missing_ERR_23: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Missing_ERR_23: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Empty_ERR_24() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.RTO_OFFICE_CODE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_24")) {
        errors.push(
          `Validation Error For RTO_OFFICE_CODE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_24".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Empty_ERR_24: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Empty_ERR_24: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Missing_ERR_24() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.RTO_OFFICE_CODE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_24")) {
        errors.push(
          `Validation Error For RTO_OFFICE_CODE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_24".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Missing_ERR_24: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Missing_ERR_24: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_RTO_STATE_Empty_ERR_25() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.RTO_STATE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_25")) {
        errors.push(
          `Validation Error For RTO_STATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_25".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_STATE_Empty_ERR_25: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_STATE_Empty_ERR_25: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_RTO_STATE_Missing_ERR_25() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.RTO_STATE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_25")) {
        errors.push(
          `Validation Error For RTO_STATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_25".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_STATE_Missing_ERR_25: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_RTO_STATE_Missing_ERR_25: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Empty_ERR_27() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.PRIMARY_OPERATOR = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_27")) {
        errors.push(
          `Validation Error For PRIMARY_OPERATOR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_27".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Empty_ERR_27: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Empty_ERR_27: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Missing_ERR_27() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.PRIMARY_OPERATOR;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_27")) {
        errors.push(
          `Validation Error For PRIMARY_OPERATOR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_27".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Missing_ERR_27: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Missing_ERR_27: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Empty_ERR_28() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.PRIMARY_MOBILE_NUMBER = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_28")) {
        errors.push(
          `Validation Error For PRIMARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_28".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Empty_ERR_28: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Empty_ERR_28: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Missing_ERR_28() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.PRIMARY_MOBILE_NUMBER;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_28")) {
        errors.push(
          `Validation Error For PRIMARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_28".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Missing_ERR_28: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Missing_ERR_28: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Non_Numeric_ERR_29() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.PRIMARY_MOBILE_NUMBER = "asd";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_29")) {
        errors.push(
          `Validation Error For PRIMARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_29".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Non_Numeric_ERR_29: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Non_Numeric_ERR_29: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Less_Than_15_ERR_30() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.PRIMARY_MOBILE_NUMBER = "1234567890123456";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_30")) {
        errors.push(
          `Validation Error For PRIMARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_30".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Less_Than_15_ERR_30: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Less_Than_15_ERR_30: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Empty_ERR_31() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.SECONDARY_OPERATOR = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_31")) {
        errors.push(
          `Validation Error For SECONDARY_OPERATOR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_31".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Empty_ERR_31: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Empty_ERR_31: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Missing_ERR_31() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.SECONDARY_OPERATOR;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_31")) {
        errors.push(
          `Validation Error For SECONDARY_OPERATOR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_31".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Missing_ERR_31: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Missing_ERR_31: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Less_Than_15_ERR_32() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.SECONDARY_MOBILE_NUMBER = "1234567890123456";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_32")) {
        errors.push(
          `Validation Error For SECONDARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_32".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Less_Than_15_ERR_32: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Less_Than_15_ERR_32: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Non_Numeric_ERR_33() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.SECONDARY_MOBILE_NUMBER = "asd";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_33")) {
        errors.push(
          `Validation Error For SECONDARY_MOBILE_NUMBER not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_33".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Non_Numeric_ERR_33: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Non_Numeric_ERR_33: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Empty_ERR_34() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.VEHICLE_MODEL = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_34")) {
        errors.push(
          `Validation Error For VEHICLE_MODEL not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_34".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Empty_ERR_34: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Empty_ERR_34: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Missing_ERR_34() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.VEHICLE_MODEL;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_34")) {
        errors.push(
          `Validation Error For VEHICLE_MODEL not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_34".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Missing_ERR_34: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Missing_ERR_34: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Empty_ERR_35() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.COMMERCIAL_ACTIVATION_START_DATE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_35")) {
        errors.push(
          `Validation Error For COMMERCIAL_ACTIVATION_START_DATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_35".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Empty_ERR_35: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Empty_ERR_35: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Missing_ERR_35() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.COMMERCIAL_ACTIVATION_START_DATE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_35")) {
        errors.push(
          `Validation Error For COMMERCIAL_ACTIVATION_START_DATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_35".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Missing_ERR_35: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Missing_ERR_35: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_MFG_YEAR_Empty_ERR_38() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.MFG_YEAR = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_38")) {
        errors.push(
          `Validation Error For MFG_YEAR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_38".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_MFG_YEAR_Empty_ERR_38: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_MFG_YEAR_Empty_ERR_38: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_MFG_YEAR_Missing_ERR_38() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.MFG_YEAR;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_38")) {
        errors.push(
          `Validation Error For MFG_YEAR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_38".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_MFG_YEAR_Missing_ERR_38: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_MFG_YEAR_Missing_ERR_38: PASS"
    );
  }
}

async function saveCrmData_ValidToken_ValidData_DUPLICATE_DATA_ERR_39() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "DUPLICATE_DATA_VIN_NO";
  let ICCID = "DUPLICATE_DATA_ICCID";
  let UIN_NO = "DUPLICATE_DATA_UIN_NO";
  let DEVICE_IMEI = "DUPLICATE_DATA_DEVICE_IMEI";

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  await saveCRMDataAPI(saveCRMDataHeaders, saveCRMDataRequestBody);
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Duplicate Details") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Duplicate Details"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_39")) {
        errors.push(
          `Validation Error For MFG_YEAR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_39".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_DUPLICATE_DATA_ERR_39: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_DUPLICATE_DATA_ERR_39: PASS"
    );
  }
}

async function saveCrmData_ValidToken_ValidData_Change_Request_After_Stage_2_ERR_40() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "12985475";
  let ICCID = "89916490634626389138";
  let UIN_NO = "ACON4NA202200089462";
  let DEVICE_IMEI = "868274066889462";

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  await saveCRMDataAPI(saveCRMDataHeaders, saveCRMDataRequestBody);
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_40")) {
        errors.push(
          `Validation Error For MFG_YEAR not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_40".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_Change_Request_After_Stage_2_ERR_40: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_ValidData_Change_Request_After_Stage_2_ERR_40: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Empty_ERR_41() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;
  saveCRMData.INVOICE_DATE = "";

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_41")) {
        errors.push(
          `Validation Error For INVOICE_DATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_41".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Empty_ERR_41: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Empty_ERR_41: PASS"
    );
  }
}

async function saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Missing_ERR_41() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveCRMDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = generateRandomString(20);
  let UIN_NO = generateRandomString(19);
  let DEVICE_IMEI = generateRandomString(15);

  let saveCRMData = JSON.parse(JSON.stringify(mainCRMData));
  delete saveCRMData.INVOICE_DATE;
  saveCRMData.VIN_NO = VIN_NO;
  saveCRMData.ICCID = ICCID;
  saveCRMData.UIN_NO = UIN_NO;
  saveCRMData.DEVICE_IMEI = DEVICE_IMEI;

  const saveCRMDataRequestBody = [saveCRMData];
  const response = await saveCRMDataAPI(
    saveCRMDataHeaders,
    saveCRMDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== UIN_NO) {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "${UIN_NO}"`
      );
    }
    if (responseData.data[0].DEVICE_IMEI !== DEVICE_IMEI) {
      errors.push(
        `DEVICE_IMEI doesn't match. DEVICE_IMEI got: "${responseData.data[0].DEVICE_IMEI}" Expected DEVICE_IMEI: "${DEVICE_IMEI}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_41")) {
        errors.push(
          `Validation Error For INVOICE_DATE not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_41".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Missing_ERR_41: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Missing_ERR_41: PASS"
    );
  }
}

/*
 Test Cases for Save Fleet Edge Data API
 */

async function saveFleetedgeData_ValidData_ValidToken_DataSavedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }
  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== true) {
      errors.push(
        `Data status is not true in the responseData. Response Status: "${responseData.data[0].status}" expected "true"`
      );
    }
    if (responseData.data[0].message !== "Data saved Successfully") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data saved Successfully"`
      );
    }
    if (!responseData.data[0].Ticket_No) {
      errors.push(`Ticket Number should be present in the response."`);
    } else {
      let ticketNo = responseData.data[0].Ticket_No;
      let [heading, date, index] = ticketNo.split("-");
      if (!heading) {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number Header missing`
        );
      } else if (heading != "AEPL") {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number Header got: "${heading}" expected "AEPL"`
        );
      }
      if (!index) {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number Index missing`
        );
      } else if (Number(index) <= 0) {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number index got: "${index}"`
        );
      }
      if (!date) {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number Date missing`
        );
      } else if (date !== dateGeneratorYYMMDD()) {
        errors.push(
          `Ticket Number does not follow the nomenclature guidelines. Ticket Number Header got: "${date}" expected "${dateGeneratorYYMMDD()}"`
        );
      }
    }

    if (responseData.data[0].VALIDATION_ERROR.length !== 0) {
      errors.push(`Validation Error should be present in the response`);
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidData_ValidToken_DataSavedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidData_ValidToken_DataSavedSuccessfully: PASS"
    );
  }
}

async function saveFleetedgeData_ValidData_InvalidToken_UnauthorizedAccess() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: "token",
  };

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 401) {
    errors.push(
      `Response status is not 401 in the response. Response Status: "${response.status}" expected "401"`
    );
  }
  if (response.statusText !== "Unauthorized") {
    errors.push(
      `Response status text is not Unauthorized in the response. Response Status: "${response.statusText}" expected "Unauthorized"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "unauthorized-access") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "unauthorized-access"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidData_InvalidToken_UnauthorizedAccess: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidData_InvalidToken_UnauthorizedAccess: PASS"
    );
  }
}

async function saveFleetedgeData_ValidData_MissingToken_PleasePassToken() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
  };

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.status}" expected "400"`
    );
  }
  if (response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "Please pass token") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Please pass token"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidData_MissingToken_PleasePassToken: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidData_MissingToken_PleasePassToken: PASS"
    );
  }
}

async function saveFleetedgeData_EmptyList_ValidToken_DataFetchedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  const saveFleetedgeDataRequestBody = [];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.status}" expected "400"`
    );
  }

  if (response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (responseData.message !== "No data provided") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "No data provided"`
    );
  }
  if (!responseData.data) {
    errors.push(`Data should be present in the response`);
  } else if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_EmptyList_ValidToken_DataFetchedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_EmptyList_ValidToken_DataFetchedSuccessfully: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "";
  let ICCID = generateRandomString(20);

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_01")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_01".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "";
  let ICCID = generateRandomString(20);

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  delete saveFleetedgeData.VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_01")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_01".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Not_Present_ERR_02() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_02")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_02".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Not_Present_ERR_02: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Not_Present_ERR_02: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_ICCID_Empty_ERR_03() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_03")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_03".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Empty_ERR_03: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Empty_ERR_03: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_ICCID_Missing_ERR_03() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  delete saveFleetedgeData.ICCID;
  saveFleetedgeData.VIN_NO = VIN_NO;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_03")) {
        errors.push(
          `Validation Error For ICCID not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_03".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Missing_ERR_03: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Missing_ERR_03: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_ICCID_Not_Present_ERR_04() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390373";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_04")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_04".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Not_Present_ERR_04: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_ICCID_Not_Present_ERR_04: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Empty_ERR_07() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;
  saveFleetedgeData.REQUEST_TYPE = "";

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_07")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_07".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Empty_ERR_07: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Empty_ERR_07: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Missing_ERR_07() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  delete saveFleetedgeData.REQUEST_TYPE;
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_07")) {
        errors.push(
          `Validation Error For ICCID not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_07".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Missing_ERR_07: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Missing_ERR_07: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Empty_ERR_08() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;
  saveFleetedgeData.CERTIFICATE_VALIDITY_DURATION_IN_YEAR = "";

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_08")) {
        errors.push(
          `Validation Error For VIN_NO not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_08".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Empty_ERR_08: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Empty_ERR_08: PASS"
    );
  }
}

async function saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Missing_ERR_08() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const saveFleetedgeDataHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = generateRandomString(17);
  let ICCID = "89916490634626390375";

  let saveFleetedgeData = JSON.parse(JSON.stringify(mainFEData));
  delete saveFleetedgeData.CERTIFICATE_VALIDITY_DURATION_IN_YEAR;
  saveFleetedgeData.VIN_NO = VIN_NO;
  saveFleetedgeData.ICCID = ICCID;

  const saveFleetedgeDataRequestBody = [saveFleetedgeData];
  const response = await saveFleetedgeDataAPI(
    saveFleetedgeDataHeaders,
    saveFleetedgeDataRequestBody
  );
  const errors = [];

  const responseData = await response.json();

  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }

  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data Fetched Successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data Fetched Successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].status !== false) {
      errors.push(
        `Data status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
      );
    }
    if (responseData.data[0].message !== "Data not saved") {
      errors.push(
        `Unexpected message in the response: "${responseData.data[0].message}" expected "Data not saved"`
      );
    }
    if (responseData.data[0].VALIDATION_ERROR.length === 0) {
      errors.push(`Validation Error should be present in the response`);
    } else {
      if (!responseData.data[0].VALIDATION_ERROR.includes("ERR_08")) {
        errors.push(
          `Validation Error For ICCID not present or not up to mark in the response. Got "${responseData.data[0].VALIDATION_ERROR}". Expected: "ERR_08".`
        );
      }
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Missing_ERR_08: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Missing_ERR_08: PASS"
    );
  }
}

/*
 Test Cases for Get Ticket Status API
 */

async function getTicketStatus_ValidData_ValidToken_DataFetchedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const getTicketStatusHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  let VIN_NO = "89916555634626391631";
  let ICCID = "89916490634626390375";
  let Ticket_No = "AEPL-240121-2";

  let getTicketStatus = JSON.parse(JSON.stringify(mainTicketStatusData));
  getTicketStatus.VIN_NO = VIN_NO;
  getTicketStatus.ICCID = ICCID;
  getTicketStatus.Ticket_No = Ticket_No;

  const getTicketStatusRequestBody = [getTicketStatus];
  const response = await getTicketStatusAPI(
    getTicketStatusHeaders,
    getTicketStatusRequestBody
  );
  const errors = [];

  const responseData = response.data;
  // Assertions
  if (response.status !== 200) {
    errors.push(
      `Response status is not 200 in the response. Response Status: "${response.status}" expected "200"`
    );
  }
  if (response.statusText !== "OK") {
    errors.push(
      `Response status text is not OK in the response. Response Status: "${response.statusText}" expected "OK"`
    );
  }
  if (responseData.status !== true) {
    errors.push(
      `Status is not true in the responseData. Response Status: "${responseData.status}" expected "true"`
    );
  }
  if (responseData.message !== "Data fetched successfully") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Data fetched successfully"`
    );
  }
  if (responseData.data.length === 0) {
    errors.push(`Data response should be present in the response`);
  } else {
    if (responseData.data[0].Ticket_Handler !== "Shivani Bhosale") {
      errors.push(
        `Ticket_Handler doesn't match. Ticket_Handler got: "${responseData.data[0].Ticket_Handler}" Expected Ticket_Handler: "Shivani Bhosale"`
      );
    }
    if (responseData.data[0].Ticket_No !== Ticket_No) {
      errors.push(
        `Ticket_No doesn't match. Ticket_No got: "${responseData.data[0].Ticket_No}" Expected Ticket_No: Ticket_No`
      );
    }
    if (responseData.data[0].Ticket_Stage !== "Stage 1") {
      errors.push(
        `Ticket_Stage doesn't match. Ticket_Stage got: "${responseData.data[0].Ticket_Stage}" Expected Ticket_Stage: "Stage 1"`
      );
    }
    if (responseData.data[0].Ticket_Activity !== "FOTA / OTA  Activities") {
      errors.push(
        `Ticket_Activity doesn't match. Ticket_Activity got: "${responseData.data[0].Ticket_Activity}" Expected Ticket_Activity: "FOTA / OTA  Activities"`
      );
    }
    if (responseData.data[0].Ticket_Status !== "STS_CO_02") {
      errors.push(
        `Ticket_Status doesn't match. Ticket_Status got: "${responseData.data[0].Ticket_Status}" Expected Ticket_Status: "STS_CO_02"`
      );
    }
    if (responseData.data[0].Ticket_Remark !== "") {
      errors.push(
        `Ticket_Remark doesn't match. Ticket_Remark got: "${responseData.data[0].Ticket_Remark}" Expected Ticket_Remark: ""`
      );
    }
    if (responseData.data[0].VIN_NO !== VIN_NO) {
      errors.push(
        `VIN_NO doesn't match. VIN_NO got: "${responseData.data[0].VIN_NO}" Expected VIN_NO: "${VIN_NO}"`
      );
    }
    if (responseData.data[0].ICCID !== ICCID) {
      errors.push(
        `ICCID doesn't match. ICCID got: "${responseData.data[0].ICCID}" Expected ICCID: "${ICCID}"`
      );
    }
    if (responseData.data[0].UIN_NO !== "ACON4NA202200089462") {
      errors.push(
        `UIN_NO doesn't match. UIN_NO got: "${responseData.data[0].UIN_NO}" Expected UIN_NO: "ACON4NA202200089462"`
      );
    }
    if (responseData.data[0].RTO_STATE !== "MH") {
      errors.push(
        `RTO_STATE doesn't match. RTO_STATE got: "${responseData.data[0].RTO_STATE}" Expected RTO_STATE: "MH"`
      );
    }
    if (responseData.data[0].RTO_OFFICE_CODE !== "MH 12") {
      errors.push(
        `RTO_OFFICE_CODE doesn't match. RTO_OFFICE_CODE got: "${responseData.data[0].RTO_OFFICE_CODE}" Expected RTO_OFFICE_CODE: "MH 12"`
      );
    }
    if (responseData.data[0].Process_End_Date_and_Time !== "") {
      errors.push(
        `Process_End_Date_and_Time doesn't match. Process_End_Date_and_Time got: "${responseData.data[0].Process_End_Date_and_Time}" Expected Process_End_Date_and_Time: ""`
      );
    }
    if (responseData.data[0].Certification_Registration_Date_and_Time !== "") {
      errors.push(
        `Certification_Registration_Date_and_Time doesn't match. Certification_Registration_Date_and_Time got: "${responseData.data[0].Certification_Registration_Date_and_Time}" Expected Certification_Registration_Date_and_Time: ""`
      );
    }
    if (responseData.data[0].Certification_Expiry_Date !== "") {
      errors.push(
        `Certification_Expiry_Date doesn't match. Certification_Expiry_Date got: "${responseData.data[0].Certification_Expiry_Date}" Expected Certification_Expiry_Date: ""`
      );
    }
    if (responseData.data[0].Certificate_File_Location !== "") {
      errors.push(
        `Certificate_File_Location doesn't match. Certificate_File_Location got: "${responseData.data[0].Certificate_File_Location}" Expected Certificate_File_Location: ""`
      );
    }
    if (responseData.data[0].Certificate_File_Names.length !== 0) {
      errors.push(
        `Certificate_File_Names doesn't match. Certificate_File_Names got: "${responseData.data[0].Certificate_File_Names}" Expected Certificate_File_Names: ""`
      );
    }
  }
  if (errors.length > 0) {
    console.log(
      "Test getTicketStatus_ValidData_ValidToken_DataSavedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test getTicketStatus_ValidData_ValidToken_DataSavedSuccessfully: PASS"
    );
  }
}

async function getTicketStatus_ValidData_InvalidToken_UnauthorizedAccess() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const getTicketStatusHeaders = {
    "Content-Type": "application/json",
    token: "token",
  };

  let getTicketStatus = JSON.parse(JSON.stringify(mainFEData));

  const getTicketStatusRequestBody = [getTicketStatus];
  const errorResponse = await getTicketStatusAPI(
    getTicketStatusHeaders,
    getTicketStatusRequestBody
  );
  const errors = [];
  let response = errorResponse.response;

  const responseData = await response.data;
  // Assertions
  if (response.status !== 401) {
    errors.push(
      `Response status is not 401 in the response. Response Status: "${response.status}" expected "401"`
    );
  }
  if (response.statusText !== "Unauthorized") {
    errors.push(
      `Response status text is not Unauthorized in the response. Response Status: "${response.statusText}" expected "Unauthorized"`
    );
  }

  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "unauthorized-access") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "unauthorized-access"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test getTicketStatus_ValidData_InvalidToken_UnauthorizedAccess: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test getTicketStatus_ValidData_InvalidToken_UnauthorizedAccess: PASS"
    );
  }
}

async function getTicketStatus_ValidData_MissingToken_PleasePassToken() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const getTicketStatusHeaders = {
    "Content-Type": "application/json",
  };

  let getTicketStatus = JSON.parse(JSON.stringify(mainFEData));

  const getTicketStatusRequestBody = [getTicketStatus];
  const response = await getTicketStatusAPI(
    getTicketStatusHeaders,
    getTicketStatusRequestBody
  );
  const errors = [];

  const responseData = await response.response.data;

  // Assertions
  if (response.response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.response.status}" expected "400"`
    );
  }
  if (response.response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }

  if (responseData.message !== "Please pass token") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "Please pass token"`
    );
  }
  if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test getTicketStatus_ValidData_MissingToken_PleasePassToken: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test getTicketStatus_ValidData_MissingToken_PleasePassToken: PASS"
    );
  }
}

async function getTicketStatus_EmptyList_ValidToken_DataFetchedSuccessfully() {
  const tokenResponse = await tokenGenerator(mainTokenRequestBody);
  const tokenResponseData = await tokenResponse.json();
  const token = tokenResponseData.token;
  const getTicketStatusHeaders = {
    "Content-Type": "application/json",
    token: token,
  };

  const getTicketStatusRequestBody = [];
  const errorResponse = await getTicketStatusAPI(
    getTicketStatusHeaders,
    getTicketStatusRequestBody
  );
  const errors = [];
  let response = errorResponse.response;
  const responseData = await response.data;

  // Assertions
  if (response.status !== 400) {
    errors.push(
      `Response status is not 400 in the response. Response Status: "${response.status}" expected "400"`
    );
  }

  if (response.statusText !== "Bad Request") {
    errors.push(
      `Response status text is not Bad Request in the response. Response Status: "${response.statusText}" expected "Bad Request"`
    );
  }
  if (responseData.status !== false) {
    errors.push(
      `Status is not false in the responseData. Response Status: "${responseData.status}" expected "false"`
    );
  }
  if (responseData.message !== "No data provided") {
    errors.push(
      `Unexpected message in the response: "${responseData.message}" expected "No data provided"`
    );
  }
  if (!responseData.data) {
    errors.push(`Data should be present in the response`);
  } else if (responseData.data.length !== 0) {
    errors.push(`Data response should not be present in the response`);
  }
  if (errors.length > 0) {
    console.log(
      "Test getTicketStatus_EmptyList_ValidToken_DataFetchedSuccessfully: FAIL"
    );
    console.log("\tErrors: ", errors);
  } else {
    console.log(
      "Test getTicketStatus_EmptyList_ValidToken_DataFetchedSuccessfully: PASS"
    );
  }
}

(async () => {
  try {
    // await generateToken_ValidUsernameValidPassword_TokenGenerated();
    // await generateToken_InvalidUsernameInvalidPassword_TokenNotGenerated();
    // await generateToken_MissingPassword_TokenNotGenerated();
    // await generateToken_MissingUsername_TokenNotGenerated();
    // await saveCrmData_ValidData_ValidToken_DataSavedSuccessfully();
    // await saveCrmData_ValidData_InvalidToken_UnauthorizedAccess();
    // await saveCrmData_ValidData_MissingToken_PleasePassToken();
    // await saveCrmData_EmptyList_ValidToken_DataFetchedSuccessfully();
    // await saveCrmData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01();
    // await saveCrmData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01();
    // await saveCrmData_ValidToken_InvalidData_ICCID_Empty_ERR_02();
    // await saveCrmData_ValidToken_InvalidData_ICCID_Missing_ERR_02();
    // await saveCrmData_ValidToken_InvalidData_UIN_NO_Empty_ERR_03();
    // await saveCrmData_ValidToken_InvalidData_UIN_NO_Missing_ERR_03();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Empty_ERR_04();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_IMEI_Missing_ERR_04();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Empty_ERR_05();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_MAKE_Missing_ERR_05();
    // await saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MAKE_ERR_06();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Empty_ERR_07();
    // await saveCrmData_ValidToken_InvalidData_DEVICE_MODEL_Missing_ERR_07();
    // await saveCrmData_ValidToken_ValidData_Valid_DEVICE_MODEL_DataSavedSuccessfully();
    // await saveCrmData_ValidToken_InvalidData_Invalid_DEVICE_MODEL_ERR_08();
    // await saveCrmData_ValidToken_InvalidData_ENGINE_NO_Empty_ERR_10();
    // await saveCrmData_ValidToken_InvalidData_ENGINE_NO_Missing_ERR_10();
    // await saveCrmData_ValidToken_InvalidData_REG_NUMBER_Empty_ERR_11();
    // await saveCrmData_ValidToken_InvalidData_REG_NUMBER_Missing_ERR_11();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Empty_ERR_13();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_LAST_NAME_Missing_ERR_13();
    // await saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Empty_ERR_14();
    // await saveCrmData_ValidToken_InvalidData_ADDRESS_LINE_1_Missing_ERR_14();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Empty_ERR_15();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_CITY_Missing_ERR_15();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Empty_ERR_16();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Missing_ERR_16();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Non_Numeric_ERR_17();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_OWNER_REGISTERED_MOBILE_Length_Equal_10_ERR_18();
    // await saveCrmData_ValidToken_InvalidData_DEALER_CODE_Empty_ERR_19();
    // await saveCrmData_ValidToken_InvalidData_DEALER_CODE_Missing_ERR_19();
    // await saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Empty_ERR_20();
    // await saveCrmData_ValidToken_InvalidData_POA_DOC_NAME_Missing_ERR_20();
    // await saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Empty_ERR_21();
    // await saveCrmData_ValidToken_InvalidData_POA_DOC_NO_Missing_ERR_21();
    // await saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Empty_ERR_22();
    // await saveCrmData_ValidToken_InvalidData_POI_DOC_TYPE_Missing_ERR_22();
    // await saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Empty_ERR_23();
    // await saveCrmData_ValidToken_InvalidData_POI_DOC_NO_Missing_ERR_23();
    // await saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Empty_ERR_24();
    // await saveCrmData_ValidToken_InvalidData_RTO_OFFICE_CODE_Missing_ERR_24();
    // await saveCrmData_ValidToken_InvalidData_RTO_STATE_Empty_ERR_25();
    // await saveCrmData_ValidToken_InvalidData_RTO_STATE_Missing_ERR_25();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Empty_ERR_27();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_OPERATOR_Missing_ERR_27();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Empty_ERR_28();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Missing_ERR_28();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Non_Numeric_ERR_29();
    // await saveCrmData_ValidToken_InvalidData_PRIMARY_MOBILE_NUMBER_Less_Than_15_ERR_30();
    // await saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Empty_ERR_31();
    // await saveCrmData_ValidToken_InvalidData_SECONDARY_OPERATOR_Missing_ERR_31();
    // await saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Less_Than_15_ERR_32();
    // await saveCrmData_ValidToken_InvalidData_SECONDARY_MOBILE_NUMBER_Non_Numeric_ERR_33();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Empty_ERR_34();
    // await saveCrmData_ValidToken_InvalidData_VEHICLE_MODEL_Missing_ERR_34();
    // await saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Empty_ERR_35();
    // await saveCrmData_ValidToken_InvalidData_COMMERCIAL_ACTIVATION_START_DATE_Missing_ERR_35();
    // await saveCrmData_ValidToken_InvalidData_MFG_YEAR_Empty_ERR_38();
    // await saveCrmData_ValidToken_InvalidData_MFG_YEAR_Missing_ERR_38();
    // await saveCrmData_ValidToken_ValidData_DUPLICATE_DATA_ERR_39();
    // await saveCrmData_ValidToken_ValidData_Change_Request_After_Stage_2_ERR_40();
    // await saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Empty_ERR_41();
    // await saveCrmData_ValidToken_InvalidData_INVOICE_DATE_Missing_ERR_41();
    // await saveFleetedgeData_ValidData_ValidToken_DataSavedSuccessfully();
    // await saveFleetedgeData_ValidData_InvalidToken_UnauthorizedAccess();
    // await saveFleetedgeData_ValidData_MissingToken_PleasePassToken();
    // await saveFleetedgeData_EmptyList_ValidToken_DataFetchedSuccessfully();
    // await saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Empty_ERR_01();
    // await saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Missing_ERR_01();
    // await saveFleetedgeData_ValidToken_InvalidData_VIN_NO_Not_Present_ERR_02();
    // await saveFleetedgeData_ValidToken_InvalidData_ICCID_Empty_ERR_03();
    // await saveFleetedgeData_ValidToken_InvalidData_ICCID_Missing_ERR_03();
    // await saveFleetedgeData_ValidToken_InvalidData_ICCID_Not_Present_ERR_04();
    // await saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Empty_ERR_07();
    // await saveFleetedgeData_ValidToken_InvalidData_REQUEST_TYPE_Missing_ERR_07();
    // await saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Empty_ERR_08();
    // await saveFleetedgeData_ValidToken_InvalidData_CERTIFICATE_VALIDITY_DURATION_IN_YEAR_Missing_ERR_08();
    // await getTicketStatus_ValidData_ValidToken_DataFetchedSuccessfully();
    // await getTicketStatus_ValidData_InvalidToken_UnauthorizedAccess();
    // await getTicketStatus_ValidData_MissingToken_PleasePassToken();
    // await getTicketStatus_EmptyList_ValidToken_DataFetchedSuccessfully();
  } catch (error) {
    console.log(`Error... ${error}`);
  }
})();
