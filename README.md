# LusidSdkAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

The SDK can also be built by running the following script in the root folder passiing the url of the LUSID API swagger file:

```
$ ./build.sh http://api.lusid.com/swagger/v0/swagger.json
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Publishing

Create a `.npmrc` in the root folder containing the npm API token and run the following:

```
$ docker run --rm --name lusid-sdk-angular -v $(pwd):/usr/src -w /usr/src node:8.15.1-alpine npm publish dist/lusid-sdk-angular7
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
