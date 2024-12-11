import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import {expect} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import  encounterPage from "../pages/encounterPage";
import * as data from "../../data/test-data.json";

let beforeTotalCases;
let afterTotalCases;
let caseID;

Given('I capture total Cases number and save it for varification', async function () {
    beforeTotalCases = await encounterPage.getTotalCases();
});

When('I click on CreateEncounter button, I should be navigated to Patient Search page', async function () {   
    await pageFixture.page.click(encounterPage.locators.casesPage.btn_createEncounter);

    //verify landing page
    expect(pageFixture.page.locator(encounterPage.locators.pageHeading)).toHaveText(data.encounter.patientSearch.headingName);
    await pageFixture.page.waitForTimeout(500);
});

When('I click on Skip to Documentation button and I land to Product log page with new Case ID', async function () {
    await pageFixture.page.click(encounterPage.locators.patientSearch.btn_skipToDocumentation);

    //verify landing page, missing detail error message and toast message
    expect(pageFixture.page.locator(encounterPage.locators.pageHeading)).toHaveText(data.encounter.cases.headingName);
    expect(pageFixture.page.locator(encounterPage.locators.productLog.errormsg_missingDetail)).toHaveText(data.encounter.productLog.errorMsg_missingDetails);
    expect(pageFixture.page.locator(encounterPage.locators.toastmsg_text)).toContainText(data.encounter.productLog.toastMsg_newCaseCreated);
    
    //capture new caseID from toast message
    caseID = await encounterPage.getCaseID();
    await pageFixture.page.click(encounterPage.locators.toastBtn_close);
    console.log(caseID);
});

When('I click on View Encounter Details button and I land to Review Encounter page with missing details', async function () {
    await pageFixture.page.click(encounterPage.locators.productLog.btn_viewEncounterDetails);
    
    //verify landing page
    expect(pageFixture.page.locator(encounterPage.locators.reviewEncounter.nav_pageHeading)).toHaveText(data.encounter.reviewEncounter.headingName);
    
    //verify missing detail label and missing detail toast message
    expect(pageFixture.page.locator(encounterPage.locators.reviewEncounter.errormsg_labels)).toContainText(data.encounter.reviewEncounter.errorMsg_detailsMissing);
    await pageFixture.page.click(encounterPage.locators.reviewEncounter.btn_markAsCompleted);
    expect(pageFixture.page.locator(encounterPage.locators.toastmsg_text)).toHaveText(data.encounter.reviewEncounter.toastMsg_requiredFields);
    await pageFixture.page.click(encounterPage.locators.toastBtn_close);
});

Then('I click on Encounter and verify Encounter CaseID and status', async function () {
    await pageFixture.page.click(encounterPage.locators.reviewEncounter.link_encounter);

    //wait till page load, fetch new TotalCases and compare with already captured Total Cases
    await pageFixture.page.waitForSelector(encounterPage.locators.casesPage.btn_firstrow_action);
    afterTotalCases = await encounterPage.getTotalCases();
    if(parseInt(afterTotalCases)==parseInt(beforeTotalCases))
    {
        throw new Error("Total case count has not increased even after new case creation!")
    }
   
    //search with newly created caseID and verify status
    await pageFixture.page.locator(encounterPage.locators.casesPage.input_searchBox).fill(caseID);
    await pageFixture.page.waitForSelector(encounterPage.locators.casesPage.btn_firstrow_action);
    expect(pageFixture.page.locator(encounterPage.locators.casesPage.text_firstrow_caseID)).toContainText(caseID);
    await pageFixture.page.waitForTimeout(1000);
    expect(pageFixture.page.locator(encounterPage.locators.casesPage.text_firstrow_upcoming_status)).toBeVisible();
});

When('I click on Add new Patient, enter patient details and add patient, verify patientID', async function () {
    
});

When('I land to View Patient Detail page and verify added details', async function () {
    
});