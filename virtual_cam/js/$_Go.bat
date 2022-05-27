rem $_Go.bat - tool chain automated steps for Closure Compiling and prettifying the Virtual WebCam Chrome Extension file.
rem (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3).
rem @echo off

set root=C:\xampp\htdocs\webcam_extension\virtual_cam\js\&                                              rem Root directory of project.
set shared=C:\xampp\htdocs\SHARED\&                                                                     rem Directory containing shared code.
set FIX=%shared%FIX.php &                                                                               rem PHP for making changes before processing.
set PHP=C:\xampp\php\php.exe &                                                                          rem Command line PHP executable.
set compile=java -jar C:/$/Code/closure-compiler/closure-compiler-v20210808.jar &                       rem Google's Closure Compiler takes JavaScript and creates better JavaScript.
set compile=%compile%--compilation_level=ADVANCED_OPTIMIZATIONS &                                       rem Use advanced features, for obfuscation among other features.
set compile=%compile%--formatting=PRETTY_PRINT                                                          & rem
set compile=%compile%--jscomp_error=accessControls             --jscomp_error=checkRegExp               & rem Various problems to look for: ???Get latest list?
set compile=%compile%--jscomp_error=checkTypes                 --jscomp_error=checkVars                 & rem "
set compile=%compile%--jscomp_error=const                      --jscomp_error=constantProperty          & rem "
set compile=%compile%--jscomp_error=deprecated                 --jscomp_error=es5Strict                 & rem "
set compile=%compile%--jscomp_error=externsValidation          --jscomp_error=globalThis                & rem "
set compile=%compile%--jscomp_error=invalidCasts               --jscomp_error=missingProperties         & rem "
set compile=%compile%--jscomp_error=nonStandardJsDocs          --jscomp_error=strictModuleDepCheck      & rem "
set compile=%compile%--jscomp_error=suspiciousCode             --jscomp_error=typeInvalidation          & rem "
set compile=%compile%--jscomp_error=undefinedVars              --jscomp_error=unknownDefines            & rem "
set compile=%compile%--jscomp_error=uselessCode                --jscomp_error=visibility                & rem "
set compile=%compile%--jscomp_error=conformanceViolations      --jscomp_error=misplacedTypeAnnotation   & rem "
set compile=%compile%--jscomp_error=missingProvide             --jscomp_error=missingReturn             & rem "
set compile=%compile%--jscomp_error=typeInvalidation           --jscomp_error=checkDebuggerStatement    & rem "
set compile=%compile%--jscomp_error=duplicate                                                           & rem .
set compile=%compile%--warning_level=VERBOSE                                                            & rem
set compile=%compile%--output_wrapper="(function(){%%output%%})();"                                     & rem Put in wrapper which will cause the code to be run immediately.
set compile=%compile%--js                                                                               & rem

rem ------------------------------------
cd %root%                                                                                               & rem Start in project root directory.

del %root%inject*.*                                                                                     & rem Clean up old results. Ignore warning message "Could not find."
del %root%injected*.*                                                                                   & rem Clean up old results. Ignore warning message "Could not find."
mkdir                                                                   ..\..\PRO\js                    & rem Create directory for production version of JavaScript files.
%PHP% %FIX% "TIMESTAMP" > .\ZZZ_TIMESTAMP.txt                                                           & rem Create a unique ID based on current date/time (save in a file for to make this work)
set /P VERSION=<ZZZ_TIMESTAMP.txt                                                                       & rem "
echo %VERSION%                                                                                          & rem ".

echo ----- Preprocess inject.js
%PHP%                                  .\$_inject.js_php              >        .\ZZZ_inject0.js         & rem Run PHP macros in money code.
%PHP% %FIX% "/*DEV*/"     "//*DEV*/" .\ZZZ_inject0.js                 >        .\ZZZ_inject1.js         & rem Comment out DEV lines.
%PHP% %FIX% "//*PRO*/"    "/*PRO*/"  .\ZZZ_inject1.js                 >        .\ZZZ_inject2.js         &
%PHP% %FIX% "/*VERSION*/" %VERSION%  .\ZZZ_inject2.js                 >        .\ZZZ_inject3.js         & rem Insert version based on date/time into the code.
%PHP% %FIX% "NOTES"                  .\ZZZ_inject3.js                 >            .\inject.js          & rem Save a copy while making changes so prettier can handle blank lines and comments correctly.
rem prettier --write .\inject.js
rem Keep a prettier prettifed version of the code as source code.
call prettier --write .\inject.js                                                                       & rem 
%compile%                                .\inject.js   --js_output_file ..\..\PRO\js\inject.js          & rem
echo ----- inject.js DONE.

echo ----- Preprocess injected.js
%PHP%                                  .\$_injected.js_php            >        .\ZZZ_injected0.js       & rem Run PHP macros in money code.
%PHP% %FIX% "/*DEV*/"     "//*DEV*/" .\ZZZ_injected0.js               >        .\ZZZ_injected1.js       & rem Comment out DEV lines.
%PHP% %FIX% "//*PRO*/"    "/*PRO*/"  .\ZZZ_injected1.js               >        .\ZZZ_injected2.js       & rem
%PHP% %FIX% "/*VERSION*/" %VERSION%  .\ZZZ_injected2.js               >        .\ZZZ_injected3.js       & rem Insert version based on date/time into the code.
%PHP% %FIX% "NOTES"                  .\ZZZ_injected3.js               >            .\injected.js        & rem Make changes so prettier can handle blank lines and comments correctly.
call prettier --write .\injected.js                                                                          & rem Overwrite file to create a prettifed version of the code as standard source code.
%compile%                                .\injected.js --js_output_file ..\..\PRO\js\injected.js        & rem
echo --- injected.js DONE.

xcopy ..\icon-16.png                                                    ..\..\PRO\ /Y                   & rem
xcopy ..\icon-48.png                                                    ..\..\PRO\ /Y                   & rem
xcopy ..\icon-128.png                                                   ..\..\PRO\ /Y                   & rem

%PHP% %FIX% "/*DEV*/"     "//*DEV*/"   ..\$_manifest.php              >    ..\ZZZ_manifest1.php         & rem Comment out DEV lines.
%PHP% %FIX% "//*PRO*/"    "/*PRO*/"  ..\ZZZ_manifest1.php             >    ..\ZZZ_manifest2.php         & rem Use PROduction version of code.
%PHP%                                ..\ZZZ_manifest2.php             > ..\..\PRO\manifest.json         & rem Run PHP macros in money code.

%PHP%                                  ..\$_manifest.php              >        ..\manifest.json         & rem Run PHP macros to rewrite DEV version for further localhost development.

del                                                                         .\ZZZ_*.*                   & rem
del                                                                        ..\ZZZ_*.*                   & rem

:End
