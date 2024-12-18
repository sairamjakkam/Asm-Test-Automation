Feature: Documenting the product after scanning/adding manually


@supplyproduct
Scenario: Verify documenting the supply product , adding the supply products and verify it is added , verifying the document all button should be disabled
verify designation field has supply selected ,verifying transaction type should be default Used patient procedure , verify 
the text fields are enable and disabled , verify the notes filed is saved after giving data, and verify the brand name ,
catalog number , designation , Item id , consumption time in the product details page.


Given I am at the procedure log page 
Then I should verify the landing page
When I click on start procedure 
Then I verify the scan button is visible and I verify the add button is visible
When I click on the add button and manually add a supply product "<catalog number>" by searching 
Then I verify the product count should be 1 and document all button should be disable
When I click on edit button 
Then I should verify popup heading and designation as supply and transaction as Used patient procedure 
And I verify the "<catalog number>" displayed on the product details and Recorded time field should be disabled and all fileds should be enabled 
When I enter  "<sample text>" in notes field and click on save and click on view product log
Then 

