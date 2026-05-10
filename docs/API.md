# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend-theta.vercel.app/`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

    ## Auth

      ### POST /auth/register

      Cria uma nova conta de aluno.

      - **Autenticação:** Não
      - **Body:**

      ```json
      {
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "senha": "minhasenha123",
        "cidade": "Salinas",
        "frase": "Aqui começa o futuro.",
        "planosFuturos": "Cursar Ciência da Computação na UFMG"
      }
      ```

      - **Resposta de sucesso:** `201 Created`

      ```json
      {
        "id": 1,
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "cidade": "Salinas",
        "frase": "Aqui começa o futuro.",
        "planosFuturos": "Cursar Ciência da Computação na UFMG",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-03T10:30:00.000Z"
      }
      ```

      - **Erros:**
        - `400` — Campos obrigatórios ausentes
        - `409` — Email já cadastrado

      ### POST /auth/login

      Autentica um aluno e retorna um token JWT.

      - **Autenticação:** Não
      - **Body:**

      ```json
      {
        "email": "maria@email.com",
        "senha": "minhasenha123"
      }
      ```

      - **Resposta de sucesso:** `200 OK`

      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```

  ## Alunos

    ### GET /alunos

    Lista todos os alunos

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `201 Created`

      ```json
        [
          {
            "id": 1,
            "nome": "Alana",
            "cidade": "Salinas",
            "frase": "Abrace o mundo e você será abraçado.",
            "planosFuturos": "Cursar Biologia",
            "fotoUrl": null
          },
          {
            "id": 2,
            "nome": "Amilton",
            "cidade": "Taiobeiras",
            "frase": "Nunca desistir.",
            "planosFuturos": "Cursar Matemática",
            "fotoUrl": null
          }
        ]
      ```

    ### GET /alunos/:id

    Busca um aluno pelo ID

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

      ```json

      {
        "id": 1,
        "nome": "Alana",
        "cidade": "Salinas",
        "frase": "Abrace o mundo e você será abraçado.",
        "planosFuturos": "Cursar Biologia",
        "fotoUrl": null
      }

      ```

    - **Erros:**
      - 404 — Aluno não encontrado (e-mail não existe)

    ### PUT /alunos/:id

    Atualiza o próprio perfil

    - **Autenticação:** Sim (Bearer Token)

    - **Body:**

    ```json
    {
      "frase": "Abrace o mundo e você será pisoteado.",
      "planosFuturos": "Cursar Química",
      "fotoUrl": null
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Alana",
      "cidade": "Salinas",
      "frase": "Abrace o mundo e você será pisoteado.",
      "planosFuturos": "Cursar Química",
      "fotoUrl": null
    }
    ```

    - **Erros:**
      - `401` — Usuário não autenticado
      - `403` — Sem permissão para atualizar este perfil

    ### DELETE /alunos/:id

    Remove um aluno   

    - **Autenticação:** Sim (Bearer Token - Admin)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `401` — Usuário não autenticado
      - `403` — Usuário sem permissão de administrador

  ## Mensagens

    ### GET /mensagens

    Lista todas as mensagens do mural

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
      [
        {
          "id": 2,
          "texto": "Boa sorte!",

          "autor": {
            "id": 1,
            "nome": "Alana",
            "fotoUrl": null
          }
        },

        {
          "id": 3,
          "texto": "Obrigado, você também!",

          "autor": {
          "id": 2,
          "nome": "Amilton",
          "fotoUrl": null
          }
        }
      ]
    ```

    ### POST /mensagens
    
    Cria uma nova mensagem

    - **Autenticação:** Sim (Bearer token)
    - **Body:**

    ```json
    {
      "texto": "Boa sorte para todo mundo!",
      "imagemUrl": null
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json

      "texto": "Boa sorte para todo mundo!",
      "imagemUrl": null

      "autor": {
      "id": 2,
      "nome": "Amilton",
      "fotoUrl": null
      }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `401` — Usuário não autenticado

    ### DELETE /mensagens/:id

    Exclui uma mensagem

    - **Autenticação:** Sim (Bearer token)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `401` — Usuário não autenticado
      - `403` — Usuário sem permissão de administrador