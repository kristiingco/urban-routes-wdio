const page = require("../../page");
const helper = require("../../helper");

describe("Create an order", () => {
    it("should click Call a Taxi button with the supportive plan ", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const supportivePlanButton = await $(page.supportivePlanButton);
        await expect(supportivePlanButton).toHaveElementClass("active");
    });

    it("should submit phone number", async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it("should add a credit card", async () => {
        const cardNumber = helper.getCardNumber();
        const cvv = helper.getCVV();
        await page.submitCardDetails(cardNumber, cvv);
        const paymentMethodValue = await $(page.paymentMethodValue);
        const paymentMethodValueText = await paymentMethodValue.getText();
        await expect(paymentMethodValueText).toHaveText("Card");
    });

    it("should add message to driver", async () => {
        const input = "Get some chips, please";
        await page.fillMessageToDriverField(input);
        const messageToDriverField = await $(page.messageToDriverField);
        await expect(messageToDriverField).toHaveValue(input);
    });

    it("should select blanket and handkerchiefs", async () => {
        await page.clickBlanketAndHandkerchiefsCheckbox();
        const blanketAndHandkerchiefsInput = await $(
            page.blanketAndHandkerchiefsInput
        );
        await expect(blanketAndHandkerchiefsInput).toBeSelected();
    });

    it("should order 2 ice creams", async () => {
        await page.clickIceCreamCounterPlus();
        await page.clickIceCreamCounterPlus();
        const iceCreamCounterValue = await $(page.iceCreamCounterValue);
        const iceCreamCounterValueText = await iceCreamCounterValue.getText();
        await expect(iceCreamCounterValueText).toHaveText("2");
    });

    it("should show car search model", async () => {
        await page.clickOrderButton();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    });

    it("should show driver information", async () => {
        const driverInformationButton = await $(page.driverInformationButton);
        await driverInformationButton.waitForDisplayed({ timeout: 6000 });
        await expect(driverInformationButton).toBeExisting();
    });
});
