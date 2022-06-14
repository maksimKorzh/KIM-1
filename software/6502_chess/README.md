# 6502 chess program for unexpanded KIM-1
Chess program written in 6502 assembly to run on <a href="https://github.com/maksimKorzh/KIM-1">KIM-1 emulator</a>

# Program size
    DATA SEGMENT: 192 bytes (board, move offsets, etc.)
    CODE SEGMENT: 717 bytes (search, make move & display)
           TOTAL: 909 bytes of KIM-1 RAM

# How to run
    1. Copy and paste the code from src/chess.asm
       to the code editor at KIM-1 emulator
       (or you may try luck uploading program
        from paper the tape file)
    2. In the emulator click 'Assemble', set starting address to 0x0000, click 'Ok'
    3. Click 'Upload' button, you should see \[00 00 16\] on the screen
    4. Press 0200 on keypad, you should see \[02 00 A9\] on the screen
    5. Press 'GO' on keypad - engine would start searching for a best move
       for whites in starting position (unless you've made a move before)
       and ends up displaying best move like \[63 43 00\] which means D2D4.

# Performance
    Default search depth is 3 which is the minimal depth to search
    for a mate. With search depth 3 it takes around 1 minute to make
    a move, in a complicated middlegame positions it may take up to
    half an hour to come up with a best move. So  you may want to change
    the search depth to speed up KIM's thinking process, just alter
    the value at $0201 for that purpose. Beware though - values greater
    than 3 would take ages to complete, while values 2 and 1 would result
    in a faster play but the engine would not be capable of finding a mate,
    so if you're in the endgame, make sure the search depth is equal to 3.
    
# Board & pieces
    00  16 14 15 17 13 15 14 16    Coordinates layout: RANK+FILE e.g. 64 = E2 
    10  12 12 12 12 12 12 12 12
    20  00 00 00 00 00 00 00 00    $09 - White pawn      $12 - Black pawn
    30  00 00 00 00 00 00 00 00    $0C - White knight    $14 - Black knight
    40  00 00 00 00 00 00 00 00    $0D - White bishop    $15 - Black bishop
    50  00 00 00 00 00 00 00 00    $0E - White rook      $16 - Black rook
    60  09 09 09 09 09 09 09 09    $0F - White queen     $17 - Black queen
    70  0E 0C 0D 0F 0B 0D 0C 0E    $0B - White king      $13 - Black king
        
        00 01 02 03 04 05 06 07    $00BC - Side to move, $08: white, $10: black
    

# How to play
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/htcQenMfkuo/0.jpg)](https://www.youtube.com/watch?v=htcQenMfkuo&feature=youtu.be)
    
