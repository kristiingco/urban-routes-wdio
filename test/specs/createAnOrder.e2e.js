const page = require("../../page");
const helper = require("../../helper");

describe("Create an order", () => {
    it("should set the address", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue("East 2nd Street, 601", {
            message: "From field has incorrect input",
        });
        await expect(toField).toHaveValue("1300 1st St", {
            message: "To field has incorrect input",
        });
    });

    it("should select supportive plan ", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const supportivePlanButton = await $(page.supportivePlanButton);
        await expect(supportivePlanButton).toHaveElementClass("active");
    });

    it("should submit phone number", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it("should add a credit card", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const paymentMethodValue = await $(page.paymentMethodValue);
        await expect(paymentMethodValue).toHaveText("Card");
    });

    it("should add message to driver", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const input = "Get some chips, please";
        await page.fillMessageToDriverField(input);
        const messageToDriverField = await $(page.messageToDriverField);
        await expect(messageToDriverField).toHaveValue(input);
    });

    it("should select blanket and handkerchiefs", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const input = "Get some chips, please";
        await page.fillMessageToDriverField(input);
        await page.clickBlanketAndHandkerchiefsCheckbox();
        const blanketAndHandkerchiefsInput = await $(
            page.blanketAndHandkerchiefsInput
        );
        await expect(blanketAndHandkerchiefsInput).toBeSelected();
    });

    it("should order 2 ice creams", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const input = "Get some chips, please";
        await page.fillMessageToDriverField(input);
        await page.clickBlanketAndHandkerchiefsCheckbox();
        await page.clickIceCreamCounterPlus();
        await page.clickIceCreamCounterPlus();
        const iceCreamCounterValue = await $(page.iceCreamCounterValue);
        await expect(iceCreamCounterValue).toHaveText("2");
    });

    it("should show car search modal", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const input = "Get some chips, please";
        await page.fillMessageToDriverField(input);
        await page.clickBlanketAndHandkerchiefsCheckbox();
        await page.clickIceCreamCounterPlus();
        await page.clickIceCreamCounterPlus();
        await page.clickOrderButton();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    });

    it("should show driver information", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const input = "Get some chips, please";
        // if message to driver is not provided, driver information modal does not appear, which will result in the test to fail
        await page.fillMessageToDriverField(input);
        await page.clickBlanketAndHandkerchiefsCheckbox();
        await page.clickIceCreamCounterPlus();
        await page.clickIceCreamCounterPlus();
        await page.clickOrderButton();
        const driverInformationText = await $(page.driverInformationText);
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(40000);
        await expect(driverInformationText).toHaveTextContaining(
            "The driver will arrive"
        );
    });
});
