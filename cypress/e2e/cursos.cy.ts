describe('Cursos Page', () => {
  beforeEach(() => {
    // Visit the cursos page before each test
    cy.visit('/cursos');
  });

  it('should display the cursos list', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.gt', 0);
  });

  it('should add a new curso', () => {
    const newCursoName = 'New Test Course';

    cy.get('button').contains('Añadir Curso').click();
    cy.get('#nombreCurso').type(newCursoName);
    cy.get('button').contains('Guardar').click();

    cy.get('table').contains(newCursoName).should('exist');
  });

  it('should update an existing curso', () => {
    const updatedCursoName = 'Updated Course Name';

    cy.get('table tbody tr').first().find('button').contains('Editar').click();
    cy.get('#nombreCurso').clear().type(updatedCursoName);
    cy.get('button').contains('Guardar').click();

    cy.get('table').contains(updatedCursoName).should('exist');
  });

  it('should delete a curso', () => {
    const cursoToDelete = 'Course to Delete';

    // Assuming the course exists, find and delete it
    cy.get('table')
      .contains(cursoToDelete)
      .parent('tr')
      .find('button')
      .contains('Eliminar')
      .click();

    // Confirm deletion in modal if it exists
    cy.get('button').contains('Confirmar').click();

    cy.get('table').contains(cursoToDelete).should('not.exist');
  });
});
