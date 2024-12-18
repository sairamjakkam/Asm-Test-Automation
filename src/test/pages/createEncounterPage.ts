import { pageFixture } from "../../hooks/pageFixture";


class CreateEncounter {

    locators = {

        pageHeading: "//div[text()='Vision Station']",
        roomNumberDropdown: "//div[normalize-space()='OR-1']",
        roomNumberHeading: "//p[text()='Interventional Radiology - OR-4']",
        verifyPatientName: "(//tbody/tr[last()]//p[@class='MuiTypography-root MuiTypography-body1 font-medium css-1lku62o-MuiTypography-root'])[1]",
        statusText: "//tbody/tr[last()]//span[text()='Upcoming']",

        encounterCreation: {

            addNewEncounterButton: "//button[normalize-space()='Add New Encounter']",
            popUpHeading: "//h5[text()='Create New Encounter']",
            fieldHeading: "//h6[text()='Patient Details ']",
            inputPatientMrn: "//input[@name='patientMRN']",
            searchPatientButton: "(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-141y60k-MuiButtonBase-root-MuiIconButton-root'])[2]",
            patientNameValue: "//input[@value='jessi ']",
            patientDob: "//input[@value='10/13/2024']",
            patientNameField: "input[id=':r8:']",

            patientDobValue: "//input[@name='patientDOB']",
            patientSuccessMsg: "//div[text()='Patient Created Successfully']",
            dobCalender: "(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium css-18gifxr-MuiButtonBase-root-MuiIconButton-root'])[2]",
            yearCalender: "//div[@class='MuiPickersFadeTransitionGroup-root css-31ca4x-MuiPickersFadeTransitionGroup-root']",
            dayCalender: "//button[normalize-space()='3']",
            createPatientBtn: "//button[normalize-space()='Create This Patient']"

        },

        Proceduredetails: {

            procedureDropdown: "//div[14]//div[1]",
            physicianDropdown: "(//p[text()='Add Physician here'])[2]",
            nurseDropdown: "//p[text()='Add Nurse here']",
            createEncounterButton: "//button[normalize-space()='Create this Encounter']",
            procedureValue: "//span[normalize-space()='Abdominal Fistulogram/Sinogram']",
            physicianValue: "(//div[@role='button'])[4]",
            nurseValue: "//span[normalize-space()='Robert Mccoy']",
            selectProcedure: "//button[normalize-space()='Select Procedures']",
            selectPhysician: "//button[normalize-space()='Select Physicians']",
            selectNurse: "//button[normalize-space()='Select Nurses']",

        }
    }

    //passing dynamic dropdown value
    async selectDropdownOptionWithValue(dropdownValue: string) {
        await pageFixture.page.click(`//li[text()='${dropdownValue}']`);

    }

    //passing the roomNumber dynamically from feature file, roomnumber has to be changed only in feature file and testdata
    roomNumberHeadingText(roomNumber: string): string {
        return `//p[text()='Interventional Radiology - ${roomNumber}']`;
    }

    //logic for dynamic locater for passing dob year from feature file
    yearValue(birthYear: string): string {
        return `//button[text()='${birthYear}']`;
    }

    //generating random number for new patient MRN
     generateRandomMRN(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

}

//object creation and export
const createEncounter = new CreateEncounter();
export default createEncounter;