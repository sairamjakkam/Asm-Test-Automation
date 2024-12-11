import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import {expect} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import  encounterPage from "../pages/encounterPage";
import * as data from "../../data/test-data.json";

setDefaultTimeout(60 * 1000);

    Given('I navigated to encounter case page and varified page', async function () {
        await pageFixture.page.goto(process.env.BASEURL);

        //varify landing page
        expect(pageFixture.page.locator(encounterPage.locators.pageHeading)).toHaveText(data.encounter.cases.HeadingName);
    });

    Then('I enter patient name in searchBox as {string} and selects some options in {string} dropdown', async function (patientName, roomName) {
        //accessing dropdown        
        await pageFixture.page.click(encounterPage.locators.casesPage.roomDropdown);
        await pageFixture.page.waitForTimeout(500)
        await encounterPage.selectDropdownOptionWithValue(roomName);
    });