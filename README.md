# ReactNative-Monogo-star_wars

# 1. Run

1. Create `.env` file in project root, paste following envs:
   ```
   API_URL=https://swapi.dev/api/people
   ```
2. Run
   - iOS: `$ yarn && cd ios && pod install && cd .. && yarn ios`
   - Android: `$ yarn && yarn android`

# Task

Please create a React Native application that will display a Star Wars
characters list from an API.
The list should have a search functionality to search for a character by
name and filter functionality to filter the list by one of the character’s
attributes (you can choose between character’s homeworld or film
connection) - filter should be displayed as a list of checkboxes and after
checking each one of them, the list should be filtered.
Users should be able to display a detailed page of each character. On the
detailed view there should be an information about the homeworld
planet of the character and a button which will lazy load more information
about a specific planet and display it in the modal.
Application should have adding characters to favorite list functionality.
Users should be able to add characters to their favorite list from a detailed
view of each character as well as from the characters list, by clicking on a
button.
List of favorites should be a separate page from which you can remove each
character.
Application should have a contact form page with first name, last name,
email, polish postal code, telephone and textarea in the form.
There should be a main navigation bar from which you can navigate
through pages - characters list, favorite list and contact page..

# Requirements:

● You have to use SWAPI (Star Wars API) - You can choose to use
REST (https://swapi.dev/) or GraphQL version of the API
(https://github.com/graphql/swapi-graphql) - GraphQL is very
appreciated.
● App should be written in React Native
● You have to use TypeScript.
● Project should be configured to use ≥
ECMAScript 2020.
● The characters list should have a pagination.
● Any API related errors and UI messages should be handled and
displayed for the user.
● Application should handle 404 pages.
● Form fields should have a proper validation.
● Favorite list state should be persisted when the user leaves or
reloads the page.
● You can choose styles solution (styled
Components, CSS modules) Aesthetics are appreciated.
● Using UI components libraries is not prohibited but designing them
on your own is very appreciated.
● You have to provide a link to the GitHub repository with the
project.
