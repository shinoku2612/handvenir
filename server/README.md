# Getting Started with ShinPay API!

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Use [http://localhost:8080](http://localhost:8080) to test api.\
If you want to reload when make changes, try **`npm run dev`** instead, it will start the server with nodemon and listen for any changes.

## Custom Response Codes

**_Pattern: `<HTTP><ModelCode>`_**

#### _OTP status code: `00x`_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`400`             |`001`       |code: `400001` |Multiple calls from multiple IP address
`400 `            |`002`       |code: `400002` |Unexpected request type
`401 `            |`003`       |code: `401003` |Invalid OTP
`404 `            |`004`       |code: `404004` |Code not found
`201 `            |`005`       |code: `201005` |Code sent successfully

#### _Authentication status code: `1xx`_
_`10x` for register, `11x` for login and `12x` for logout_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`409`             |`101`       |code: `409101` |Duplicated identifier
`201 `            |`102`       |code: `201102` |Successfully registered
`404 `            |`111`       |code: `404111` |Unregistered user
`401 `            |`112`       |code: `401112` |Wrong credentials
`200 `            |`113`       |code: `200113` |Successfully logged in
`200 `            |`121`       |code: `200121` |Successfully logged out