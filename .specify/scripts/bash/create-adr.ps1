#!/usr/bin/env pwsh

# create-adr.ps1
#
# Creates a new Architecture Decision Record (ADR) file based on a template.
#
# Usage: ./create-adr.ps1 "<ADR Title>" [--json]
#
# This script:
# 1. Determines the output path for the ADR.
# 2. Reads the ADR template.
# 3. Fills in initial placeholders (ID, Title, Date).
# 4. Writes the new ADR file.
# 5. Outputs the ID and path in JSON or plain text.

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Title,

    [switch]$Json
)

$ErrorActionPreference = 'Stop'

# Source common functions
. "$PSScriptRoot/common.ps1"

# Get repo root
$repoRoot = (Get-FeaturePathsEnv).REPO_ROOT

# Determine output directory
$adrDir = Join-Path $repoRoot "history" "adr"

# Ensure output directory exists
if (-not (Test-Path $adrDir -PathType Container)) {
    New-Item -Path $adrDir -ItemType Directory | Out-Null
}

# Generate a unique ID and filename
$adrId = 1
$slug = ($Title -replace '[^a-zA-Z0-9\s-]', '' -replace '\s', '-' -replace '-+', '-' | ForEach-Object { $_.ToLowerInvariant() })
$fileName = "$($adrId.ToString('0000'))-$slug.adr.md"
$filePath = Join-Path $adrDir $fileName

while (Test-Path $filePath) {
    $adrId++
    $fileName = "$($adrId.ToString('0000'))-$slug.adr.md"
    $filePath = Join-Path $adrDir $fileName
}

# Read template
$templatePath = Join-Path $repoRoot ".specify" "templates" "adr-template.md"
if (-not (Test-Path $templatePath)) {
    $templatePath = Join-Path $repoRoot "templates" "adr-template.md"
}
$templateContent = Get-Content $templatePath -Raw

# Fill placeholders
$date = (Get-Date).ToString("yyyy-MM-dd")
$content = $templateContent -replace '\{\{ID\}\}', $adrId.ToString('0000') `
                           -replace '\{\{TITLE\}\}', $Title `
                           -replace '\{\{DATE\}\}', $date

# Write the new ADR file
Set-Content -Path $filePath -Value $content

# Output results
if ($Json) {
    [PSCustomObject]@{
        adr_id = $adrId.ToString('0000')
        adr_path = $filePath
    } | ConvertTo-Json -Compress
} else {
    Write-Output "ADR-$($adrId.ToString('0000')) created at $filePath"
}
