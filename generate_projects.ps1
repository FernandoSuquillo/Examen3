
$services = @(
    @{name = "policies-service"; deps = "web,data-jpa,mysql,lombok"; db = "mysql" },
    @{name = "providers-service"; deps = "web,data-jpa,postgresql,lombok"; db = "postgresql" },
    @{name = "claims-service"; deps = "web,data-jpa,mysql,lombok,cloud-openfeign"; db = "mysql" }
)

foreach ($service in $services) {
    $name = $service.name
    $deps = $service.deps
    $url = "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.2.0&baseDir=$name&groupId=com.example&artifactId=$name&name=$name&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.$name&packaging=jar&javaVersion=17&dependencies=$deps"
    
    Write-Host "Generating $name..."
    try {
        Start-Sleep -Seconds 5
        Invoke-WebRequest -Uri $url -OutFile "$name.zip"
        Expand-Archive -Path "$name.zip" -DestinationPath "." -Force
        Remove-Item "$name.zip"
        Write-Host "$name generated successfully."
    }
    catch {
        Write-Error "Failed to generate $name. Error: $_"
    }
}
