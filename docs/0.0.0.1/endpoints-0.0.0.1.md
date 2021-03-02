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
        -   [_Learnings/Post_ `POST`](#learningspost-post)
        -   [_Learnings/Put_ `PUT`](#learningsput-put)
        -   [_Learnings/Delete_ `DELETE`](#learningsdelete-delete)
    -   [Testings](#testings)
        -   [_Testings/Get_ `GET`](#testingsget-get)
        -   [_Testings/Post_ `POST`](#testingspost-post)
        -   [_Testings/Put_ `PUT`](#testingsput-put)
        -   [_Testings/Delete_ `DELETE`](#testingsdelete-delete)
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
    "login": "string: username or email",
    "password": "string: user password"
}
```

> _Response: 200_ <= <span style="color:green">/auth/signin</span>

```JSON
{
    "jwtToken": "string: jwt token",
    "jwtTokenExpirationTime": "number: expiration time",
    "userId": "string: user id (GUID)"
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
    "email": "string: email",
    "login": "string: username",
    "password": "string: password"
}
```

> _Response: 200_ <= <span style="color:green">/auth/signup</span>

```JSON
{
    "jwtToken": "string: jwt token",
    "jwtTokenExpirationTime": "number: expiration time",
    "userId": "string: user id (GUID)"
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
        "id": "string: dataset id (GUID)",
        "name": "string: dataset name",
        "isLoaded": "dataset hed loaded on server"
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
    "id": "string: dataset id (GUID)",
    "name": "string: dataset name"
}

```

> _Response: 200_ <= <span style="color:green">/datasets/post</span>

```JSON
{
    "id": "string: dataset id (GUID)",
    "name": "string: dataset name",
    "isLoaded": "dataset hed loaded on server"
}

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
    "id": "string: dataset id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/datasets/delete</span>

```JSON
{}
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
        "id": "string: learning id (GUID)",
        "name": "string: learning name",
        "state": "number: current learning state; 0 - config; 1 - playing; 2 - paused; 3 - completed",
        "isArchive": "boolean: this learning has archiveted",
        "iterationCount": "number: iteration count in dataset file",
        "iterationCurrent": "number: current iteration in this learning",
        "inputNeuronsCount": "number: input neurons count for dataset",
        "deepLayersCount": "number: deep layers count",
        "datasetLearning": {
            "id": "string: dataset id (GUID)",
            "name": "string: dataset name"
        }
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/learnings/get</span>

```JSON
{
    ... something
}
```

<a name="/learnings/post"></a>

#### _Learnings/Post_ `POST`

> _Request: POST_ => <span style="color:green">/learnings/post</span>

```JSON
{
    "id": "string: learning id (GUID)",
    "name": "string: learning name",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this learning",
    "inputNeuronsCount": "number: input neurons count for dataset",
    "deepLayersCount": "number: deep layers count",
    "datasetLearningId": "string: dataset id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/learnings/post</span>

```JSON
{
    "id": "string: learning id (GUID)",
    "name": "string: learning name",
    "state": "number: current learning state; 0 - config; 1 - playing; 2 - paused; 3 - completed",
    "isArchive": "boolean: this learning has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this learning",
    "inputNeuronsCount": "number: input neurons count for dataset",
    "deepLayersCount": "number: deep layers count",
    "datasetLearning": {
        "id": "string: dataset id (GUID)",
        "name": "string: dataset name"
    }
}
```

> _Response: 400_ <= <span style="color:yellow">/learnings/post</span>

```JSON
{
    ... something
}
```

<a name="/learnings/put"></a>

#### _Learnings/Put_ `PUT`

> _Request: PUT_ => <span style="color:green">/learnings/put</span>

```JSON
{
    "id": "string: learning id (GUID)",
    "name": "string: learning name",
    "state": "number: current learning state; 0 - config; 1 - playing; 2 - paused; 3 - completed",
    "isArchive": "boolean: this learning has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this learning",
    "inputNeuronsCount": "number: input neurons count for dataset",
    "deepLayersCount": "number: deep layers count",
    "datasetLearningId": "string: dataset id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/learnings/put</span>

```JSON
{
    "id": "string: learning id (GUID)",
    "name": "string: learning name",
    "state": "number: current learning state; 0 - config; 1 - playing; 2 - paused; 3 - completed",
    "isArchive": "boolean: this learning has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this learning",
    "inputNeuronsCount": "number: input neurons count for dataset",
    "deepLayersCount": "number: deep layers count",
    "datasetLearning": {
        "id": "string: dataset id (GUID)",
        "name": "string: dataset name"
    }
}
```

> _Response: 400_ <= <span style="color:yellow">/learnings/put</span>

```JSON
{
    ... something
}
```

<a name="/learnings/delete"></a>

#### _Learnings/Delete_ `DELETE`

> _Request: DELETE_ => <span style="color:green">/learnings/delete</span>

```JSON
{
    "id": "string: learning id (GUID)",
}
```

> _Response: 200_ <= <span style="color:green">/learnings/delete</span>

```JSON
{}
```

> _Response: 400_ <= <span style="color:yellow">/learnings/delete</span>

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
        "id": "string: testings id (GUID)",
        "name": "string: testings name",
        "state": "number: current testings state; 0 - config; 1 - playing; 2 - paused; 3 - completed",
        "isArchive": "boolean: this testings has archiveted",
        "iterationCount": "number: iteration count in dataset file",
        "iterationCurrent": "number: current iteration in this testings",
        "stopLossPercent": "number: percent to stop losing",
        "startDeposit": "number: a start deposit to testing a learning",
        "learning": {
            "id": "string: learning id (GUID)",
            "name": "string: learning name"
        },
        "datasetTesting": {
            "id": "string: dataset id (GUID)",
            "name": "string: dataset name"
        }
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/testings/get</span>

```JSON
{
    ... something
}
```

<a name="/testings/post"></a>

#### _Testings/Post_ `POST`

> _Request: POST_ => <span style="color:green">/testings/post</span>

```JSON
{
    "id": "string: testings id (GUID)",
    "name": "string: testings name",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this testings",
    "stopLossPercent": "number: percent to stop losing",
    "startDeposit": "number: a start deposit to testing a learning",
    "learningId": "string: learning id (GUID)",
    "datasetTestingId": "string: dataset id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/testings/post</span>

```JSON
{
    "id": "string: testings id (GUID)",
    "name": "string: testings name",
    "state": "number: current testings state; 0 - config; 1 - playing; 2 -paused; 3 - completed",
    "isArchive": "boolean: this testings has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this testings",
    "stopLossPercent": "number: percent to stop losing",
    "startDeposit": "number: a start deposit to testing a learning",
    "learning": {
        "id": "string: learning id (GUID)",
        "name": "string: learning name"
    },
    "datasetTesting": {
        "id": "string: dataset id (GUID)",
        "name": "string: dataset name"
    }
}
```

> _Response: 400_ <= <span style="color:yellow">/testings/post</span>

```JSON
{
    ... something
}
```

<a name="/testings/put"></a>

#### _Testings/Put_ `PUT`

> _Request: PUT_ => <span style="color:green">/testings/put</span>

```JSON
{
    "id": "string: testings id (GUID)",
    "name": "string: testings name",
    "state": "number: current testings state; 0 - config; 1 - playing; 2 -paused; 3 - completed",
    "isArchive": "boolean: this testings has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this testings",
    "stopLossPercent": "number: percent to stop losing",
    "startDeposit": "number: a start deposit to testing a learning",
    "learningId": "string: learning id (GUID)",
    "datasetTestingId": "string: dataset id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/testings/put</span>

```JSON
{
    "id": "string: testings id (GUID)",
    "name": "string: testings name",
    "state": "number: current testings state; 0 - config; 1 - playing; 2 -paused; 3 - completed",
    "isArchive": "boolean: this testings has archiveted",
    "iterationCount": "number: iteration count in dataset file",
    "iterationCurrent": "number: current iteration in this testings",
    "stopLossPercent": "number: percent to stop losing",
    "startDeposit": "number: a start deposit to testing a learning",
    "learning": {
        "id": "string: learning id (GUID)",
        "name": "string: learning name"
    },
    "datasetTesting": {
        "id": "string: dataset id (GUID)",
        "name": "string: dataset name"
    }
}
```

> _Response: 400_ <= <span style="color:yellow">/testings/put</span>

```JSON
{
    ... something
}
```

<a name="/testings/delete"></a>

#### _Testings/Delete_ `DELETE`

> _Request: DELETE_ => <span style="color:green">/testings/delete</span>

```JSON
{
    "id": "string: testings id (GUID)"
}
```

> _Response: 200_ <= <span style="color:green">/testings/delete</span>

```JSON
{}
```

> _Response: 400_ <= <span style="color:yellow">/testings/delete</span>

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
        "learning": "string: learning name",
        "testing": "string: testing name",
        "datasetLearning": "string: dataset learning name",
        "datasetTesting": "string: dataset testing name",
        "startDeposit": "number: a start deposit of testing",
        "endDeposit": "number: a end deposit of testing",
        "margin": "number: trading efficiency"
    }
]
```

> _Response: 400_ <= <span style="color:yellow">/results/get</span>

```JSON
{
    ... something
}
```
