# Endpoints doc

-   [Endpoints doc](#endpoints-doc)
    -   [Autorisation](#autorisation)
        -   [_Auth/SignIn_ `POST`](#authsignin-post)
        -   [_Auth/SignUp_ `POST`](#authsignup-post)
    -   [Datasets](#datasets)
        -   [_Datasets/Get_ `GET`](#datasetsget-get)
        -   [_Datasets/Post_ `POST`](#datasetspost-post)
        -   [_Datasets/Delete_ `DELETE`](#datasetsdelete-delete)
    -   [Learnings](#learnings)
        -   [_Learnings/Get_ `GET`](#learningsget-get)
    -   [Testings](#testings)
        -   [_Testings/Get_ `GET`](#testingsget-get)
    -   [Results](#results)
        -   [_Results/Get_ `GET`](#resultsget-get)

<a name="autorisation"></a>

## Autorisation

<a name="/auth"></a>

> #### Endpoint: /auth

---

<a name="/auth/signin"></a>

#### _Auth/SignIn_ `POST`

> _Request: POST_ => <span style="color:green">/auth/signin</span>

```JSON
{
    "login": "", // username or email
    "password": "" // user password
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

#### _Auth/SignUp_ `POST`

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

> #### Endpoint: /datasets

---

<a name="/datasets/get"></a>

#### _Datasets/Get_ `GET`

> _Request: GET_ => <span style="color:green">/datasets/get</span>

```JSON
{}
```

> _Response: 200_ <= <span style="color:green">/datasets/get</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/datasets/get</span>

```JSON
{
    ... something
}
```

---

<a name="/datasets/post"></a>

#### _Datasets/Post_ `POST`

> _Request: POST_ => <span style="color:green">/datasets/post</span>

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

> _Response: 200_ <= <span style="color:green">/datasets/post</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/datasets/post</span>

```JSON
{
    ... something
}
```

<a name="/datasets/delete"></a>

#### _Datasets/Delete_ `DELETE`

> _Request: DELETE_ => <span style="color:green">/datasets/delete</span>

```JSON
{
    "email": "",
    "login": "",
    "password": ""
}
```

> _Response: 200_ <= <span style="color:green">/datasets/delete</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/datasets/delete</span>

```JSON
{
    ... something
}
```

<a name="learnings"></a>

## Learnings

<a name="/learnings"></a>

> #### Endpoint: /learnings

---

<a name="/learnings/get"></a>

#### _Learnings/Get_ `GET`

> _Request: GET_ => <span style="color:green">/learnings/get</span>

```JSON
{}
```

> _Response: 200_ <= <span style="color:green">/learnings/get</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/learnings/get</span>

```JSON
{
    ... something
}
```

<a name="testings"></a>

## Testings

<a name="/testings"></a>

> #### Endpoint: /testings

---

<a name="/testings/get"></a>

#### _Testings/Get_ `GET`

> _Request: GET_ => <span style="color:green">/testings/get</span>

```JSON
{}
```

> _Response: 200_ <= <span style="color:green">/testings/get</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/testings/get</span>

```JSON
{
    ... something
}
```

<a name="results"></a>

## Results

<a name="/results"></a>

> #### Endpoint: /results

---

<a name="/results/get"></a>

#### _Results/Get_ `GET`

> _Request: GET_ => <span style="color:green">/results/get</span>

```JSON
{}
```

> _Response: 200_ <= <span style="color:green">/results/get</span>

```JSON
[
    {
        "id": "",
        "name": 0,
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/results/get</span>

```JSON
{
    ... something
}
```
