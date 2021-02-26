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

---

### SignUp

</br>

#### _`Request`_

</br>

> POST

```JSON
{
    "email": "",
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

## Dataset

Endpoint: `/dataset`

---

### List

</br>

#### _`Request`_

</br>

> GET `/dataset/list`

</br>

#### _`Response`_

</br>

> 200

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> 400

```JSON
{
    ... something
}
```
