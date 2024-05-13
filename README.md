# URLs pré-assinadas AWS S3

Este repositório foi criado para complementar meu artigo no medium sobre URLs pré-assinadas (pre-signed URLs) do AWS S3. Se você não o leu ainda, segue o link do artigo:

[Artigo: URLs pré-assinadas: manipule arquivos no AWS S3 de forma segura e eficiente.](<COLOCAR LINK>)

Este repo contém um exemplo prático da implementação de **URLs pré-assinadas AWS S3** usando Javascript.

## Pré-requisitos
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

Caso não tenha essas ferramentas instaladas, você pode seguir o tutorial disponível [neste artigo](https://kinsta.com/pt/blog/como-instalar-o-node-js/#como-instalar-o-nodejs-no-windows).

## Setup do projeto

Para instalar as dependências do projeto, basta rodar o comando:
```bash
npm install
```

## Variáveis de ambiente
As variáveis de ambiente estão localizadas no arquivo `.env`.

```
AWS_ACCESS_KEY_ID= // Chavé pública do usuário
AWS_SECRET_ACCESS_KEY= // Chave privada do usuário
AWS_REGION= // Região da AWS em que o bucket está hospedado (ex.: us-east-2)
AWS_BUCKET_NAME= //Nome do bucket
```

Antes de rodar o projeto, é necessário preencher os dados relativo ao usuário e bucket na AWS que farão a gestão dos arquivos.

Caso você não tenha uma conta na AWS, será necessário seguir as seguintes instruções:

https://docs.aws.amazon.com/pt_br/streams/latest/dev/setting-up.html

E para criar um bucket privado, voce pode seguir os passos em:

https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/creating-bucket.html

Para obter `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`, acesse a página de usuários na IAM da sua conta AWS:

https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-2#/users

Selecione o usuário , e clique em **"Create access key"**.

![image](https://github.com/glaucovillasboas/url-pre-assinada-medium/assets/27960416/6708a7d8-e0d9-446e-b066-3090b86d2044)

O caso de uso para o nosso exemplo será o **"Application running outside AWS"**, após selecionar esta opção clique em **"Next"**, e em seguida clique em **"Create access key"**.

![image](https://github.com/glaucovillasboas/url-pre-assinada-medium/assets/27960416/0cded4cb-83d6-4b3d-9ca3-f12885841032)

Após isso, você verá dois valores: **"Access key"** e **"Secret access key"**. O primeiro, é o valor que deve ser utilizado na variável `AWS_ACCESS_KEY_ID`, e o segundo é o valor de `AWS_SECRET_ACCESS_KEY`.


## Rodando a aplicação
Para rodar a aplicação, rode o comando:
```bash
npm start
```

Após isso, o front end será acessível através do endereço http://localhost:3000


https://github.com/glaucovillasboas/url-pre-assinada-medium/assets/27960416/1d8c6524-6f21-46fe-9115-5ec3210d79e4

:)
