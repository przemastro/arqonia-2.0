xcopy ..\build\libs jar\
xcopy ..\src\main\resources\mongo\dump /s mongo-import\dump /i
docker-compose --verbose -f docker-compose-windows.yml up
