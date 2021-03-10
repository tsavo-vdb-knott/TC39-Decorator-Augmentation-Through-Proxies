import echo from './echo';

// echo
//   // The "root" styler is the raw CSS that will be inherited by all other
//   // stylers, custom and internal.
//   .defineRootStyler("color: red ;")
//   .defineStyler("asTag", echo.bold.padded.rounded)
//   // Notice that the next two stylers are building off of "asTag", a previously
//   // defined custom styler.
//   .defineStyler("asWarning", echo.asTag.bgGold.black)
//   .defineStyler("asAlert", echo.asTag.bgRed.white)
//   // Custom stylers can also just be raw CSS.
//   .defineStyler("asMarquee", "font-size: 30px ; padding: 20px 30px 20px 30px ; display: inline-block ; border: 3px solid gold ;");

// Once our custom stylers are defined, we can now use them in combination with
// the core stylers and the echo-log functions.
// echo.log(echo.bgMagenta.white.lighter.large("hello world"));
// echo.log(echo.bgBlack.white.bold.larger("hello world"));
// echo.log(echo.bgCyan.black.largest.asTag("hello world"));
// echo.log(echo.bgMagenta.white.lighter.massive.asTag("hello world"));
// echo.log(echo.cyan.bgBlack("hello world"));
// echo.log(echo.asWarning.strikethrough("hello world"));
// echo.log(echo.asAlert.underline("hello world"));
// echo.log(echo.asMarquee("hello world"));

// Using the extended colors.
// echo.log(
//   echo.bgDodgerblue.white.largest.asTag.lighter("Hot"),
//   echo.bgDimgray.white.largest.asTag("Diggity"),
//   echo.bgRebeccapurple.white.largest.asTag.lighter("Dog"),
//   echo.bgYellowgreen.white.largest.asTag("That's"),
//   echo.bgTomato.white.largest.asTag.lighter("Cool!")
// );

// // And, of course, these stylers can be mixed with "raw" values as well.
// echo.log(
//   "Raw value",
//   echo.bgGray.white.asTag("Styled value"),
//   ["Raw value"])

echo.defineStyler("spaced", "padding: 8px;")