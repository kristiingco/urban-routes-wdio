const page = require("../../page");
const helper = require("../../helper");

describe("Create an order", () => {
    it("should select Call a Taxi with the supportive plan ", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.clickCallATaxiButton();
        await page.clickSupportivePlanButton();
        const supportivePlanButton = await $(page.supportivePlanButton);
        await expect(supportivePlanButton).toHaveElementClass("active");
    });

    it("should open phone number modal", async () => {
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    });

    it("should save the phone", async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });
});
