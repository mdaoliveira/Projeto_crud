# Trabalho 1 - Disciplina: Experiência Criativa

## Descrição

Projeto CRUD de um sistema web intitulado **"Registros de Aves"**, desenvolvido com _**React**_ (frontend), _**Node.js**_ (backend) e _**MySQL**_ (banco de dados).

O sistema permite o **cadastro**, a **leitura**, a **edição** e a **exclusão** de registros relacionados a observação de aves, incluindo informações como as **espécies identificadas**, 
**quantidade de aves avistadas**, **usuário responsável pelo registro**, o **local**, e a **data e hora**.

## Instalação
Acessar as seguintes pastas para a instalação do _npm install_:
```bash
# cd backend
npm install
```

:warning: Instalar também o pacote _npm react-router-dom_ em _frontend/reactproject_
```bash
# cd frontend/project
npm install
npm react-router-dom
```

## Configurar Banco de Dados

Importação do banco de dados da pasta _db_banco_ no MySql Workbench versão 8.0.42.

Passo a passo:

1. No cabeçalho acessar _Server_
2. Selecionar _Data Import_
3. Em _Import Options_ selecionar _Import from Self-Contained File_ e selecionar o arquivo _registros_ em _db_banco/dumps_  
4. No campo _Default Schema to be Imported to_, ir em "New.." e criar um Schema _registros_
5. _Start Import_ 

:warning: No arquivo _db.js_, edite o campo _password_ com sua senha local.
```bash
import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin25",
    database: "registros"
});

```

## Rodar o projeto

```bash
# cd backend
npm start
```

```bash
# cd frontend/reactproject
npm start
```

