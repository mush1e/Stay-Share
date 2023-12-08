@echo off
for /f "tokens=1,* delims==" %%A in (sendgrid.env) do (
    set "%%A=%%B"
)