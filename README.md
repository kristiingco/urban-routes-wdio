# Urban Routes - Automation Testing with WebdriverIO

### Project description

Urban Routes is an application designed to create routes, estimate travel time and costs for various transportation modes, and offer additional delivery services.

The primary goal of the project was to test the core user experience of Urban Routes, ensuring thorough examination of the essential functionalities of the application.

The tests cover the following features:

1. Setting the address
2. Selecting Supportive plan
3. Filling in the phone number
4. Adding a credit card
5. Writing a message for the driver
6. Ordering a Blanket and handkerchiefs
7. Ordering 2 Ice creams
8. The car search modal appears
9. Waiting for the driver info to appear in the modal

### Technologies and techniques used

JavaScript tests were developed for the WebdriverIO framework, employing automated and functional testing as the primary testing techniques. The organization of code involved the utilization of modules and the implementation of the PageObject design pattern.

### Instructions on how to run tests

1. Clone the repository
2. Run the command `npm install` in the terminal open to the project directory
3. Deploy the server to obtain a server URL
4. Replace the baseURL property in `wdio.conf.js` with the server URL
5. Run the command `npm run wdio` for the tests to the run
