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
        "https://cnt-b59019a4-0f30-4a73-a83e-892bd434ba4b.containerhub.tripleten-services.com",
    waitforTimeout: 10000,
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
