# Clean out directory script
Write-Host "Starting cleanup of out directory..."

if (Test-Path "out") {
    Write-Host "Found existing out directory, attempting to clean..."
    
    # Kill any processes that might be using the directory
    try {
        Get-Process | Where-Object { $_.Path -like "*out*" } | Stop-Process -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Host "No processes to kill"
    }
    
    # Try to remove files with enhanced retry logic
    $maxRetries = 5
    $retryCount = 0
    
    while ($retryCount -lt $maxRetries) {
        try {
            # First try to unlock files by changing attributes
            Get-ChildItem "out" -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
                try {
                    $_.Attributes = 'Normal'
                }
                catch {
                    # Ignore attribute errors
                }
            }
            
            # Remove all files first
            Get-ChildItem "out" -Recurse -Force -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction Stop
            
            # Then remove directories from deepest to shallowest
            Get-ChildItem "out" -Recurse -Force -Directory -ErrorAction SilentlyContinue | Sort-Object FullName -Descending | Remove-Item -Force -Recurse -ErrorAction Stop
            
            # Finally remove the root out directory
            Remove-Item "out" -Force -ErrorAction Stop
            
            Write-Host "Successfully cleaned out directory"
            break
        }
        catch {
            $retryCount++
            Write-Host "Attempt $retryCount failed: $($_.Exception.Message)"
            if ($retryCount -lt $maxRetries) {
                Write-Host "Retrying in 3 seconds..."
                Start-Sleep -Seconds 3
            }
        }
    }
    
    if ($retryCount -eq $maxRetries) {
        Write-Host "Warning: Could not completely clean out directory after $maxRetries attempts"
        Write-Host "Attempting alternative cleanup method..."
        
        try {
            # Last resort: rename the directory and create a new one
            $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
            $backupName = "out_old_$timestamp"
            
            if (Test-Path "out") {
                Rename-Item "out" $backupName -ErrorAction Stop
                Write-Host "Renamed existing out directory to $backupName"
                Write-Host "You can manually delete $backupName later if needed"
            }
        }
        catch {
            Write-Host "Alternative cleanup also failed: $($_.Exception.Message)"
            Write-Host "Manual intervention may be required"
        }
    }
}
else {
    Write-Host "No existing out directory found"
}

Write-Host "Cleanup process completed"
