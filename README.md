# webcam_extension
Code for a virtual webcam Chrome extension, using GPU to add semi-transparent flag animation, suitable for use in a browser-based online meeting.

I stopped hand-crafting "source code", and wrote a program to do it for me instead. The following is my process:

"Money code", files prefixed with '$_', are working development files, but also suitable as input for creating standards-compliant prettified clean "source code". Refer to the money code if you would like to see all notes, including visual-cortex-optimized layout with co-located code / abstract notional formatting (i.e., tables). 

Refer to the pre-preprocessed source code files with familiar extension if you would like to see a more familiar format, i.e, clean code.

Tools for my work-flow are included -- converting money code to source code, and compiling source code to minified, optimized JavaScript via Google's Closure Compiler. The work-flow is a bodge, partially written as Windows batch files because copy/paste/modify has been working for me for years and I can't be bothered changing to something else, and partially written in PHP because it has proven to be a superior bodge language. PHP included with XAMPP is easily configured to preprocess stuff on the fly, during localhost development, using '.htaccess' files.

I use PHP, to serve up '.php' files as localhost '.html' pages, but also '.js_php' files, which may include <?php> preprocessor tags, converted to '.js' code files, on-demand.

The same preprocessing chain is done via command line commands, prior to prettification into source code, and/or Google's Closure Compiler compilation into optimized and minimized production code. This code is packed as a Chrome Extension using the chrome://extensions page in Google Chrome.
