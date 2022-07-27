# TODO LIST

---

## 1. REGISTER

**POST** request pada `http://localhost:3000/register/`

Kirim data dengan format JSON yang berisi username dan password, contohnya ialah

- Content
```json
{
	"username" : "user",
	"password" : "123"
}
```

#### RESPON SUKSES

Ketika berhasil register, pengguna akan diberikan data yang berisi todo list
```json
{
    "success": true
}
```

#### RESPON GAGAL

- Jika pengguna salah mengirimkan format data, pengguna akan diberikan output berupa :
  
```json 
{
    "success": false,
    "info": "Sign Up failed."
}
```

- Jika username pengguna telah terdaftar maka akan menampilkan output berupa

``` json
{
    "success": false,
    "info": "Your username was used."
}
```

---

## 2. LOGIN

**POST** request pada `http://localhost:3000/login/`

Kirim data dengan format JSON yang berisi username dan password, contohnya ialah

- Content :
```json
{
	"username" : "user",
	"password" : "123"
}
```

#### RESPON SUKSES

Ketika berhasil login, pengguna akan diberikan data yang berisi todo list
```json
{
    "success": true
}
```

#### RESPON GAGAL

- Jika pengguna salah memasukkan username atau password, pengguna akan diberikan output berupa :

``` json
{
    "success": false,
    "info": "Username is invalid"
}
```

atau

```json
{
    "success": false,
    "info": "Password is invalid"
}
```

- Jika belum terdaftar maka akan diberikan output berupa:
```json
{
    "success": false,
    "info": "Login failed"
}
```

---

---

## 3. LOGOUT

**GET** request pada `http://localhost:3000/logout/`

keluar dengan akun yang telah digunakan

Contoh :

GET request pada URL

`http://localhost:3000/logout/`

#### RESPON SUKSES

Ketika berhasil login, pengguna akan diberikan data yang berisi todo list
```json
{
    "success": true
}
```

#### RESPON GAGAL

- Jika pengguna gagal logout akan diberikan respon berupa:

``` json
{
    "success" : false,
    "info" : "Logout failed."
}
```

---

## 3. CRUD TODO LIST

#### ADD TODO

**POST** request pada `http://localhost:3000/todo/add`

untuk menambahkan todo list dengan mengirimkan data json yang berisi value todo atau dapat disertai value image yang berisi file image  

- Contoh 

content

```json
{
    "todo": "meeting"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "meeting",
            "status": "uncheck",
            "completed": "on progress",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```

---

#### GET ALL TODO

**GET** request pada `http://localhost:3000/todo/`

Untuk menampilkan details sebuah todo

- Contoh 

GET request pada URL

`http://localhost:3000/todo/`

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "meeting",
            "status": "uncheck",
            "completed": "on progress",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```

---

#### GET TODO BY ID

**GET** request pada `http://localhost:3000/todo/:id`

Untuk menampilkan details sebuah todo

- Contoh 

GET request pada URL

`http://localhost:3000/todo/62da6537744b12fab0e6172a`

- Response

```json
{
    "response": {
        "image": {
            "data": {
                "type": "Buffer",
                "data": []
            },
            "contentType": ""
        },
        "todo": "meeting",
        "status": "uncheck",
        "completed": "on progress",
        "_id": "62da6537744b12fab0e6172a",
        "items": []
    }
}
```

---

#### EDIT TODO

**PUT** request pada `http://localhost:3000/todo/edit/:id`

untuk menambahkan todo list dengan mengirimkan data json 

- Contoh

POST request pada URL

`http://localhost:3000/todo/edit/62da6537744b12fab0e6172a`

content
  
```json 
{
    "todo": "belajar"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "uncheck",
            "completed": "on progress",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```

---

#### EDIT STATUS TODO

**PUT** request pada `http://localhost:3000/todo/editStatus/:id`

Untuk mengubah status todo

- Contoh 

PUT request pada URL 

`http://localhost:3000/todo/editStatus/62da6537744b12fab0e6172a`

content
```json
{
    "status": "checked"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "on progress",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```

---

#### EDIT COMPLETED TODO

**PUT** request pada `http://localhost:3000/todo/editCompleted/:id`

Untuk mengubah status todo

- Contoh 

PUT request pada URL 

`http://localhost:3000/todo/editCompleted/62da6537744b12fab0e6172a`

content
```json
{
    "completed": "done"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "done",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```

---

#### DELETE TODO

**DELETE** request pada `http://localhost:3000/todo/delete/:id`

Untuk menampilkan menghapus sebuah todo berdasarkan id

- Contoh 

request DELETE pada URL

`http://localhost:3000/todo/delete/62da6537744b12fab0e6172a`


- Response

```json
{
    "response": []
}
```

---

#### DELETE IMAGE TODO

**DELETE** request pada `http://localhost:3000/todo/image/:id`

Untuk menghapus sebuah image todo berdasarkan id

- Reponse sebelum image dihapus

```json
{
    "username": "admin",
    "response": [
        {
            "todos": {
                "image": {
                    "data": {
                        "type": "Buffer",
                        "data": [137,
                            80,
                            78,
                            71,
                            13,
                            10,
                            26,
                            10,
                            0,
                            0,
                            0,
                            13,
                            73,
                            72,
                            68,
                            82]
                    },
                    "contentType": "image/png"
                },
                "todo": "belajar",
                "status": "uncheck",
                "completed": "on progress",
                "description": "uas b inggris",
                "_id": "62db41fb72652ef87bf78445",
                "items": []
            },
            "tag": []
        }
    ]
}
```

- Contoh 

request DELETE pada URL

`http://localhost:3000/todo/delete/62da6537744b12fab0e6172a`


- Response

```json
{
    "username": "admin",
    "response": [
        {
            "todos": {
                "image": {
                    "data": {
                        "type": "Buffer",
                        "data": []
                    },
                    "contentType": ""
                },
                "todo": "belajar",
                "status": "uncheck",
                "completed": "on progress",
                "description": "uas b inggris",
                "_id": "62db41fb72652ef87bf78445",
                "items": []
            },
            "tag": []
        }
    ]
}
```

---


## 3. CRUD ITEM TODO LIST

---

#### ADD TODO ITEM

**POST** request pada `http://localhost:3000/todo/item/add`

Untuk menambahkan item todo 

- Contoh 

content

```json
{
    "idTodo": "62da6537744b12fab0e6172a",
    "itemTodo": "baca buku",
    "tag": "#prioritas"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "done",
            "_id": "62da6537744b12fab0e6172a",
            "items": [
                {
                    "item": "baca buku",
                    "tag": [
                        "#prioritas"
                    ],
                    "statusItem": "uncheck",
                    "_id": "62da6708744b12fab0e61739"
                }
            ]
        }
    ]
}

```

---

#### EDIT TODO ITEM

**PUT** request pada `http://localhost:3000/todo/item/edit`

Untuk mengubah item todo 

- Contoh 

content

```json
{
    "idTodo": "62da6537744b12fab0e6172a",
    "idItemTodo": "62da6708744b12fab0e61739",
    "itemTodo": "cuci mobil",
    "tag": "#urgent #importantMoreThanAnything"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "done",
            "_id": "62da6537744b12fab0e6172a",
            "items": [
                {
                    "item": "cuci mobil",
                    "tag": [
                        "#urgent",
                        "#importantMoreThanAnything"
                    ],
                    "statusItem": "uncheck",
                    "_id": "62da6708744b12fab0e61739"
                }
            ]
        }
    ]
}

```

---

#### EDIT STATUS TODO ITEM

**PUT** request pada `http://localhost:3000/todo/item/editStatus`

Untuk mengubah status item todo 

- Contoh 

content

```json
{
    "idTodo": "62da6537744b12fab0e6172a",
    "idItemTodo": "62da6708744b12fab0e61739",
    "status": "checked"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "done",
            "_id": "62da6537744b12fab0e6172a",
            "items": [
                {
                    "item": "cuci mobil",
                    "tag": [
                        "#urgent",
                        "#importantThanAnything"
                    ],
                    "statusItem": "checked",
                    "_id": "62da6708744b12fab0e61739"
                }
            ]
        }
    ]
}

```

---

#### GET TODO BY ID

**GET** request pada `http://localhost:3000/todo/item/details`

Untuk menampilkan details item todo

- Contoh 

content

```json
{
    "idTodo": "62da6537744b12fab0e6172a",
    "idItemTodo": "62da6708744b12fab0e61739"
}
```

- Response

```json
{
    "response": {
        "item": "cuci mobil",
        "tag": [
            "#urgent",
            "#importantThanAnything"
        ],
        "statusItem": "checked",
        "_id": "62da6708744b12fab0e61739"
    }
}
```

---

#### DELETE TODO ITEM

**DELETE** request pada `http://localhost:3000/todo/item/delete`

Untuk menghapus item todo 

- Contoh 

content

```json
{
    "idTodo": "62da6537744b12fab0e6172a",
    "idItemTodo": "62da6708744b12fab0e61739"
}
```

- Response

```json
{
    "response": [
        {
            "image": {
                "data": {
                    "type": "Buffer",
                    "data": []
                },
                "contentType": ""
            },
            "todo": "belajar",
            "status": "checked",
            "completed": "done",
            "_id": "62da6537744b12fab0e6172a",
            "items": []
        }
    ]
}
```