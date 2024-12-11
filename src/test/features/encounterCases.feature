Feature: Encounter cases AllRooms dropdown check

  # Background:
  #   Given User navigates to the application
  #   And User click on the login link

  @test
  Scenario: I should be filter cases by AllRoom dropdown
    Given I navigated to encounter case page and varified page
    When I enter patient name in searchBox as "<patientname>" and selects some options in "<roomname>" dropdown
    
     Examples:
      | patientname | roomname  |
      | ram         | OR 2      |
      | sam         | OR 4      | 