Feature: Web Form Page

  Scenario: Submit web form with valid data
    Given I navigate to the main site
    When I go to the web form page
    Then I should see the header text as "Web form"
    When I fill out and submit the form with text "Abhishek Gupta", password "Secret123", text area "This is a test Playwright Framework created for NZ Post", file "testData/sample.txt", dropdown "Two", datalist "Seattle", checkbox "Default checkbox", radio "Default radio", colorSelection "#00ff00", rangeValue "2", and date "06/19/2025"

Then I should see a success message "Received!"