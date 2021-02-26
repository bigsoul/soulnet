# Endpoints doc

## Autorisation

Endpoint: `/auth`

---

### SignIn

#### _`Request`_

> POST

```JSON
{
    "login": "",
    "password": ""
}
```

#### _`Response`_

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

#### _`Request`_

> POST

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

#### _`Response`_

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

## Datasets

Endpoint: `/datasets`

---

### Get

#### _`Request`_

> GET `/datasets`

#### _`Response`_

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

---

### Post

#### _`Request`_

> POST `/datasets`

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

#### _`Response`_

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

### Delete

#### _`Request`_

> DELETE `/datasets`

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

#### _`Response`_

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

## Learnings

Endpoint: `/learnings`

---

### Get

#### _`Request`_

> GET `/learnings`

#### _`Response`_

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

## Testings

Endpoint: `/testings`

---

### Get

#### _`Request`_

> GET `/testings`

#### _`Response`_

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

## Results

Endpoint: `/results`

---

### Get

#### _`Request`_

> GET `/results`

#### _`Response`_

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
