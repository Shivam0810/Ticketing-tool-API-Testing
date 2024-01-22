const axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjZkODFiMzdjZTgxMmQ2ZWVlYWZiYiIsImVtYWlsIjoiYWNjb2xhZGVDcm0iLCJmdWxsbmFtZSI6IkFjY29sYWRlIENybSIsInNlY3JldCI6ImFjY29sYWRlLXRpY2tldCIsImlhdCI6MTcwNTgyMDk2OSwiZXhwIjoxNzA1OTA3MzY5fQ.afir2VC8shZRyexzPGwZx2tFd8PICzaBPWoIhuSrLAw",
};

const data = [
  {
    VIN_NO: "89916555634626391631",
    ICCID: "89916490634626390375",
    Ticket_No: "AEPL-240121-2",
  },
];

axios({
  method: "get",
  url: "http://20.219.88.214:6109/api/crm/getTicketStatus",
  headers: headers,
  data: data, // Request body
})
  .then((response) => {
      console.log(response.data.message);
      
  })
  .catch((error) => {
    console.error(error);
  });
