
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import encounterPage from "../pages/encounterPage";
import * as data from "../../data/test-data.json";
import createEncounter from "../pages/createEncounterPage";






Given('I am at the procedure log page', async function () {

  await pageFixture.page.goto(process.env.BASEURL);
  await pageFixture.page.waitForTimeout(3000);

});

Then('I should verify the landing page', async function () {

  await expect(pageFixture.page.locator(createEncounter.locators.pageHeading)).toHaveText(data.encounter.Procedurelog.headingName);
  console.log(data.encounter.Procedurelog.headingName);
  console.log(createEncounter.locators.pageHeading);

})


When('I click on the {string} dropdown and select any room number', async function (string) {

  await pageFixture.page.click(createEncounter.locators.roomNumberDropdown);
  await createEncounter.selectDropdownOptionWithValue(string);

});


Then('I should verfiy the room number heading text after changing', async function () {

  await expect(pageFixture.page.locator(createEncounter.locators.roomNumberHeading)).toContainText(data.encounter.Procedurelog.roomNumberHeading);

});


When('I click the Create Encounter button , and verify the popup with encounter text and field', async function () {

  await pageFixture.page.click(createEncounter.locators.encounterCreation.addNewEncounterButton);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.popUpHeading)).toHaveText(data.encounter.Createencounter.headingName);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.fieldHeading)).toHaveText(data.encounter.Createencounter.pateintNameField);

});



When('I enter existing {string} and click on search button', async function (patientMRN) {

  await pageFixture.page.click(createEncounter.locators.encounterCreation.inputPatientMrn);
  await pageFixture.page.locator(createEncounter.locators.encounterCreation.inputPatientMrn).fill(patientMRN);
  await pageFixture.page.hover(createEncounter.locators.encounterCreation.searchPatientButton);
  await pageFixture.page.click(createEncounter.locators.encounterCreation.searchPatientButton);
  await pageFixture.page.waitForTimeout(2000);

});



Then('Patient name and dob fields should be pre filled and disable', async function () {

  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameField)).toBeDisabled();
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientDob)).toBeDisabled();
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameValue)).toHaveValue(data.encounter.Createencounter.patientName);
  await expect(pageFixture.page.locator(createEncounter.locators.encounterCreation.patientDobValue)).toHaveValue(data.encounter.Createencounter.patientDob);
  const storedPatientName = await pageFixture.page.locator(createEncounter.locators.encounterCreation.patientNameValue).inputValue();
  console.log(storedPatientName);
  console.log('test');

});



When('I enter all the mandatory fields and click on the create encounter button', async function () {

  await pageFixture.page.locator(createEncounter.locators.Proceduredetails.inputCaseId);
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
  await pageFixture.page.waitForTimeout(3000);


});


Then('I verify the new encounter created with the patient name and status', async function () {

  await pageFixture.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  let name = await pageFixture.page.locator(createEncounter.locators.verifyPatientName).textContent();
  await expect(pageFixture.page.locator(createEncounter.locators.verifyPatientName)).toHaveText(name);

});