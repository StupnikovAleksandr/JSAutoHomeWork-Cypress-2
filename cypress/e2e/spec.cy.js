import selector from '../fixtures/selector.json';

describe('login test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('happy path login', () => {
        cy.title().should('eq', 'ИдёмВКино');
        cy.login('qamid@qamid.ru','qamid');
        cy.get(selector.login.submitButton).click();
        cy.contains(selector.admin.successLoginText).should("be.visible");
    });

    it('sad path login', () => {
        cy.title().should('eq', 'ИдёмВКино');
        cy.login('qamid@qamid.ru', 'qamid123');
        cy.get(selector.login.submitButton).click();
        cy.contains('Ошибка авторизации!');
    });
});

it('Бронь билета', () => {
    cy.happyLoginADM();

    cy.get(selector.admin.filmCard)
        .find(selector.admin.filmTitle)
        .should('contain.text', selector.client.filmTitleText)
        .invoke('text')
        .then((text) => {

            cy.visit("qamid.tmweb.ru");

            cy.contains(selector.client.filmTitleText)
                .should("have.text", text);

            cy.get(selector.client.filmContainer)
                .contains(selector.client.filmTitleText)
                .closest(selector.client.filmContainer)
                .contains(selector.client.vipHall)
                .parent()
                .find(selector.client.seanceTime)
                .eq(0)
                .click();

            cy.contains('Забронировать')
                .should("be.visible")
                .and("be.disabled");

            const seats = [
                { row: 3, seat: 5 },
                { row: 3, seat: 6 }
            ];

            seats.forEach(({ row, seat }) => {
                cy.get(`${selector.seats.seatWrapper} > :nth-child(${row}) > :nth-child(${seat})`).click();
            });

            cy.get(selector.client.bookButton).click();
            cy.contains(selector.client.bookingConfirmationText).should("be.visible");
        });
});
