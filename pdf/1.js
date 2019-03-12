/*
  sudo add-apt-repository ppa:dhor/myway
  sudo apt-get update
  sudo apt-get install graphicsmagick
  sudo apt-get install imagemagick
*/

const gm = require("gm");
gm("1.pdf")
  .command("convert")
  .in("-density", "500")
  .write("./a.png", function(err) {
    if (err) {
      throw err;
    }
  });
