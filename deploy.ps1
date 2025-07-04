# AWS Deployment Script for Portfolio

# Step 1: Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Exiting..." -ForegroundColor Red
    exit 1
}

# Step 2: Deploy to S3
Write-Host "Deploying to S3..." -ForegroundColor Green
aws s3 sync out/ s3://wailinnaung.com --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "S3 sync failed! Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host "S3 deployment completed successfully!" -ForegroundColor Green

# Step 3: Clear CloudFront cache
Write-Host "Clearing CloudFront cache..." -ForegroundColor Green
aws cloudfront create-invalidation --distribution-id E25720EJVK7F0O --paths "/*"

if ($LASTEXITCODE -ne 0) {
    Write-Host "CloudFront invalidation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "CloudFront cache cleared successfully!" -ForegroundColor Green
Write-Host "Deployment completed! Your website should be updated in a few minutes." -ForegroundColor Cyan
