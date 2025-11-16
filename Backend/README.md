# Uber Backend API Documentation

## User Registration Endpoint

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",  // Required, minimum 3 characters
    "lastname": "string"    // Optional
  },
  "email": "string",       // Required, valid email format
  "password": "string"     // Required, minimum 6 characters
}
```

#### Response

##### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

##### Error Response
- **Status Code**: 400 Bad Request
- **Content** (Validation Errors):
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
##### Example Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

#### Validation Rules
- Email must be a valid email format
- First name must be at least 3 characters long
- Password must be at least 6 characters long

#### Notes
- The password is automatically hashed before storage
- A JWT token is generated and returned upon successful registration
- All required fields must be provided, or an error will be returned

---

## Captain Registration Endpoint

### POST /captain/register

Register a new captain (driver/owner) in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",  // Required, minimum 3 characters
    "lastname": "string"    // Required, minimum 3 characters
  },
  "email": "string",       // Required, valid email format
  "password": "string",    // Required, minimum 6 characters
  "vehicle": {
    "color": "string",     // Required, min 3 chars
    "plate": "string",     // Required, min 3 chars
    "capacity": number,      // Required, integer >= 1
    "vehicleType": "string"// Required, one of: "car", "motorcycle", "auto"
  }
}
```

#### Validation Rules
- `email` must be a valid email
- `fullname.firstname` and `fullname.lastname` must be at least 3 characters
- `password` must be at least 6 characters
- `vehicle.color` and `vehicle.plate` must be at least 3 characters
- `vehicle.capacity` must be an integer >= 1
- `vehicle.vehicleType` must be one of: `car`, `motorcycle`, `auto`

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "string",
    "vehicle": { "color": "string", "plate": "string", "capacity": 2, "vehicleType": "motorcycle" }
  }
}
```

#### Error Responses
- **400 Bad Request** — validation errors. Example:
```json
{
  "errors": [ { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname" } ]
}
```
- **400 Bad Request** — if a captain with the given email already exists:
```json
{ "message": "Captain already exists" }
```

#### Notes
- Passwords are hashed using bcrypt before saving.
- A JWT token is returned on successful registration.
- Ensure your `.env` contains `DB_CONNECT` and `JWT_SECRET` and the DB is reachable before testing this endpoint.


### GET /users/profile

Get the currently logged-in user's profile information.

#### Authentication
- Required
- Bearer Token in Authorization header or token in cookies

#### Request Headers
```
Authorization: Bearer <your_jwt_token>
```

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "_id": "string"
}
```

#### Error Response
- **Status Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```
or
```json
{
  "message": "Token is invalid"
}
```

---

### GET /users/logout

Logout the currently logged-in user and invalidate their token.

#### Authentication
- Required
- Bearer Token in Authorization header or token in cookies

#### Request Headers
```
Authorization: Bearer <your_jwt_token>
```

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
  "message": "Logged out successfully"
}
```

#### Effects
- Clears the token cookie if present
- Adds the token to blacklist (token cannot be reused)
- Token expires after 24 hours in blacklist

#### Error Response
- **Status Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```

#### Notes
- After logout, the token will no longer be valid for authentication
- Previous token will be blacklisted and cannot be reused




{
"fullname":
{
  "firstname":"test_captain3",
  "lastname":"test_captain3"
},
"email":"test1@gmail.com",
"password":"123456",
"vehicle":{
  "color":"red",
  "plate":  "Mp-6y",
  "capacity":8,
  "vehicleType":"car"
}
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFhMTk2N2QyYWExZmMzNDZjN2ZhN2MiLCJpYXQiOjE3NjMzMTgxMTksImV4cCI6MTc2MzQwNDUxOX0.hOs96WKhji6Vdo47MIvTwF_jTCyliG8Si9KrkPGKQLg