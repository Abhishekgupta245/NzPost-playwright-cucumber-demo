Playwright Cucumber Test Automation Framework
-----------------------------------------------------------------

Overview
This project is a basic test automation framework using Playwright, Cucumber (Gherkin), and TypeScript. It was developed quickly as part of an interview screening task to demonstrate automation skills.

Setup Instructions
-----------------------------------------------------------------
Prerequisites:
Node.js (v16 or above recommended) installed on your machine
npm (comes with Node.js)

Installation:
-----------------------------------------------------------------

Clone the repository:
- git clone <repository-url>
- cd <repository-folder>


Install dependencies:
-----------------------------------------------------------------
- npm install

Dependencies
The main packages used are:

@cucumber/cucumber: For BDD-style feature files and step definitions

playwright: Browser automation framework

typescript: TypeScript language support


All dependencies are listed in package.json.

Running Tests:
-----------------------------------------------------------------
Run all feature tests using the command:
npm run test

Genrating report:
-----------------------------------------------------------------
Run this command to generate the report:
npm run report
The report is stored under the 'reports' folder and opens in the browser upon execution

Note:
Tests run on Chromium browser by default in headed mode for visibility.

Feature files and step definitions are under the features/ folder.
Reuseable methods are under utilities.ts file

Additional Notes
This framework is a basic proof-of-concept created under time constraints.

It demonstrates navigating pages, filling forms, and basic assertions using Playwright and Cucumber.

There is enough room for further enhancements.

