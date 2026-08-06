
## CORS

Olá. Gostaria de te dizer que essa API possui CORS ativado para qualquer origem (*). Você pode acessá-la através de qualquer domínio sem configuração adicional no cliente.


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
      - `500` — Erro interno do servidor

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

    - **Resposta de sucesso:** `200 OK`

      ```json
        [
          {
            "id": 1,
            "nome": "Alana",
            "email": "ajro1@email.com",
            "cidade": "Salinas",
            "frase": "Abrace o mundo e você será abraçado.",
            "planosFuturos": "Cursar Biologia",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-03T10:30:00.000Z"
          },
          {
            "id": 2,
            "nome": "Amilton",
            "email": "apj1@email.com",
            "cidade": "Taiobeiras",
            "frase": "Nunca desistir.",
            "planosFuturos": "Cursar Matemática",
            "fotoUrl": null,
            "role": "USER",
            "criadoEm": "2026-04-04T01:40:00.000Z"
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
        "email": "ajro1@email.com",
        "cidade": "Salinas",
        "frase": "Abrace o mundo e você será abraçado.",
        "planosFuturos": "Cursar Biologia",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-03T10:30:00.000Z"
      }

      ```

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### PUT /alunos/:id

    Atualiza o próprio perfil

    - **Autenticação:** Sim (Bearer Token)

    - **Body:**

    ```json
    {
      "frase": "Abrace o mundo e você será pisoteado."
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
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

    ### DELETE /alunos/:id

    Remove um aluno   

    - **Autenticação:** Sim (Bearer Token - Admin)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `404` — Aluno não encontrado
      - `500` — Erro interno do servidor

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

          //o que entendi é que "include do Prisma" é a mesma coisa que essa seção "autor"

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
      "texto": "Boa sorte para todo mundo!"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "texto": "Boa sorte para todo mundo!",
      "imagemUrl": null,
      "autorId": 2,
      "autor": {
        "id": 2,
        "nome": "Amilton",
        "fotoUrl": null
      },
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — O campo texto é obrigatório
      - `500` — Erro interno do servidor

    ### DELETE /mensagens/:id

    Exclui uma mensagem

    - **Autenticação:** Sim (Bearer token)
    - **Body:** Nenhum

    - **Resposta de Sucesso:** `204 No Content`

    - **Erros:**
      - `404` — Mensagem não encontrada
      - `500` — Erro interno do servidor