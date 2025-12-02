#!/usr/bin/env pwsh
# setup-plan.ps1

[CmdletBinding()]
param(
    [switch]$Json,
    [string]$Branch
)

$ErrorActionPreference = 'Stop'

# Resolve repository root
function Find-RepositoryRoot {
    param(
        [string]$StartDir,
        [string[]]$Markers = @('.git', '.specify')
    )
    $current = Resolve-Path $StartDir
    while ($true) {
        foreach ($marker in $Markers) {
            if (Test-Path (Join-Path $current $marker)) {
                return $current
            }
        }
        $parent = Split-Path $current -Parent
        if ($parent -eq $current) {
            # Reached filesystem root without finding markers
            return $null
        }
        $current = $parent
    }
}

$fallbackRoot = (Find-RepositoryRoot -StartDir $PSScriptRoot)
if (-not $fallbackRoot) {
    Write-Error "Error: Could not determine repository root. Please run this script from within the repository."
    exit 1
}

try {
    $repoRoot = git rev-parse --show-toplevel 2>$null
    if ($LASTEXITCODE -eq 0) {
        $hasGit = $true
    } else {
        throw "Git not available"
    }
} catch {
    $repoRoot = $fallbackRoot
    $hasGit = $false
}

Set-Location $repoRoot

$branchName = $null
if ($PSBoundParameters.ContainsKey('Branch')) {
    $branchName = $Branch
} else {
    $branchName = $env:SPECIFY_FEATURE # Fallback to environment variable
}

if (-not $branchName) {
    Write-Error "Error: SPECIFY_FEATURE environment variable not set. Please run create-new-feature.ps1 first."
    exit 1
}

$specsDir = Join-Path $repoRoot 'specs'
$featureSpec = Join-Path $specsDir $branchName 'spec.md'
$implPlan = Join-Path $specsDir $branchName 'plan.md'

# Copy plan template if it doesn't exist
$planTemplate = Join-Path $repoRoot '.specify/templates/plan-template.md'
if (-not (Test-Path $implPlan)) {
    if (Test-Path $planTemplate) {
        Copy-Item $planTemplate $implPlan -Force
    } else {
        New-Item -ItemType File -Path $implPlan | Out-Null
    }
}

if ($Json) {
    $obj = [PSCustomObject]@{
        FEATURE_SPEC = $featureSpec
        IMPL_PLAN = $implPlan
        SPECS_DIR = $specsDir
        BRANCH = $branchName
        REPO_ROOT = $repoRoot
    }
    $obj | ConvertTo-Json -Compress
} else {
    Write-Output "FEATURE_SPEC: $featureSpec"
    Write-Output "IMPL_PLAN: $implPlan"
    Write-Output "SPECS_DIR: $specsDir"
    Write-Output "BRANCH: $branchName"
    Write-Output "REPO_ROOT: $repoRoot"
}
