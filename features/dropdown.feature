Feature: Dropdown Page

    Scenario: Click on dropdown and validate values
      Given I navigate to the main site
      When I go to the dropdown page
      Then I should see the dropdown page header text as "Dropdown menu"
      Then I left click on the blue dropdown and validate that the values are displayed
      Then I right click on the green dropdown and validate that the values are displayed
      Then I double click on the red dropdown and validate that the values are displayed
      Then I close the browser