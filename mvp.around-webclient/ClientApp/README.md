# MvpAroundWebclient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

ng generate component GroupDetail --changeDetection=OnPush --style=scss --module=/components/groups/groups.module.ts
ng generate @ngrx/schematics:effect Group --root -m app.module.ts --flat false --group
ng generate component ConfirmDialog --changeDetection=OnPush --style=scss
ng generate component GroupItem --changeDetection=OnPush --style=scss --module=/components/groups/groups.module.ts
ng generate component NewGroup --changeDetection=OnPush --style=scss --module=/components/groups/groups.module.ts
ng generate @ngrx/schematics:entity Group --reducers reducers/index.ts --flat false
ng generate module groups --route groups --module app.module
ng generate @ngrx/schematics:entity Geolocation --reducers reducers/index.ts --flat false