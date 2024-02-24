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
        const paymentMethodValue = await $(".pp-value .pp-value-text");
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
        page.clickBlanketAndHandkerchiefsCheckbox();
        const blanketAndHandkerchiefsCheckbox = await $(
            ".switch-input:nth-child(1)"
        );
        await expect(blanketAndHandkerchiefsCheckbox).toBeSelected();
    });
});
