import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { WebFormPage } from '../../pages/WebFormPage';

setDefaultTimeout(30 * 1000);
let webFormPage: WebFormPage;

When('I go to the web form page', async function() {
    await this.page.click('a[href="web-form.html"]');
    webFormPage = new WebFormPage(this.page);
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

Then('I should see a success message {string}', async function (expectedMessage: string) {
    const actualMessage = await webFormPage.getSuccessMessage();
    if (actualMessage?.trim() !== expectedMessage) {
        throw new Error(`Expected message text to be "${expectedMessage}", but got "${actualMessage}"`);
    }
    await this.browser.close();
});
