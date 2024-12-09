import { pageFixture } from "../../hooks/pageFixture";
  
 class EncounterCasesPage{

    private Elements = {
        searchBox_loc: ".flex-1 .MuiBox-root",
        searchBoxInput_loc: ".flex-1 .MuiBox-root input",
        pageHeading_loc: ".text-2xl",
        roomDropdown_loc: "(//div[@role='combobox'])[1]"
    }


    // this helps to assert in spec file
    searchBoxLocator() {
        return pageFixture.page.locator(this.Elements.searchBox_loc);
    }
    pageHeadingLocator() {
        return pageFixture.page.locator(this.Elements.pageHeading_loc);
    }
    //type string to search box
    async enterSearchString(data : string) {         
        await pageFixture.page.locator(this.Elements.searchBoxInput_loc).fill(data);
    }

    //click select Room dropdown
    async clickSelectRoomDropdown() {         
          await pageFixture.page.click(this.Elements.roomDropdown_loc);
    }

    //select locator based on dynamic locator
    async selectDropdownOptionWithValue(dropdownValue: string) {
        await pageFixture.page.click(`//li[@data-value="${dropdownValue}"]//input`);
    }
}

const encounterCasesPage = new EncounterCasesPage();
export default encounterCasesPage;