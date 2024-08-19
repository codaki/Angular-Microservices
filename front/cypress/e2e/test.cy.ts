describe('Agregar Estudiante', () => {
  beforeEach(() => {
    cy.visit('/usuarios');
  });

  it('should display the usuarios list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should display agregar', () => {
    cy.get('button').contains('Crear un nuevo estudiante').click();
    cy.get('button').contains('Cancelar').click();
  });
  it('should add a new usuario', () => {
    const newUsuarioName = 'New Test Usuario';
    const newUsuarioEmail = 'data@example.com';
    const newUsuarioPassword = 'password';

    cy.get('button').contains('Crear un nuevo estudiante').click();
    cy.get('#exampleFormControlInput1').type(newUsuarioName);
    cy.get('#exampleFormControlInput2').type(newUsuarioEmail);
    cy.get('#inputPassword').type(newUsuarioPassword);
    cy.get('button').contains('Guardar Usuario').click();
  });
});
describe('Editar estudiante', () => {
  beforeEach(() => {
    cy.visit('/usuarios');
  });
  it('should display the usuarios list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should display editar', () => {
    cy.get('button').contains('Editar').click();
    cy.get('button').contains('Cancelar').click();
  });
  it('should edit a usuario', () => {
    const newUsuarioName = 'New Test Usuario';
    const newUsuarioEmail = 'New Email Usuario';
    cy.get('button').contains('Editar').click();
    cy.get('#exampleFormControlInput1').clear().type(newUsuarioName);
    cy.get('#exampleFormControlInput2').clear().type(newUsuarioEmail);
    cy.get('button').contains('Editar Usuario').click();
  });
});
describe('Eliminar estudiante', () => {
  beforeEach(() => {
    cy.visit('/usuarios');
  });
  it('should display the usuarios list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should delete a usuario', () => {
    cy.get('button#7').contains('Eliminar').click();
  });
});
