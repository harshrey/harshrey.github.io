$ErrorActionPreference = 'Stop'

$voltaPath = 'C:\Program Files\Volta\volta.exe'
$voltaBinDir = 'C:\Program Files\Volta'

if (Test-Path $voltaBinDir) {
  $env:Path = "$voltaBinDir;" + $env:Path
}

if (-not (Get-Command volta -ErrorAction SilentlyContinue) -and -not (Test-Path $voltaPath)) {
  winget install Volta.Volta --accept-package-agreements --accept-source-agreements
}

if (-not (Get-Command volta -ErrorAction SilentlyContinue) -and (Test-Path $voltaPath)) {
  $env:Path = "$voltaBinDir;" + $env:Path
}

volta install node@20
volta pin node@20
npm install