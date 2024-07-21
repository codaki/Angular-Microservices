describe('Gestión de Estudiantes', () => {
  beforeEach(() => {
    cy.visit('/usuarios');
  });

  it('should display the usuarios list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should display agregar', () => {
    cy.get('button').contains('Agregar').click();
    cy.get('button').contains('Cancelar').click();
  });
  it('should add a new usuario', () => {
    const newUsuarioName = 'New Test Usuario';
    const newUsuarioEmail = 'data@example.com';
    const newUsuarioPassword = 'password';

    cy.get('button').contains('Agregar').click();
    cy.get('#exampleFormControlInput1').type(newUsuarioName);
    cy.get('#exampleFormControlInput2').type(newUsuarioEmail);
    cy.get('#inputPassword').type(newUsuarioPassword);
    cy.get('button').contains('Guardar Usuario').click();
  });
});
