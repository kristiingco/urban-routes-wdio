exports.config = {
    runner: "local",
    specs: ["./test/specs/**/*.js"],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    headless: true,
    capabilities: [
        {
            maxInstances: 5,
            browserName: "firefox",
            acceptInsecureCerts: true,
            "moz:firefoxOptions": {
                args: ["-headless"],
            },
        },
    ],
    logLevel: "error",
    bail: 0,
    baseUrl:
        "https://cnt-b2ce6f23-3114-44f5-a955-531a9599cda6.containerhub.tripleten-services.com",
    waitforTimeout: 10000000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["geckodriver", "intercept"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
};
