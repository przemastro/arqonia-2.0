@ECHO OFF
FOR /F "tokens=*" %%i IN ('docker ps -q') do (Docker stop %%i & Docker rm %%i)
FOR /F "tokens=*" %%i IN ('docker images --format {{.Repository}} ^| findstr arqonia_build_and_run') do docker rmi %%i