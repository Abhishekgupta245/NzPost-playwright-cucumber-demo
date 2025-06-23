import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { DropDownPage } from '../../pages/DropDownPage';

setDefaultTimeout(30 * 1000);

let dropDownPage: DropDownPage;

When('I go to the dropdown page', async function () {
    await this.page.click('a[href="dropdown-menu.html"]');
    dropDownPage = new DropDownPage(this.page);
});

Then('I should see the dropdown page header text as {string}', async (expectedHeader: string) => {
    try {
        const actualHeader = await dropDownPage.getHeaderText();
        if (actualHeader?.trim() !== expectedHeader) {
            throw new Error(`Expected header text to be "${expectedHeader}", but got "${actualHeader}"`);
        }
    } catch (error) {
        console.error('The header text did not match the expected header text.');
        throw error;
    }
});

Then('I left click on the blue dropdown and validate that the values are displayed', async () => {
    await dropDownPage.clickBlueDropDown();
});

Then('I right click on the green dropdown and validate that the values are displayed', async () => {
    await dropDownPage.rightClickGreenDropDown();
});

Then('I double click on the red dropdown and validate that the values are displayed', async () => {
    await dropDownPage.doubleClickRedDropDown();
});

Then('I close the browser', async function () {
    await this.browser.close();
});
