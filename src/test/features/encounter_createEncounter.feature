Feature: Create Encounter and verify
    
    Scenario: test
    Given I navigated to encounter case page and varified page
    Then I click on Encounter and verify Encounter CaseID and status
    
    @test
    Scenario: Create Encounter without entering patient details, productlog and verify missing details and cases list 
        Given I navigated to encounter case page and varified page
        And I capture total Cases number and save it for varification
        When I click on CreateEncounter button, I should be navigated to Patient Search page
        And I click on Skip to Documentation button and I land to Product log page with new Case ID
        And I click on View Encounter Details button and I land to Review Encounter page with missing details
        Then I click on Encounter and verify Encounter CaseID and status

    Scenario: Create Encounter with creating new patient and verify the details
        Given I navigated to encounter case page and varified page
        And I capture total Cases number and save it for varification
        When I click on CreateEncounter button, I should be navigated to Patient Search page
        And I click on Add new Patient, enter patient details and add patient, verify patientID
        And I land to View Patient Detail page and verify added details
        And I click on Skip to Documentation button and I land to Product log page with new Case ID
        And I click on View Encounter Details button and I land to Review Encounter page with missing details
        Then I click on Encounter and verify Encounter CaseID and status

        Examples:
        | patientname | dateOfBirth |
        | sam         | 01/01/1988  |

    Scenario: Create Encounter with existing patient, encounter and procedure details and verify the details


    Scenario: Create Encounter with adding product log and verify added details



    Scenario: Create Encounter with all details and product log, confirm document, mark as complete and verify status


