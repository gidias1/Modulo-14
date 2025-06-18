/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'


describe('Testes da Funcionalidade Usuários', () => {

it('Deve validar contrato de usuários', () => {
  cy.request('usuarios').then(response => {
    return contrato.validateAsync(response.body).then(() => {
      expect(response.status).to.equal(200);
    });
  });
});


  it('Deve listar usuários cadastrados', () => { 
    cy.request({
      method: 'GET',
      url: 'usuarios',
      }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.usuarios).to.be.an('array');
  });
});

 it('Deve cadastrar um usuário com sucesso', () => {
  const email = `mariana_${Date.now()}@gmail.com`;

  cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      nome: 'Mariana Teste1',
      email,
      password: 'Teste123',
      administrador: 'true',
    }
  }).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('Cadastro realizado com sucesso');
  });
});


  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false ,
      body: {
        nome: 'Giovanna invalido' ,
        email: 'giovanna.diasgmail.com' ,
        password: 'Teste123' ,
        administrador: 'true',
      }
    }).should((response) =>{
      expect(response.status).to.equal(400); 
      expect(response.body).to.have.property('email');
      expect(response.body.email).to.equal('email deve ser um email válido');
  });
  });

it('Deve editar um usuário previamente cadastrado', () => {
  const email = `mariana_${Date.now()}@gmail.com`;

  cy.cadastrarUsuario('Mariana Original', email, 'Teste123', 'true').then((id) => {
    cy.request({
      method: 'PUT',
      url: `usuarios/${id}`,
      body: {
        nome: 'Mariana Editada',
        email: `editado_${email}`,
        password: 'NovaSenha123',
        administrador: 'false'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro alterado com sucesso');
    });
  });
});

it('Deve deletar um usuário cadastrado', () => {
  const nome = 'Usuário QA';
  const email = `usuarioqa_${Date.now()}@teste.com`; 
  const senha = 'teste123';
  const admin = 'true';

  cy.cadastrarUsuario(nome, email, senha, admin).then((idUsuario) => {
    cy.request({
      method: 'DELETE',
      url: `usuarios/${idUsuario}`
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Registro excluído com sucesso');
    });
  });
});

});
