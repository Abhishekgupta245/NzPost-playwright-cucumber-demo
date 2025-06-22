import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { WebFormPage } from '../../pages/WebFormPage';
import { expect } from '@playwright/test';

setDefaultTimeout(30 * 1000);

let browser: Browser;
let page: Page;
let webFormPage: WebFormPage;

Given('I navigate to the main site', async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/');

    // Check that expected text is present to verify correct page load

    const introText = 'This site contains a collection of sample web pages to be tested with Selenium WebDriver.';
    await expect(page.locator('p.lead')).toContainText(introText);
});

When('I go to the web form page', async () => {
    await page.click('a[href="web-form.html"]');
    webFormPage = new WebFormPage(page);
});

Then('I should see the header text as {string}', async (expectedHeader: string) => {
    try {
        const actualHeader = await webFormPage.getHeaderText();
        if (actualHeader?.trim() !== expectedHeader) {
            throw new Error(`Expected header text to be "${expectedHeader}", but got "${actualHeader}"`);
        }
    } catch (error) {
        console.error('The header text did not match the expected header text.');
        throw error;
    }
});

When(
    'I fill out and submit the form with text {string}, password {string}, text area {string}, file {string}, dropdown {string}, datalist {string}, checkbox {string}, radio {string}, colorSelection {string}, rangeValue {string}, and date {string}',
    async (
        textInput: string,
        pwd: string,
        textArea: string,
        fileUploadLoc: string,
        ddSelectVal: string,
        ddDataListVal: string,
        checkBoxVal: string,
        radioButtonVal: string,
        colorSelection: string,
        rangeValue: string,
        date: string
    ) => {
        await webFormPage.fillForm(
            textInput,
            pwd,
            textArea,
            fileUploadLoc,
            ddSelectVal,
            ddDataListVal,
            checkBoxVal,
            radioButtonVal,
            colorSelection,
            rangeValue,
            date
        );
        await webFormPage.submitForm();
    }
);

Then('I should see a success message {string}', async (expectedMessage: string) => {
    const actualMessage = await webFormPage.getSuccessMessage();
    if (actualMessage?.trim() !== expectedMessage) {
        throw new Error(`Expected message text to be "${expectedMessage}", but got "${actualMessage}"`);
    }

    await browser.close();
});
