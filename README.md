# Shopper - Teste Técnico

Este repositório foi feito duranto o teste técnico para a vaga de Desenvolvedor Full-Stack da [Shopper](https://landing.shopper.com.br/), uma supermercado online e um sistema de abastecimento online.

## Sumário

- [Shopper - Test técnico](#shopper---teste-técnico)
    - [Sumário](#sumário)
    - [Tecnologias utilizadas](#tecnologias-utilizadas)
    - [Descrição da API](#descrição-da-api)

## Tecnologias utilizadas

| Package | Version  |
| ------- | -------- |
| Node    | v18.19.1 |
| Docker  | v24.0.2  |

Para uso da aplicação local, instalar o [NodeJS](https://nodejs.org) no seu computador. O [Docker](https://www.docker.com/) é utilizado para a implantação da aplicação em contêiner Docker.

## Instruções

Clonar o repositório:

```bash
git clone https://github.com/lohanvictor/shopper-backend
```

Criar um arquivo _.env_ com as variáveis abaixo:

```dotenv
GEMINI_API_KEY=<chave da api no Gemini>
```

É possível obter uma chave gratuita para utilizar a GeminiAPI através do seguinte [link](https://ai.google.dev/gemini-api/docs/api-key). A chave da GeminiAPI é importante pois é utilizada na API para identificação de imagem.

Com o Docker instalado, executar o seguinte comando:

```bash
docker compose up -d
```

Para acessar a aplicação, a rota é _http://localhost:8080_

## Descrição da API


Foi desenvolvida uma API que possui três rotas:

| Rota                  | Descrição                     |
|------                 |--------                       |
| post: /upload         |  Rota responsável por receber uma imagem de medição de água ou medição de energia do usuário. É utilizado a API do Google Gemini para identificação do valor de medição na imagem enviada.|
| patch: /confirm       | Rota responsável para confirmação do valor lido pela GeminiAI. |
| get: /<customer_code>/list?measure_type= | Rota responsável por listar as medidas enviadas pelo usuário.  |