import { expect, Page} from 'playwright/test';

export class DropDownPage {
    private page: Page;
    private h1 = 'h1.display-6';

    // Defining all the locators on the page
    private blueDropDown = '#my-dropdown-1';
    private greenDropDown = '#my-dropdown-2';
    private redDropDown = '#my-dropdown-3';
    
    constructor(page: Page) {
        this.page = page;
    }

    //Gets the page title
    async getHeaderText(): Promise<string | null> {
        return this.page.textContent(this.h1);
    }

async clickBlueDropDown(){
    await this.page.locator(this.blueDropDown).click();
    await expect(this.page.locator('#my-dropdown-1 + ul.dropdown-menu.show')).toBeVisible();
    console.log("The Blue dropdown values are validated to be visible when the dropdown is clicked")
};

async rightClickGreenDropDown(){
    await this.page.locator(this.greenDropDown).click({button: 'right'});
    await expect(this.page.locator('#my-dropdown-2 + ul.dropdown-menu')).toBeVisible();
    console.log("The Green dropdown values are validated to be visible on right click.")
};

async doubleClickRedDropDown(){
    await this.page.locator(this.redDropDown).dblclick();
    await expect(this.page.locator('#my-dropdown-3 + ul.dropdown-menu')).toBeVisible();
    console.log("The Red dropdown values are validated to be visible on double click.")
};
}
