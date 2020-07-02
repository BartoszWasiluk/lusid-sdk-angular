$baseDir = $PSScriptRoot
$genRelDir = "src/lib/generated"
$genFullDir = Join-Path -Path $baseDir -ChildPath $genRelDir

# Remove any existing generated files
Get-ChildItem -Path $genFullDir -Include * | Remove-Item -Recurse

Write-Output "baseDir is $baseDir"

# Generate the required files
docker run --rm -v ${baseDir}:/local `
    openapitools/openapi-generator-cli:v4.0.3 generate `
    -i https://api.lusid.com/swagger/v0/swagger.json `
    -g typescript-angular `
    -o /local/$genRelDir `
    --type-mappings object=any `
    --additional-properties ngVersion=8 `
    --additional-properties supportsES6=true

