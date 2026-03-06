$ErrorActionPreference = 'Stop'

$url = 'http://127.0.0.1:5173/index.html'

try {
  $response = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing
  Write-Host "UP ($($response.StatusCode)) - $url"
}
catch {
  Write-Host "DOWN - $url"
  exit 1
}