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

        ## GET /alunos
        Lista todos os alunos

        - **Autenticação:** Não
        - **Body:** Não

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
        - **Resposta de sucesso:** `200 OK`

        ## GET /alunos/:id
        Busca um aluno pelo ID

        - **Autenticação:** Não
        - **Body:** Não

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
        - **Resposta de sucesso:** `200 OK`

        - **Erros:**
            - `404` — Credenciais inválidas (e-mail não existe)

        ## PUT/alunos/:id
        Atualiza o próprio perfil

        - **Autenticação:** Sim (bearer token)

        - **Body:** Sim

        ```json
        {
            "frase": "Abrace o mundo e você será pisoteado.",
            "planosFuturos": "Cursar Química",
            "fotoUrl": null
        }
        ```

        - **Resposta de sucesso:** `200 OK`

        - **Erros:**
            - `401` — Usuário não autenticado
            - `403` — Sem permissão para atualizar este perfil

        ## DELETE /alunos/:id
        Remove um aluno   
    
        - `GET /alunos/:id` também não tem body. A resposta é um objeto único. Se o ID não existir, retorna `404`.
        - `PUT /alunos/:id` recebe no body **apenas os campos que podem ser atualizados**: `nome`, `cidade`, `frase`, `planosFuturos`, `fotoUrl`. Todos são opcionais (o aluno pode atualizar só a frase, por exemplo). Retorna `401` se não estiver logado e `403` se tentar atualizar o perfil de outra pessoa.
        - `DELETE /alunos/:id` não tem body. Só o `ADMIN` pode usar. Retorna `204` (sem conteúdo). Retorna `401` se não estiver logado e `403` se não for admin.
        - **Nenhum endpoint de `/alunos` retorna `senhaHash`.**