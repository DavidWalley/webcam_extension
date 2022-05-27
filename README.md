# webcam_extension
Code for a virtual webcam Chrome extension example, using GPU to add semi-transparent flag animation, suitable for use in a browser-based online meeting.

An introductory note is in order: I stopped hand-crafting "source code" some years back when I wrote a program to do it for me. The following is my work-flow for this project:

"Money code", files prefixed with '$_', are working development files, but also suitable as input for creating standards-compliant prettified clean "source code". Refer to the money code if you would like to see all notes, including visual-cortex-optimized layout of co-located code / abstract notional mappings (i.e., tables).

I urge you to use a mono-spaced font/syntax highlighter, and turn off word-wrap in money code in your IDE text editor, and allow long in-line comments to ramble on off the right edge of the screen, never to be seen again, UNLESS, you are desperate to fix a bug or inordinately curious. In these cases, turn word-wrap on to read the detailed notes. Word-wrap off -- ignore the comments, as you may ignore footnotes. Word-wrap on -- read all footnotes.

Refer to the pre-preprocessed source code files with familiar extensions if you would like to see more familiar format, i.e, clean code.

Tools for my work-flow are included -- converting money code to source code, and compiling source code to minified, optimized JavaScript via Google's Closure Compiler. This work-flow is a bodge, partially written as Windows batch files because copy/paste/modify has been working for me for years and I can't be bothered changing to something else, and partially written in PHP because it has proven to be a superior bodge language. PHP included with XAMPP is easily configured to preprocess stuff on the fly, during localhost development, using '.htaccess' files.

I use PHP, to serve up '.php' files as localhost '.html' pages, but also '.js_php' files, which may include <?php> preprocessor tags (syntax-highlight them as JavaScript files), converted to '.js' code files, on-demand.

The same preprocessing chain is done via command line commands, prior to prettification into source code, and/or Google's Closure Compiler compilation into optimized and minimized production code. This code is packed as a Chrome Extension using the chrome://extensions page in Google Chrome.

# To Do
Prettify manifest.json
