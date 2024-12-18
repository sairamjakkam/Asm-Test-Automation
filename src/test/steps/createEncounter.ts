
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import * as data from "../../data/test-data.json";
import createEncounter from "../pages/createEncounterPage";
import { stat } from "fs";


let NAME
let STATUS


Given('I am at the procedure log page', async function () {

  //navigating to the page
  await pageFixture.page.goto(process.env.BASEURL);
  await pageFixture.page.waitForTimeout(4000);

});

Then('I should verify the landing page', async function () {

  //verifying landing page
  await pageFixture.page.waitForTimeout(2000);
  await expect(pageFixture.page.locator(createEncounter.locators.pageHeading)).toHaveText(data.encounter.Procedurelog.headingName);
  console.log(data.encounter.Procedurelog.headingName);
  console.log(createEncounter.locators.pageHeading);

});

When('I click on the {string} dropdown and select any room number', async function (string) {

  //selecting room number dropdown
  await pageFixture.page.click(createEncounter.locators.roomNumberDropdown);
  await createEncounter.selectDropdownOptionWithValue(string);

});


Then('I should verfiy the room number heading text after changing to {string}', async function (string) {

  //verifying the roomnumber dropdown text dynamically

  const dynamicRoomHeadingLocator = createEncounter.roomNumberHeadingText(string);
  await expect(pageFixture.page.locator(dynamicRoomHeadingLocator)).toContainText(data.encounter.Procedurelog.roomNumberHeading);

});

When('I click the Create Encounter button , and verify the popup with encounter text and field', async function () {

  //click and verify the encounter page
  await pageFixture.page.click(createEncounter.locators.encounterCreation.addNewEncounterButton);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.popUpHeading)).toHaveText(data.encounter.Createencounter.headingName);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.fieldHeading)).toHaveText(data.encounter.Createencounter.pateintNameField);


});

When('I enter existing {string} and click on search button', async function (patientMRNs) {

  //entering all the necessary details in the fields
  await pageFixture.page.click(createEncounter.locators.encounterCreation.inputPatientMrn);
  await pageFixture.page.locator(createEncounter.locators.encounterCreation.inputPatientMrn).fill(patientMRNs);
  await pageFixture.page.hover(createEncounter.locators.encounterCreation.searchPatientButton);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.searchPatientButton);

});

Then('Patient name and dob fields should be pre filled and disable', async function () {

  //verifying the auto filled details
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameField)).toBeDisabled();
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientDob)).toBeDisabled();
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameValue)).toHaveValue(data.encounter.Createencounter.patientName);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientDobValue)).toHaveValue(data.encounter.Createencounter.patientDob);
  const storedPatientName = await pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameValue).inputValue();
  console.log(storedPatientName);

});

When('I enter all the mandatory fields and click on the create encounter button', async function () {

  //entering the physician,procedure and nurse fields
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.procedureDropdown);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.procedureValue);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.selectProcedure);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.physicianDropdown);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.physicianValue);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.selectPhysician);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.nurseDropdown);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.nurseValue);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.selectNurse);
  await pageFixture.page.click(createEncounter.locators.Proceduredetails.createEncounterButton);
  await pageFixture.page.waitForTimeout(2000);

});

Then('I verify the new encounter created with the patient name and status', async function () {

  //scrolling to the bottom of page to verify the newly created encounter
  await pageFixture.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  //verify the newly created encounter with the patient name captured before
  NAME = await pageFixture.page.locator(createEncounter.locators.verifyPatientName).textContent();
  await expect(pageFixture.page.locator(createEncounter.locators.verifyPatientName)).toHaveText(data.encounter.Createencounter.patientName);
  console.log(NAME)
  STATUS = await pageFixture.page.locator(createEncounter.locators.statusText).textContent();
  await expect(pageFixture.page.locator(createEncounter.locators.statusText)).toHaveText(STATUS);
  console.log(STATUS)
});


When('I enter new {string} and click on search button', async function (PatientMRN) {

  //Created generic logic in page class for generating the random unique MRN on everyrun and passed below
  const randomMRN= createEncounter.generateRandomMRN();
  console.log(`Generated MRN: ${randomMRN}`);
  await pageFixture.page.locator(createEncounter.locators.encounterCreation.inputPatientMrn).fill(randomMRN);
  await pageFixture.page.hover(createEncounter.locators.encounterCreation.searchPatientButton);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.searchPatientButton);
  
});


Then('Patient name and dob fields should be enabled', async function () {

  //verifying the fields are enabled
  expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameField).isEnabled());
  expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientDob).isEnabled());
  
});

When('I enter {string} and patient {string} and click on create patient button', async function (PatientName, dob) {

  //passing the name and dob from feature file
  expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameField).fill(PatientName));
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.page.hover(createEncounter.locators.encounterCreation.dobCalender);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.dobCalender);
  await pageFixture.page.hover(createEncounter.locators.encounterCreation.yearCalender);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.yearCalender);
  const dynamicBirthYearLocator = createEncounter.yearValue(dob);
  await pageFixture.page.locator(dynamicBirthYearLocator).click();
  await pageFixture.page.click(createEncounter.locators.encounterCreation.dayCalender);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.createPatientBtn);

});
