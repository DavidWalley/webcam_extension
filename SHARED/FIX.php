<?php // Fix up a few things for closure compiler files with various bodges.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

// Do some preprocessing on js_php money code files
// 1) %PHP% %FIX% "TIMESTAMP" > .\ZZZ_TIMESTAMP.txt                                                     & rem Create a unique ID based on current date/time (save in a file for to make use of it).
// 2) %PHP% %FIX% "/*DEV*/" "//*DEV*/" .\ZZZ_main0.js > .\ZZZ_main1.js                                  & rem Replace needle with replacement string in the haystack file, i.e., Comment out lines starting with /*DEV*/.



function                                asCodeComment(////////////////////////////////////////////////////> Parse line to get code and significant comments.
                                        $sLine                                                          //> Given line of code.
){                                      //////////////////////////////////////////////////////////////////> Report array of [code, and comment].
                                        $as                     = explode('//' ,$sLine ,2);             //>
                                        $as0                    = explode( "\n" ,$as[0] );              //>
                                        $r_sCode                = $as0[0];                              //>
                                        $r_sComment             = '';                                   //>
 if( 1 < count($as) ){                                                                                  //> If the line does include a comment, then...
                                        $as1                    = explode('//#' ,'//'.$as[1]);          //> Look for comments to be kept.
  if( 1 < count($as1) ){                                                                                //> If there is a comment to be kept, then remember it.
   $r_sComment = ' // '. trim( $as1[1] );                                                               //>
                                        $as2                    = explode( "\n" ,$r_sComment );         //>
   $r_sComment = $as2[0];                                                                               //>
 }}//if//if                                                                                             //> .
                                                                                                        //>
return [$r_sCode ,$r_sComment];                                                                         //>
}//asCodeComment//////////////////////////////////////////////////////////////////////////////////////////>


function                                Go_Notes(/////////////////////////////////////////////////////////> Make changes so prettier can handle blank lines and comments correctly.
                                        $a_sPathFile                                                    //> Input file directory path and file name.
){                                      //////////////////////////////////////////////////////////////////>
                                        $file                   = fopen($a_sPathFile ,"r");             //> Get a handle to the input file.
 if( ! $file ){                                                                                 return;}//> If there is a problem then quit.
                                        $sLine                  = '';                                   //> .
 while(   FALSE !== ($sLine = fgets($file, 4096) )   ){                                                 //> Read the file one line at a time.
  if( "// prettier-ignore\n" === $sLine ){ echo $sLine;                                       continue;}//> Keep instruction for prettier to ignore next code node.
                                        $sLastOfOneLineFunction = '';                                   //> First part of 2-part buffer, in case we want to split a one-line function and its comment, initially empty.
  if(       'function' === substr($sLine ,0, 8)                                                         //> If this line is the start of a function,
   || 'async function' === substr($sLine ,0,14)                                                         //> including this variation of the line
  ){                                                                                                    //> then
                                        $as                     = asCodeComment($sLine);                //>
                                        $sCode                  = $as[0];                               //>
                                        $sComment               = $as[1];                               //>
                                        $as                     = explode('(' ,$sCode ,2);              //> Check for '(' and split line there so comment can stay with the function name.
   if( 1 < count($as) ){                                                                                //> Remember to treat the rest of the line as another line.
    $sCode                  = $as[0].'(';                                                               //>
    $sLastOfOneLineFunction = $as[1];                                                                   //>
    echo "\n";                                                                                          //> Ensure there is a blank line before every function.
   }//if function                                                                                       //>
   if( '' !== trim($sCode . $sComment) ){   echo $sCode . $sComment ."\n";   }                          //> Ignore blank lines, but output it now, pre-prettificaton.
   $sLine = '';                                                                                         //> Remember we are done with the line.
  }//if function                                                                                        //>
                                                                                                        //>
  if( '' !== $sLastOfOneLineFunction ){ $sLine = $sLastOfOneLineFunction; }                             //> If there is a last half of a one-line function, indicating the function name part has been done, then it is the line to do now.
                                        $as                     = asCodeComment($sLine);                //>
                                        $sCode                  = $as[0];                               //>
                                        $sComment               = $as[1];                               //>
                                                                                                        //>
  if( '//' === substr($sLine ,0,2) ){                                                         continue;}//> If line has been commented out, then drop the comment to and move on to next line.
  if(  '' !== trim($sCode . $sComment) ){   echo $sCode . $sComment ."\n";   }      //> Ignore blank lines, but output it now, pre-prettificaton.
 }//while fgets                                                                                         //>
 if( !feof($file) ){ echo "Error during FIX.php: Unexpected fgets() fail.\n"; }                         //> Report error if one occured above.
 fclose($file);                                                                                         //> Close the file.
}//Go_Notes///////////////////////////////////////////////////////////////////////////////////////////////>


function                                Go_Replace(///////////////////////////////////////////////////////>
                                        $a_sNeedle                                                      //>
,                                       $a_sReplacement                                                 //>
,                                       $a_sPathFileHaystack                                            //>
){                                      //////////////////////////////////////////////////////////////////>
                                        $fileIn                 = fopen( $a_sPathFileHaystack ,'r' );   //>
 if( $fileIn ){                                                                                         //>
  while( !feof($fileIn) ){                                                                              //>
   $s = fgets($fileIn);                                                                                 //>
   echo (   str_replace( $a_sNeedle ,$a_sReplacement ,$s )   );                                         //> If line contains target substring, replace them.
  }//while                                                                                              //>
  fclose($fileIn);                                                                                      //>
 }//if                                                                                                  //>
                                                                                                        //>
 if( "END_OF_FILE" === $a_sNeedle ){ echo ('//'. $a_sReplacement); }                                    //> Add cache-busting comment at end of file.
}//Go_Replace/////////////////////////////////////////////////////////////////////////////////////////////>


function                                Go(///////////////////////////////////////////////////////////////>
){                                      //////////////////////////////////////////////////////////////////>
                                        $sArg1                  = $_SERVER['argv'][1];                  //> First argument given on command line.
 if( "TIMESTAMP" === $sArg1 ){   echo ( time() - 1636000000 );                                  return;}//> If a request for a time, report it.
                                                                                                        //>
                                        $sArg2                  = $_SERVER['argv'][2];                  //> 2nd argument given on command line.
 if( "NOTES"     === $sArg1 ){   Go_Notes( $sArg2 );                                            return;}//> Make changes so prettier can handle blank lines and comments correctly.
                                                                                                        //>
                                        $sFileIn                = $_SERVER['argv'][3];                  //> 3rd is the haystack.
 Go_Replace( $sArg1 ,$sArg2 ,$sFileIn );                                                                //>
}//Go/////////////////////////////////////////////////////////////////////////////////////////////////////>

Go();                                                                                                   //> Run the main routine.

//End of file.