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
_`10x` for register, `11x` for login, `12x` for logout and `13x` for refresh token_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`409`             |`101`       |code: `409101` |Duplicated identifier
`201 `            |`102`       |code: `201102` |Successfully registered
`404 `            |`111`       |code: `404111` |Unregistered user
`401 `            |`112`       |code: `401112` |Wrong credentials
`200 `            |`113`       |code: `200113` |Successfully logged in
`200 `            |`121`       |code: `200121` |Successfully logged out
`401 `            |`131`       |code: `401131` |Unauthorized

#### _User status code: `20x`_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`200`             |`201`       |code: `200201` |Successfully get user
`200 `            |`203`       |code: `200203` |Successfully update user
`403 `            |`202`       |code: `403202` |Forbidden: Not allowed

#### _Token status code: `30x`_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`404`             |`301`       |code: `404301` |Token not found
`400 `            |`302`       |code: `400302` |Invalid token error
`200 `            |`303`       |code: `200303` |Successfully refresh token
`401 `            |`304`       |code: `401304` |Verify error

#### _Server error response `50x`_
 HTTP status code | Model code | Response code |             Response type             
:----------------:|:----------:|:-------------:|:-------------------------------------:
`500`             |none        |code: `500`    |Internal Server Error