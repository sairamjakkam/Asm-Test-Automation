import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import {expect} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import  encounterCasesPage from "../pages/encounterCasesPage";
import * as data from "../../data/test-data.json";

setDefaultTimeout(60 * 1000);

    Then('I enter patient name in searchBox as {string} and selects some options in {string} dropdown', async function (patientName, roomName) {
        //accessing dropdown
        
        expect(encounterCasesPage.pageHeadingLocator()).toHaveText(data.HeadingName);
        expect(encounterCasesPage.searchBoxLocator()).toBeEditable();
        await encounterCasesPage.clickSelectRoomDropdown();
        await pageFixture.page.waitForTimeout(1000)
        await encounterCasesPage.selectDropdownOptionWithValue(roomName);
    });