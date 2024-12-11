import { pageFixture } from "../../hooks/pageFixture";

  
 class EncounterPage{

    locators = {
        pageHeading: ".text-2xl",
        toastmsg_text: "//div[@role='alert']//div[2]",
        toastBtn_close: ".Toastify__close-button",
        casesPage: {
            searchBox: ".flex-1 .MuiBox-root",
            input_searchBox: ".flex-1 .MuiBox-root input",
            roomDropdown: "(//div[@role='combobox'])[1]",
            btn_createEncounter: "//button[@data-testid='create-encounter-button']",
            lbl_totalCases: "//div[@data-testid='encounters-container']//h4",
            text_firstrow_caseID: "(//div[@data-field='caseId'])[2]",
            text_firstrow_upcoming_status: "//span[contains(text(), 'Upcoming')]",
            btn_firstrow_action: "(//div[@data-field='actions'])[2]"
        },
        patientSearch: {
            btn_skipToDocumentation: "//button[contains(text(),'Skip to Documentaion')]"
        },
        productLog: {
            text_startDocument: "//p[contains(text(), 'Start Documenting Products')]",
            input_search: "//input[@id=':r4o:']",
            errormsg_missingDetail: "//span[contains(@class,'text-dark-red')]",
            btn_viewEncounterDetails: "//button[contains(text(),'View Encounter Details')]",
            btn_confirmNDocument: "//button[contains(text(),'Confirm & Document')]"
        },
        reviewEncounter: {
            nav_pageHeading: "//nav[@aria-label='breadcrumb']//ol//li//p",
            errormsg_labels: "(//span[contains(text(),'details missing')])[1]",
            btn_markAsCompleted: "//button[contains(text(),'Mark as Completed')]",
            link_encounter: "(//a[@href='/encounter'])[2]"
        }
    }

    //Dynamic locators actions
    async selectDropdownOptionWithValue(dropdownValue: string) {
        await pageFixture.page.click(`//li[@data-value="${dropdownValue}"]//input`);
    }
    
    //fetching and returning text
    async getTotalCases(){
        let totalCases = await pageFixture.page.locator(this.locators.casesPage.lbl_totalCases).textContent();
        totalCases = totalCases.substring(7,totalCases.length - 1);
        return totalCases;
    }
    async getCaseID(){
        let toastmsg = await pageFixture.page.locator(this.locators.toastmsg_text).textContent();
        let caseID = toastmsg.replace("Encounter created successfully ", "").trim()
        console.log(caseID)
        return caseID;
    }
}

//object creation and export
const encounterPage = new EncounterPage();
export default encounterPage;