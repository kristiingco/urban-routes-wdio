module.exports = {
    // Inputs
    fromField: "#from",
    toField: "#to",
    phoneNumberField: "#phone",
    codeField: "#code",
    cardNumberField: ".card-number-input #number",
    cvvField: ".card-code-input #code",
    messageToDriverField: "#comment",
    blanketAndHandkerchiefsInput: ".switch-input:nth-child(1)",
    blanketAndHandkerchiefsCheckbox: ".switch:nth-child(1)",
    // Buttons
    callATaxiButton: "button=Call a taxi",
    supportivePlanButton: "//div[contains(@class, 'tcard')][5]",
    phoneNumberButton: "//div[starts-with(text(), 'Phone number')]",
    paymentMethodButton: ".pp-button",
    addCardButton: ".pp-row:last-child",
    linkButton: "button=Link",
    closeButton: ".payment-picker .close-button",
    iceCreamCounterPlus: ".counter:nth-child(1) .counter-plus",
    nextButton: "button=Next",
    confirmButton: "button=Confirm",
    orderButton: "button.smart-button",
    // Modals
    phoneNumberModal: ".modal",
    addCardModal: ".payment-picker",
    carSearchModal: ".order-body",
    // Text
    paymentMethodValue: ".pp-value .pp-value-text",
    iceCreamCounterValue: ".counter:nth-child(1) .counter-value",
    driverInformationText: ".order-header-title",
    // Functions
    fillAddresses: async function (from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
    },
    clickCallATaxiButton: async function () {
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    clickSupportivePlanButton: async function () {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
    },
    clickPhoneNumberButton: async function () {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
    },
    fillPhoneNumber: async function (phoneNumber) {
        await this.clickPhoneNumberButton();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed();
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1);
        const code = await requests[0].response.body.code;
        await codeField.setValue(code);
        await $(this.confirmButton).click();
    },
    clickPaymentMethodButton: async function () {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
    },
    clickAddCardButton: async function () {
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
    },
    fillCardDetails: async function (cardNumber, cvv) {
        await this.clickPaymentMethodButton();
        await this.clickAddCardButton();
        const addCardModal = await $(this.addCardModal);
        await addCardModal.waitForDisplayed();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(cardNumber);
        const cvvField = await $(this.cvvField);
        await cvvField.waitForDisplayed();
        await cvvField.setValue(cvv);
    },
    submitCardDetails: async function (cardNumber, cvv) {
        await this.fillCardDetails(cardNumber, cvv);
        await browser.keys("Tab");
        const linkButton = await $(this.linkButton);
        await linkButton.waitForEnabled();
        await linkButton.click();
        const closeButton = await $(this.closeButton);
        await closeButton.waitForDisplayed();
        await closeButton.click();
    },
    fillMessageToDriverField: async function (input) {
        const messageToDriverField = await $(this.messageToDriverField);
        await messageToDriverField.setValue(input);
    },
    clickBlanketAndHandkerchiefsCheckbox: async function () {
        const blanketAndHandkerchiefsCheckbox = await $(
            this.blanketAndHandkerchiefsCheckbox
        );
        await blanketAndHandkerchiefsCheckbox.click();
    },
    clickIceCreamCounterPlus: async function () {
        const iceCreamCounterPlus = await $(this.iceCreamCounterPlus);
        await iceCreamCounterPlus.waitForDisplayed();
        await iceCreamCounterPlus.click();
    },
    clickOrderButton: async function () {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    },
};
