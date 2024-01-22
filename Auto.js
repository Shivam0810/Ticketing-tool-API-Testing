async function makeRequest(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

async function testScenario1() {
  const tokenURL = "http://20.219.88.214:6109/api/crm/generateToken";
  const tokenHeaders = { "Content-Type": "application/json" };
  const tokenRequestBody = { username: "accoladeCrm", password: "admin@123" };

  const errors = [];

  try {
    const tokenData = await makeRequest(tokenURL, {
      method: "POST",
      headers: tokenHeaders,
      body: JSON.stringify(tokenRequestBody),
    });

    const token = tokenData.token;

    const url = "http://20.219.88.214:6109/api/crm/saveCrmData";
    const headers = { "Content-Type": "application/json", token: token };
    const mainCRMBody = [
      {
        VIN_NO: "89916490634626393163",
        ICCID: "",
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
      },
    ];

    const jsonResponse = await makeRequest(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(mainCRMBody),
    });
    console.log(jsonResponse.data[0].VALIDATION_ERROR);

    // Assertions
    // if (responseData.status !== true) {
    //   errors.push(
    //     `Status is not True in the response. Message: ${responseData.message}`
    //   );
    // }

    // const dataList = responseData.data;
    // if (!dataList || dataList.length === 0) {
    //   errors.push("Data list is empty in the response");
    // }

    // const dataDict = dataList[0];
    // if (!dataDict) {
    //   errors.push("Data list is empty or not present in the response");
    // }

    // if (dataDict.UIN_NO !== "ACON4IA202200079317") {
    //   errors.push(`UIN_NO is not as expected. Actual: ${dataDict.UIN_NO}`);
    // }

    assert.isTrue(jsonResponse.status, "Status is not True in the response");
    assert.equal(
      jsonResponse.message,
      "Data fetched successfully",
      "Unexpected message in the response"
    );

    const dataList = jsonResponse.data || [];
    assert.isNotEmpty(dataList, "Data list is empty in the response");

    const dataDict = dataList[0];
    if (!dataList.length) {
      throw new Error("Data list is empty or not present in the response");
    }

    assert.equal(
      dataDict.VIN_NO,
      "89916490634626393163",
      "VIN_NO is not as expected"
    );
    assert.equal(
      dataDict.UIN_NO,
      "ACON4IA202200079317",
      "UIN_NO is not as expected"
    );
    assert.equal(
      dataDict.DEVICE_IMEI,
      "868274066912314",
      "DEVICE_IMEI is not as expected"
    );
    assert.isFalse(dataDict.status, "Status in data is not False");
    assert.equal(
      dataDict.message,
      "Data not saved",
      "Unexpected message in data"
    );
    assert.deepEqual(
      dataDict.VALIDATION_ERROR,
      ["ERR_02"],
      "Unexpected VALIDATION_ERROR in data"
    );
  } catch (error) {
    errors.push(`Test Scenario 1 failed. ${error.message}`);
  }

  return errors;
}

// Run the tests
(async () => {
  const allErrors = [];

  try {
    const errors1 = await testScenario1();
    allErrors.push(...errors1);
  } catch (error) {
    allErrors.push(`Test 1 failed. ${error.message}`);
  }

  if (allErrors.length > 0) {
    console.error("Errors:");
    allErrors.forEach((error) => console.error(error));
  } else {
    console.log("All tests passed!");
  }
})();
