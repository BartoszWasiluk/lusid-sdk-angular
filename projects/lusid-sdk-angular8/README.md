# LUSID<sup>®</sup> angular (8) SDK

This repository enables the generation of an angular (8) SDK from the FINBOURNE OpenAPI specification using the [openapi-generator](https://github.com/OpenAPITools/openapi-generator) tool.

The code required to generate the SDK is in the `projects/lusid-sdk-angular8` folder, and the most up to date version of the OpenAPI specification can be downloaded from https://www.lusid.com/api/swagger/v0/swagger.json

# Generating the SDK

## PowerShell

* auto-generate typescript code from the latest LUSID OpenAPI specification. From the project root folder:

    `.\projects\lusid-sdk-angular8\UpdateGeneratedCode.ps1`

* update the version number of the SDK. From the `projects\lusid-sdk-angular8` folder:

    update the `version` in the `package.json` file (*_you should not need to do this as the published version should be part of the LUSID CI process_*)

* create a new version of the SDK. From the project root folder:

    `ng build lusid-sdk-angular8`

    This will create the new SDK in `dist\lusid-sdk-angular8`

* update the published [npm](https://preview.npmjs.com/package/@finbourne/lusid-sdk-angular8) package. From the `dist\lusid-sdk-angular8` folder 

    `cat package.json` (to check the version number that will be used)

    `npm publish` (*_you should not need to do this as the published version should be part of the LUSID CI process_*)
)

