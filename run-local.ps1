$ErrorActionPreference = 'Stop'

$voltaBinDir = 'C:\Program Files\Volta'
if (Test-Path $voltaBinDir) {
  $env:Path = "$voltaBinDir;" + $env:Path
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm is not available. Run .\\setup.ps1 first or reopen your terminal."
}

Copy-Item -Path "$PSScriptRoot\index.source.html" -Destination "$PSScriptRoot\index.html" -Force
& "$PSScriptRoot\setup.ps1"
Start-Process "http://127.0.0.1:5173/"
npm run dev -- --host 127.0.0.1 --port 5173