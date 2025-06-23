import { Given } from '@cucumber/cucumber';
import { openMainSite} from '../support/utilities'
import {Browser, Page,} from 'playwright'


let browser: Browser;
let page: Page;

Given('I navigate to the main site', async function () {
     ({ browser, page } = await openMainSite());

    this.browser = browser;
    this.page = page;
});
