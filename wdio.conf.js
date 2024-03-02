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
        "https://cnt-3d4c2563-1040-49eb-ac21-9105bc390b11.containerhub.tripleten-services.com",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["geckodriver", "intercept"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 100000000,
    },
};
