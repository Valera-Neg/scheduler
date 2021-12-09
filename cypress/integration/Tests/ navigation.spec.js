describe("Navigation", () => {
    it("should visit root", () => {
        cy.visit("/");
    });


    it("Should navigate to Tuesday", () => {
        cy.visit("/");
    })


    it("Should fined element containing the text Tuesday, and click on it", () => {
        cy.contains("[data-testid=day]", "Tuesday")
            .click()
            .should("have.class", "day-list__item--selected");
    })

});