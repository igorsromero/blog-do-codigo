# Blog do código
> Um blog simples em Node.js

<details>
<summary>Política de Acesso ao Conteúdo</summary>

## Propósito
Esse documento contém todaas as informações necessárias sobre controle e acesso ao conteúdo do Blog do Código.
Esse documento deve ser lido por todas as pessoas que trabalham no Blog do Código.

## Autenticação
Antes de prosseguir com o uso da API, é necessário que crie uma nova conta através da rotaPOST /usuario, e em seguida, verificar o email da nova conta através da rota POST /usuario/verifica_email/:token
Com a conta criada e verificada, use a rota de login POST /usuario/login para obter um token de acesso através do cabeçalho AAuthorization na resposta. Use esse cabeçalho nas demais requisições papra se autenticar com a API e prosseguir ao controle de acesso ao conteúdo.

## Controle de conteúdo do Blog
No nosso blog, temos o cargo de assinante. A pessoa com cargo de assinante, apenas pode ler os pposts do blog, os posts de qualquer pessoa.
Além do cargo de assinante, também temos o cargo editor. A pessoa com cargo de editor, ela pode e deve cadastrar novos posts no blog e gerenciá-los.
Por último, o blog possui o cargo de admin. O cargo de administrador, é o cargo para aas pessoas que vão gerenciar os usuários e posts do nosso blog.


</details>

<details>

Instalar pacotes:
```
npm install
```

Instalar bcrypt:
```
npm install bcrypt@3.0.8
```

Instalar passport:
```
npm install passport
```

Instalar passport-local:
```
npm install passport-local
```

Instalar JsonWebToken:
```
npm install jsonwebtoken
```

Gerar uma senha secreta aleatória para o JWT:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
```

Ler variável de ambiente em aplicações node:
```
npm install dotenv
```

Instalar Bearer Token:
```
npm install passport-http-bearer
``` 

Instalar o Redis:
```
npm install redis
```

Instalar o Moment:
```
npm install moment
```

Instalar o Nodemailer:
```
npm install nodemailer
```

</details>

