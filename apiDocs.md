# Chatify

## Endpoints

List of available endpoints:

- `POST` /signup
- `POST` /register

## 1. `POST` signup

- body

```json
{
  "fullName": "John Doe",
  "username": "John",
  "password": "tester123",
  "confirmPassword": "tester123",
  "gender": "male"
}
```

_response (200 - ok)_

```json
{
  "_id": "662794dc7a8a16edaa7680f6",
  "fullName": "John Doe",
  "username": "John",
  "profilePic": "https://avatar.iran.liara.run/public/boy?username=John"
}
```

_response(400 - Bad request)_

```json
{
    "message": "Passwords and confirm password does not match"
}
OR
{
    "message": "Username cannot be empty"
}
OR
{
    "message": "Password cannot be empty"
}
OR
{
    "message": "Username already exist"
}
```

## 2. `POST` login

- body

```json
{
  "username": "John",
  "password": "tester123"
}
```

_response (200 - ok)_

```json
{
  "_id": "662794dc7a8a16edaa7680f6",
  "fullName": "John Doe",
  "username": "John",
  "profilePic": "https://avatar.iran.liara.run/public/boy?username=John"
}
```

_response(400 - Bad request)_

```json
{
    "message": "Invalid username or password"
}
OR
{
    "message": "Invalid username or password"
}
```

## 3. `POST` logout

_response (200 - ok)_

```json
{
  "message": "Logged out success"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```
