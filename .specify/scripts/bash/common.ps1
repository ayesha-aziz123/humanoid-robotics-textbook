function Get-FeaturePathsEnv {
    [CmdletBinding()]
    param()

    $scriptRoot = (Get-Item -Path $PSScriptRoot).Parent.Parent.FullName
    $repoRoot = (Get-Item -Path $scriptRoot).Parent.FullName
    $currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
    $featureName = $env:SPECIFY_FEATURE
    if ([string]::IsNullOrEmpty($featureName)) {
        $featureName = $currentBranch
    }
    $featureDir = Join-Path $repoRoot "specs" $featureName
    $featureSpec = Join-Path $featureDir "spec.md"
    $implPlan = Join-Path $featureDir "plan.md"
    $tasks = Join-Path $featureDir "tasks.md"
    $research = Join-Path $featureDir "research.md"
    $dataModel = Join-Path $featureDir "data-model.md"
    $contractsDir = Join-Path $featureDir "contracts"
    $quickstart = Join-Path $featureDir "quickstart.md"

    # Check if git is available
    $hasGit = $false
    try {
        git status | Out-Null
        $hasGit = $true
    } catch {
        # Git not available, or not a git repo
    }

    [PSCustomObject]@{
        REPO_ROOT = $repoRoot
        CURRENT_BRANCH = $currentBranch
        FEATURE_NAME = $featureName
        FEATURE_DIR = $featureDir
        FEATURE_SPEC = $featureSpec
        IMPL_PLAN = $implPlan
        TASKS = $tasks
        RESEARCH = $research
        DATA_MODEL = $dataModel
        CONTRACTS_DIR = $contractsDir
        QUICKSTART = $quickstart
        HAS_GIT = $hasGit
    }
}

function Test-FeatureBranch {
    [CmdletBinding()]
    param(
        [string]$Branch,
        [switch]$HasGit
    )
    if (-not $HasGit) {
        Write-Host "WARNING: Not a git repository. Skipping branch validation."
        return $true
    }
    if ($Branch -like "001-*-*") {
        return $true
    } else {
        Write-Output "ERROR: Current branch '$Branch' does not follow the feature branch naming convention (e.g., '001-rag-chatbot')."
        Write-Output "Please checkout a feature branch or set the SPECIFY_FEATURE environment variable."
        return $false
    }
}

function Test-FileExists {
    [CmdletBinding()]
    param(
        [string]$Path,
        [string]$Description
    )
    if (Test-Path $Path -PathType Leaf) {
        Write-Output "  - $Description (Found)"
        return $true
    } else {
        Write-Output "  - $Description (Not Found)"
        return $false
    }
}

function Test-DirHasFiles {
    [CmdletBinding()]
    param(
        [string]$Path,
        [string]$Description
    )
    if (Test-Path $Path -PathType Container) {
        if ((Get-ChildItem -Path $Path -ErrorAction SilentlyContinue | Select-Object -First 1)) {
            Write-Output "  - $Description (Found with files)"
            return $true
        } else {
            Write-Output "  - $Description (Found, but empty)"
            return $false
        }
    } else {
        Write-Output "  - $Description (Not Found)"
        return $false
    }
}
