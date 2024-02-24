module.exports = {
    getPhoneNumber: function (countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000);
        return `${countryCode}${number}`;
    },
    getCardNumber: function () {
        return Math.floor(100000000000 + Math.random() * 900000000000);
    },
    getCVV: function () {
        return Math.floor(10 + Math.random() * 90);
    },
    getElementByText: async function (obj) {
        return await $(`div=${obj.toString()}`);
    },
};
