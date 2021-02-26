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

### Get

</br>

#### _`Request`_

</br>

> GET `/dataset`

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

---

### Item

</br>

#### _`Request`_

</br>

> GET `/dataset/item?item=0`

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

## Learning

Endpoint: `/dataset`

---

### Get

</br>

#### _`Request`_

</br>

> GET `/learning`

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

## Testing

Endpoint: `/testing`

---

### Get

</br>

#### _`Request`_

</br>

> GET `/testing`

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

## Results

Endpoint: `/results`

---

### Get

</br>

#### _`Request`_

</br>

> GET `/results`

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
