import { Page } from 'playwright';

export class WebFormPage {
    private page: Page;

    // Defining all the locators on the page
    private textInput = 'input[name="my-text"]';
    private passwordInput = 'input[name="my-password"]';
    private textArea = 'textarea[name="my-textarea"]';
    private fileInput = 'input[name="my-file"]';
    private selectMenu = 'select[name="my-select"]';
    private dataList = 'input[list="my-options"]';
    private datePicker = 'input[name="my-date"]';
    private submitButton = 'button[type="submit"]';
    private h1 = 'h1.display-6';
    private message = 'p.lead';


    constructor(page: Page) {
        this.page = page;
    }

    //Gets the page title
    async getHeaderText(): Promise<string | null> {
        return this.page.textContent(this.h1);
    }

    //Gets the success message in the form after submission
    async getSuccessMessage(): Promise<string | null> {
        return this.page.textContent(this.message);
    }

    // Provides inpot to the Text Input field
    async fillTextInput(textInput: string) {
        await this.page.fill(this.textInput, textInput);
    }

    //Fills the password in the field
    async fillPassword(pwd: string) {
        await this.page.fill(this.passwordInput, pwd);
    }

    // Inputs provided text in the text area field
    async fillTextArea(textArea: string) {
        await this.page.fill(this.textArea, textArea);
    }

    //Uploads the file provided in the file location
    async selectFileUpload(fileLoc: string) {
        try {
            await this.page.setInputFiles(this.fileInput, fileLoc);
        }
        catch (error) {
            console.error("The specified file was not found in the provided location", fileLoc);
            throw error;
        }
    }

    // Ticks the specified checkbox to true
    async selectCheckBoxVal(checkBoxVal: string) {
        await this.page.locator(`label:has-text("${checkBoxVal}")`).click();
    }

    //Selects the specified radio button
    async selectRadioButtonVal(radioButtonVal: string) {
        await this.page.locator(`label:has-text("${radioButtonVal}")`).click();
    }

    //Sets the provided color hex code
    async setColor(color: string) {
        await this.page.evaluate((newColor) => {
            const input = document.querySelector('input[name="my-colors"]') as HTMLInputElement;
            if (input) {
                input.value = newColor;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, color);
    }

    // Sets the provided range in the slider
    async setRangeValue(rangeValue: string) {
        await this.page.evaluate((val) => {
            const range = document.querySelector('input[name="my-range"]') as HTMLInputElement;
            if (range) {
                range.value = val.toString();
                range.dispatchEvent(new Event('input', { bubbles: true }));
                range.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, rangeValue);
    }

    // Enter value in the date field    
    async enterDate(date: string) {
        await this.page.click(this.datePicker);
        await this.page.locator(this.datePicker).pressSequentially(date);
        await this.page.press(this.datePicker, 'Enter');
    }

    //Selects value in the dropdown field
    async dropDownSelectVal(ddSelectVal: string) {
        await this.page.selectOption('select[name="my-select"]', { label: ddSelectVal });
    }

    // Selects value in the dropdown field
    async dropDownDataList(ddDataListVal: string) {
        await this.page.fill('input[list="my-options"]', ddDataListVal);
        await this.page.press(this.dataList, 'Tab');
    }

    //This method enters values in the form by calling individual methods
    async fillForm(textInput: string, pwd: string, textArea: string, fileUploadLoc: string, ddSelectVal: string, ddDataListVal: string, checkBoxVal: string, radioButtonVal: string, colorSelection: string, rangeValue: string, date: string) {

        //Before filling the form, uncheck the default selected check boxes
        await this.page.locator(`label:has-text("Checked checkbox")`).uncheck();
        await this.page.locator(`label:has-text("Default checkbox")`).uncheck();

        await this.fillTextInput(textInput);
        await this.fillPassword(pwd);
        await this.fillTextArea(textArea);
        await this.selectFileUpload(fileUploadLoc);
        await this.selectCheckBoxVal(checkBoxVal);
        await this.dropDownSelectVal(ddSelectVal);
        await this.dropDownDataList(ddDataListVal);
        await this.selectRadioButtonVal(radioButtonVal);
        await this.setColor(colorSelection);
        await this.setRangeValue(rangeValue);
        await this.enterDate(date);
    }

    //Clicks the submit button and wait for the network idle state
    async submitForm() {
        await this.page.click(this.submitButton);
        await this.page.waitForLoadState('networkidle');

    }
}
