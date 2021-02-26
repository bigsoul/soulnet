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

## Dataset

Endpoint: `/dataset`

---

### Get

#### _`Request`_

> GET `/dataset`

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

### Item

#### _`Request`_

> GET `/dataset/item?item=0`

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

## Learning

Endpoint: `/dataset`

---

### Get

#### _`Request`_

> GET `/learning`

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

## Testing

Endpoint: `/testing`

---

### Get

#### _`Request`_

> GET `/testing`

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
