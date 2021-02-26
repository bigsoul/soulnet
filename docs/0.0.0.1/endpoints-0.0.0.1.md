# Endpoints doc

## Autorisation

Endpoint: `/auth`

---

### SignIn

</br>

#### _`Request`_

</br>

> POST

```JSON
{
    "login": "string",
    "password": "string"
}
```

#### _`Response`_

</br>

> 200

```JSON
{
    "jwtToken": "string",
    "jwtTokenExpirationTime": number,
    "id": "string"
}
```

> 400

```JSON
{
    ... something
}
```
