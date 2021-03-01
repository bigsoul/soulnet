# Endpoints doc

-   [Autorisation](#autorisation)
    -   [/auth](#/auth)
        -   [SignIn: `POST`](#/auth/signin)
        -   [SignUp: `POST`](#/auth/signup)
-   [Datasets](#datasets)
    -   [/datasets](#/datasets)
        -   [Get: `GET`](#/datasets/get)
        -   [Post: `POST`](#/datasets/post)
        -   [Delete: `DELETE`](#/datasets/delete)
-   [Learnings](#learnings)
    -   [/learnings](#/learnings)
        -   [Get: `GET`](#/learnings/get)
        -   [Post: `POST`](#learnings/post)
        -   [Delete: `DELETE`](#learnings/delete)
-   [Testings](#testings)
    -   [/testings](#/testings)
        -   [Get: `GET`](#/testings/get)
        -   [Post: `POST`](#/testings/post)
        -   [Delete: `DELETE`](#/testings/delete)
-   [Results](#results)
    -   [/results](#/results)
        -   [Get: `GET`](#/results/get)

<a name="autorisation"></a>

## Autorisation

<a name="/auth"></a>

> #### Endpoint: /auth

---

<a name="/auth/signin"></a>

#### _Auth/SignIn_

> _Request: POST_ => <span style="color:green">/auth/signin</span>

```JSON
{
    "login": "",
    "password": ""
}
```

> _Response: 200_ <= <span style="color:green">/auth/signin</span>

```JSON
{
    "jwtToken": "",
    "jwtTokenExpirationTime": 0,
    "id": ""
}
```

> _Response: 400_ <= <span style="color:yellow">/auth/signin</span>

```JSON
{
    ... something
}
```

---

<a name="/auth/signup"></a>

#### _Auth/SignUp_

> _Request: POST_ => <span style="color:green">/auth/signup</span>

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

> _Response: 200_ <= <span style="color:green">/auth/signup</span>

```JSON
{
    "jwtToken": "",
    "jwtTokenExpirationTime": 0,
    "id": ""
}
```

> _Response: 400_ <= <span style="color:yellow">/auth/signup</span>

```JSON
{
    ... something
}
```

<a name="datasets"></a>

## Datasets

<a name="/datasets"></a>

Endpoint: `/datasets`

---

<a name="/datasets/get"></a>

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

<a name="/datasets/post"></a>

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

<a name="/datasets/delete"></a>

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

<a name="learnings"></a>

## Learnings

<a name="/learnings"></a>

Endpoint: `/learnings`

---

<a name="/learnings/get"></a>

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

<a name="testings"></a>

## Testings

<a name="/testings"></a>

Endpoint: `/testings`

---

<a name="/testings/get"></a>

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

<a name="results"></a>

## Results

<a name="/results"></a>

Endpoint: `/results`

---

<a name="/results/get"></a>

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
