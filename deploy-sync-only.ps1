# Quick deployment script - sync to S3 and clear CloudFront cache only
# No build step - assumes 'out' directory already exists

Write-Host "🚀 Starting quick deployment (sync only)..." -ForegroundColor Green

# Check if out directory exists
if (-not (Test-Path "out")) {
    Write-Host "❌ Error: 'out' directory not found. Please run 'npm run build' first." -ForegroundColor Red
    exit 1
}

# Sync to S3
Write-Host "📤 Syncing to S3..." -ForegroundColor Yellow
aws s3 sync out/ s3://wailinnaung.com --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: S3 sync failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ S3 sync completed successfully" -ForegroundColor Green

# Clear CloudFront cache
Write-Host "🔄 Clearing CloudFront cache..." -ForegroundColor Yellow
aws cloudfront create-invalidation --distribution-id E25720EJVK7F0O --paths "/*"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: CloudFront invalidation failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ CloudFront cache invalidation started" -ForegroundColor Green
Write-Host "🎉 Quick deployment completed! Your site will update within a few minutes." -ForegroundColor Green
