Feature: Create Encounter and verify 


@EncounterFlowExistMRN
Scenario: Create encounter with the existing pateint MRN ,in a selected room and verify the room number , encounter details such as pateint name and status

Given I am at the procedure log page 
Then I should verify the landing page
When I click on the "<room number>" dropdown and select any room number 
Then I should verfiy the room number heading text after changing to "<room number>"
When I click the Create Encounter button , and verify the popup with encounter text and field
And  I enter existing "<patientMRNs>" and click on search button
Then Patient name and dob fields should be pre filled and disable
When I enter all the mandatory fields and click on the create encounter button
Then I verify the new encounter created with the patient name and status

 Examples:
        | patientMRNs | room number |
        | 12345      |   OR-8       |



@EncounterFlowNewMRN
Scenario: Create new encounter with new MRN , in a selected room and verify the room number , enounter details such as pateint name and status

Given I am at the procedure log page 
Then I should verify the landing page
When I click on the "<room number>" dropdown and select any room number 
Then I should verfiy the room number heading text after changing to "<room number>"
When I click the Create Encounter button , and verify the popup with encounter text and field
And  I enter new "<patientMRN>" and click on search button
Then Patient name and dob fields should be enabled
When I enter "<Patient name>" and patient "<dob>" and click on create patient button
And I enter all the mandatory fields and click on the create encounter button
Then I verify the new encounter created with the patient name and status

 Examples:
         | room number | Patient name       | dob |
         |   OR-8      |  jessi             | 1983|