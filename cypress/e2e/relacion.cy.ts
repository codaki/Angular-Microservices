describe('Matricular Estudiante', () => {
  beforeEach(() => {
    cy.visit('/relacion');
  });
  it('should display the relacion list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should display matricular', () => {
    cy.get('button').contains('Matricular').click();
    cy.get('button').contains('Cancelar').click();
  });
  it('should matricular a usuario', () => {
    cy.get('button').contains('Matricular').click();
    cy.get('.modal').within(() => {
      cy.get('button').contains('Matricular').click();
    });
  });
});

describe('Mostrar matriculados', () => {
  beforeEach(() => {
    cy.visit('/relacion');
  });
  it('should display the relacion list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
  it('should display matriculados', () => {
    cy.get('button').contains('primero').click();
  });
});
