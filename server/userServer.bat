set MAIN_JS=%~dp0\servers\userServer\app.js
set CONFIG=%~dp0\config.js
call node.exe %MAIN_JS% %CONFIG%
pause