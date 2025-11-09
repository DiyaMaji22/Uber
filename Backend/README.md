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