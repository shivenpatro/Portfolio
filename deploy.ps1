# Build the project
Write-Host "Building the project..." -ForegroundColor Green
pnpm build

# Check if build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit"
}

# Check if remote origin exists
$remoteExists = git remote -v | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Please enter your GitHub username:" -ForegroundColor Yellow
    $username = Read-Host
    
    # Add remote origin
    git remote add origin "https://github.com/$username/enhanced-interactive-portfolio.git"
    Write-Host "Remote origin added: https://github.com/$username/enhanced-interactive-portfolio.git" -ForegroundColor Green
}

# Create and switch to gh-pages branch if it doesn't exist
$branchExists = git branch --list gh-pages
if (-not $branchExists) {
    Write-Host "Creating gh-pages branch..." -ForegroundColor Yellow
    git checkout -b gh-pages
} else {
    # Make sure we're on the main branch
    git checkout main
}

# Commit any changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Update site for deployment"

# Push to main branch
Write-Host "Pushing to main branch..." -ForegroundColor Yellow
git push -u origin main

Write-Host "Deployment preparation complete!" -ForegroundColor Green
Write-Host "GitHub Actions will now build and deploy your site." -ForegroundColor Green
Write-Host "Check your repository's Actions tab for progress." -ForegroundColor Yellow
