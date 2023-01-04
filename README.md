# sha

Implementation of SHA256 in WebAssembly. Javascript loads the data to be processed into the Wasm memory buffer, and the Wasm performs the calculation. 

I wanted to make a public website to celebrate friends' birthdays but did not want to expose their names. Hashing (with a keyboard-mash salt added) means that the website can confirm what name was entered without exposing the name itself. 

The celebration music for Happy Birthday was based off some iffy harmonization, generated on a music box website, and split into separate audio files. (If you want to see, open DevTools and delete the `disabled` attribute then hit the button.)
