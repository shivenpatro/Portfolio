# Ensure .nojekyll file exists in the out directory
Write-Host "Creating .nojekyll file..." -ForegroundColor Yellow
New-Item -Path "out/.nojekyll" -ItemType File -Force | Out-Null

# Copy CNAME to the out directory if it exists
if (Test-Path -Path "public/CNAME") {
    Write-Host "Copying CNAME file..." -ForegroundColor Yellow
    Copy-Item -Path "public/CNAME" -Destination "out/CNAME" -Force
}

# Commit and push changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Replace Higgs Boson project with HashChat"

# Push to main branch
Write-Host "Pushing to main branch..." -ForegroundColor Yellow
git push -u origin main

Write-Host "Deployment preparation complete!" -ForegroundColor Green
Write-Host "GitHub Actions will now build and deploy your site." -ForegroundColor Green
Write-Host "Check your repository's Actions tab for progress." -ForegroundColor Yellow
Write-Host "Your site should be available at: https://shivenpatro.github.io/Portfolio/" -ForegroundColor Green
