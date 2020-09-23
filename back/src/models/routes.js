const express = require('express');
const routes = express.Router();

const CadastroController = require('../controllers/CadastroController');
const ProductController = require('../controllers/ProductController');
const AuthController = require('../controllers/AuthController')


routes.post('/Cadastro', CadastroController.index);
routes.post('/Produtos', ProductController.store);
routes.post('/DeletarProduto', ProductController.delete);
routes.get('/Listagem', ProductController.listagem);
routes.post('/AtualizarProduto', ProductController.atualizar);
routes.post('/Autenticacao', AuthController.auth);
routes.get('/ProdutosCat', ProductController.listaprodutoscat);
routes.get('/ProdutosIndi', ProductController.listaProdutoIndividual);

module.exports = routes; //exportar o routes