# Youtube

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Notes

1- Videos retrieved from youtube server for first time only then will be cached in localstorage.

2- "View Videos" button is disabled unless you enter a channel id, and if invalid id entered, you will get alert with error message.

3- You can sort table with titles and publish date.

4- The table displays only 15 videos from channel, 5 per page. and it's configurable from code.

5- I've created database on firebase to set and get video rate and if it is favorite.

6- In "details.component.html", you can find the commented video in line 3 as i thought that you need to display only video thumbnails,
   if you uncomment this line you will be able to display the youtube video and play it.
   
7- The application is not mobile responsive.

## Development server

After cloning, run npm install then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
