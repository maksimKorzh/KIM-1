;
;              HELLO by Aart Bik
;              (Upload at $0200)
;    Works on emulator/Corsham KIM/KIM Uno
;

define sad  $1740  ; A data register
define padd $1741  ; A data direction register
define sbd  $1742  ; B data register
define pbdd $1743  ; B data direction register

lda #$7f
sta padd
lda #$3f
sta pbdd


display_loop:   
    ldx #0
    ldy #9
char_loop:
    lda #0
    sta sad; no flicker
    sty sbd
    lda DATA, x
    sta sad
    txa
    ldx #4
char_delay:
    dex
    bne char_delay ; glow up character
    tax
    inx
    iny
    iny
    cpx #6
    bne char_loop
    jmp display_loop ; keep refreshing

DATA: DCB $f6, $f9, $38, $38, $3f, $00

;
; HEXDUMP
;
; 0200: a9 7f 8d 41 17 a9 3f 8d 43 17 a2 00 a0 09 a9 00 
; 0210: 8d 40 17 8c 42 17 bd 2d 02 8d 40 17 8a a2 04 ca 
; 0220: d0 fd aa e8 c8 c8 e0 06 d0 e4 4c 0a 02 f6 f9 38 
; 0230: 38 3f 00 
