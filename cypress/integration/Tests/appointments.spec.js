
 
describe("Appiontments", () => {

  beforeEach(() => {
  cy.request("GET", "/api/debug/reset")
  })
  
  it("should boock an interwiew", () => {
  //  1. Visits the root of our web server
    cy.visit("/")
    .contains("[data-testid=day]", "Monday")
    .should("have.class",  "day-list__item--selected");

  //  2. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click()

  //  3. Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
     .should("have.value", "Lydia Miller-Jones")

  //  4. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click()


  //  5. Clicks the save button
    cy.contains("Save").click()

  //  6. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")  
  });






  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    })

  it("should edit an interview", () => {
    

 // 1. Visits the root of our web server
 cy.visit("/")
 .contains("[data-testid=day]", "Monday")
 .should("have.class",  "day-list__item--selected");

 // 2. Clicks the edit button for the existing appointment

//  cy.get("[alt=Edit]")
//  .first()
//  .click({ force: true });

 cy.get('[alt=Edit]').should('be.hidden').invoke('show').click()

 // 3. Changes the name and interviewer
   cy.get("[alt='Tori Malcolm']").click()
   .get('[type="text"]').clear()
   .get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
   .should("have.value", "Lydia Miller-Jones");


 // 4. Clicks the save button
    cy.contains("Save").click();

 // 5. Sees the edit to the appointment
 cy.contains(".appointment__card--show", "Lydia Miller-Jones")
 cy.contains(".appointment__card--show", "Tori Malcolm")
});





  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    })

  it("should cancel an interview", () => {

  // 1. Visits the root of our web server
  cy.visit("/")

  // 2. Clicks the delete button for the existing appointment
   cy.get("[alt=Delete]")
    .first()
    .click({ force: true });

  // 3. Clicks the confirm button
    cy.contains("Confirm").click()
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");


  // 4. Sees that the appointment slot is empty
  cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist")
  cy.get("[alt=Add]").should("be.visible")
  cy.contains(".appointment__time", "12pm")
  });

});