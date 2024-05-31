const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

const exampleApi = async () => {
  const driversReadResponse = await axios.get(
    `${process.env.SCALEO_ADDRESS}/api/external/drivers/csv`,
    {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        customer_id: process.env.CUSTOMER_ID
      }
    }
  )
  fs.writeFileSync('drivers.csv', driversReadResponse.data)

  const driversWriteResponse = await axios.post(
    `${process.env.SCALEO_ADDRESS}/api/external/drivers/csv`,
    {
      data: `drivers.firstName;drivers.lastName;drivers.email;drivers.phone;drivers.personalId;drivers.idCard;drivers.street;drivers.zip;drivers.city;drivers.taxId\nMati;Janduła;mateusz.jandula@saasnative.com;123456789;;;;;;`
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        customer_id: process.env.CUSTOMER_ID
      }
    }
  )
  console.log({ drivers: driversWriteResponse.data })

  const weighingssReadResponse = await axios.post(
    `${process.env.SCALEO_ADDRESS}/api/external/weighings/new-or-updated`,
    {
      duration: 24 // last 24 hours
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        customer_id: process.env.CUSTOMER_ID
      }
    }
  )

  console.log({ weighings: weighingssReadResponse.data })
}

exampleApi()
