<h1>
RentalxAPI
</h1>

*
*

## 🚀 Tecnologias

<p>
<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/angular-icon.svg" alt="angular" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/material-ui.svg" alt="materialdesign" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/javascript.svg" alt="javascript" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/express.svg" alt="express" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nodemon.svg" alt="nodemon" width="30" height="30" style="margin-left: 5px;"/>
</p>

## ✅ Demostração
<img src=".github/github@screen.png" alt="demostração" />

## Manter carros

**Requisito Funcional**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel listar todas as categorias.

**Requisito Não-Funcional**
N/A

**Regra de Negócio**
Não deve ser possivel cadastrar um carro com uma placa já existente.
Não deve ser possivel alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário com permissão de administrador.

## Listar carros

**Requisito Funcional**
Deve ser possivel listar todos os carros disponiveis no sistema.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel lsitar todos os carros disponiveis pelo nome da marca
Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**Requisito Não-Funcional**
N/A

**Regra de Negócio**
O usuário não precisa estar logado no sistema para visualizar a lista de carros.

## Cadastro de Especificação do carro

**Requisito Funcional**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as espeicificações.
Deve ser possivel listar todos os carros.

**Requisito Não-Funcional**
N/A

**Regra de Negócio**
Não deve ser possivel cadastrar uma especificação para um carro não disponivel/cadastrado no sistema.
Não deve ser possivel cadastrar uma especificação já existente para um carro.
O usuário responsável pelo cadastrado deve ser um usuário com permissão de administrador.

## Cadastro de imagens do carro

**Requisito Funcional**
Deve ser possivel cadastrar a imagem para um carro.
Deve ser possivel listar todos os carros.

**Requisito Não-Funcional**
Utilizar o multer para upload dos arquivos

**Regra de Negócio**
Deve ser possivel poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário com permissão de administrador.

## Alugel de carro

**Requisito Funcional**
Deve ser possivel realizar/cadastrar um alugel de um carro.

**Requisito Não-Funcional**

**Regra de Negócio**
O alugel deve ter uma duração minima de 24 horas.
Não deve ser possivel cadastrar um novo alugel caso já exista um aberto para o mesmo usuário
Não deve ser possivel cadastrar um novo alugel caso já exista um aberto para o mesmo carro
