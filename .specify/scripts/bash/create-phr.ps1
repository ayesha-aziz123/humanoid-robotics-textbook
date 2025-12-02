#!/usr/bin/env pwsh

# create-phr.ps1
#
# Creates a new Prompt History Record (PHR) file based on a template.
#
# Usage: ./create-phr.ps1 --title "<PHR Title>" --stage <stage> [--feature <feature-slug>] [--json]
#
# This script:
# 1. Determines the output path for the PHR based on the stage and optional feature slug.
# 2. Reads the PHR template.
# 3. Fills in initial placeholders (ID, TITLE, STAGE, DATE_ISO, FEATURE, BRANCH, USER).
# 4. Writes the new PHR file.
# 5. Outputs the ID, path, and context in JSON or plain text.

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$Title,

    [Parameter(Mandatory=$true)]
    [string]$Stage,

    [string]$Feature,

    [switch]$Json
)

$ErrorActionPreference = 'Stop'

# Source common functions
. "$PSScriptRoot/common.ps1"

# Get feature paths and current branch
$paths = Get-FeaturePathsEnv
$repoRoot = $paths.REPO_ROOT
$currentBranch = $paths.CURRENT_BRANCH
$gitUserName = (git config user.name).Trim()
$gitUserEmail = (git config user.email).Trim()
$dateIso = (Get-Date).ToString("yyyy-MM-dd")

# Determine output directory
$phrDir = Join-Path $repoRoot "history" "prompts"
switch ($Stage) {
    "constitution" { $phrDir = Join-Path $phrDir "constitution" }
    "spec" { $phrDir = Join-Path $phrDir $Feature }
    "plan" { $phrDir = Join-Path $phrDir $Feature }
    "tasks" { $phrDir = Join-Path $phrDir $Feature }
    "red" { $phrDir = Join-Path $phrDir $Feature }
    "green" { $phrDir = Join-Path $phrDir $Feature }
    "refactor" { $phrDir = Join-Path $phrDir $Feature }
    "explainer" { $phrDir = Join-Path $phrDir $Feature }
    "misc" { $phrDir = Join-Path $phrDir $Feature }
    default { $phrDir = Join-Path $phrDir "general" }
}

# Ensure output directory exists
if (-not (Test-Path $phrDir -PathType Container)) {
    New-Item -Path $phrDir -ItemType Directory | Out-Null
}

# Generate a unique ID and filename
$phrId = 1
$slug = ($Title -replace '[^a-zA-Z0-9\s-]', '' -replace '\s', '-' -replace '-+', '-' | ForEach-Object { $_.ToLowerInvariant() })
$fileName = "$($phrId.ToString('0000'))-$slug.$Stage.prompt.md"
$filePath = Join-Path $phrDir $fileName

while (Test-Path $filePath) {
    $phrId++
    $fileName = "$($phrId.ToString('0000'))-$slug.$Stage.prompt.md"
    $filePath = Join-Path $phrDir $fileName
}

# Read template
$templatePath = Join-Path $repoRoot ".specify" "templates" "phr-template.prompt.md"
if (-not (Test-Path $templatePath)) {
    $templatePath = Join-Path $repoRoot "templates" "phr-template.prompt.md"
}
$templateContent = Get-Content $templatePath -Raw

# Fill placeholders
$content = $templateContent -replace '\{\{ID\}\}', $phrId.ToString('0000') `
                           -replace '\{\{TITLE\}\}', $Title `
                           -replace '\{\{STAGE\}\}', $Stage `
                           -replace '\{\{DATE_ISO\}\}', $dateIso `
                           -replace '\{\{SURFACE\}\}', 'agent' `
                           -replace '\{\{MODEL\}\}', 'claude-sonnet-4-5-20250929' `
                           -replace '\{\{FEATURE\}\}', ($Feature -split '/' | Select-Object -Last 1) `
                           -replace '\{\{BRANCH\}\}', $currentBranch `
                           -replace '\{\{USER_NAME\}\}', $gitUserName `
                           -replace '\{\{USER_EMAIL\}\}', $gitUserEmail `
                           -replace '\{\{COMMAND\}\}', '/sp.phr'

# Write the new PHR file
Set-Content -Path $filePath -Value $content

# Output results
if ($Json) {
    [PSCustomObject]@{
        id = $phrId.ToString('0000')
        path = $filePath
        context = $Stage
        stage = $Stage
        feature = ($Feature -split '/' | Select-Object -Last 1)
    } | ConvertTo-Json -Compress
} else {
    Write-Output "PHR-$($phrId.ToString('0000')) created at $filePath"
}
