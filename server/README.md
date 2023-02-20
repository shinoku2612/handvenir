# Getting Started with ShinPay API!

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Use [http://localhost:8080](http://localhost:8080) to test api.\
If you want to reload when make changes, try **`npm run dev`** instead, it will start the server with nodemon and listen for any changes.

## Custom Response Codes

**_Pattern: `<M><S><A><HTTP>`_**
There is a rule for code pattern of the server response: start with model code (**_1 digit_**), followed by a number related to status (**_0 if error and 1 otherwise_**), the code of action/request (**_2 digits_**) and **_HTTP status code_** (except a middle one).
_<u>Example</u>: `110221` if user successfully registered; `100341` if user logged in with wrong credentials._

#### _Model code:_
|     Value     |     Related     |
|:-------------:|:---------------:|
|`0`            |OTP model        |
|`1`            |User model       |
|`2`            |Token model      |

#### _Status code:_
|     Value     |     Related     |
|:-------------:|:---------------:|
|`0`            |Request failure  |
|`1`            |Request success  |

#### _Action/request code:_
|     Value     |     Related     |
|:-------------:|:---------------:|
|`00`            |Send OTP         |
|`01`            |Validate OTP     |
|`02`            |Register         |
|`03`            |Log in           |
|`04`            |Get user         |