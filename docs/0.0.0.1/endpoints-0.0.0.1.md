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
    "login": "",
    "password": ""
}
```

#### _`Response`_

</br>

> 200

```JSON
{
    "jwtToken": "",
    "jwtTokenExpirationTime": 0,
    "id": ""
}
```

> 400

```JSON
{
    ... something
}
```
