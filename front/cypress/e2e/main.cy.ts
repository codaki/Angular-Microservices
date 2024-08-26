describe('Existencia de Links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the usuarios list', () => {
    cy.get('#usuarioslink').should('exist');
    cy.get('#cursoslink').should('exist');
    cy.get('#relacionlink').should('exist');
  });
});
describe('Funcionalidad Links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the usuarios list', () => {
    cy.get('#usuarioslink').should('exist');
    cy.get('#cursoslink').should('exist');
    cy.get('#relacionlink').should('exist');
  });
  it('should work buttons', () => {
    cy.get('#usuarioslink').click();
    cy.url().should('include', '/usuarios');
    cy.get('#regresar').click();
    cy.get('#cursoslink').click();

    cy.url().should('include', '/cursos');
    cy.get('#regresar').click();
    cy.get('#relacionlink').click();

    cy.url().should('include', '/relacion');
    cy.get('#regresar').click();
  });
});
