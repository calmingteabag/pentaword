# THIS FUCKING SHIT

I need a way to make the game return to 'play' state everyday at 0:00

Setting it server side to keep some timer script + logic running is the easier
way because I can set up front to read/do something from it. 

BUT I like to torture myself. 

This timer stuff has to be done some way on frontend only because of the
constraints I put on this project (frontend ONLY, no db, backend only for hosting static page)

## Trial and Error

What I've tried first was to get local time and comparing to 00:00
which didn't work because it had to run at exactly 00:00:00 for it to
turn state to 'active'.

Hmmm what if we fetch current date, set it to +1 and put it 
into localStorage?

then startCheck() will see if current date matches saved date.
if not, game is inactive

if yes, hmmm
turn state to active
set localstorage date to +1 of current date





