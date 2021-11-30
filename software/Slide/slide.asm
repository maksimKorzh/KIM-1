;
; Program to circularly slide segments in a segment
;               by Dominic Bumbaca
;

begin:

lda #$ff
sta $1741 ;set data direction
lda #$ff
sta $1743 ;set data direction

loop:
lda #9 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$01 ;
sta $1740
jsr wait

;lda #11 ; 9,11,13,15,17,19  select the digit
;sta $1742
lda #$02 ;
sta $1740
jsr wait

;lda #13 ; 9,11,13,15,17,19  select the digit
;sta $1742
lda #$04 ;
sta $1740
jsr wait

;lda #15 ; 9,11,13,15,17,19  select the digit
;sta $1742
lda #$08 ;
sta $1740
jsr wait

;lda #17 ; 9,11,13,15,17,19  select the digit
;sta $1742
lda #$10 ;
sta $1740
jsr wait

;lda #19 ; 9,11,13,15,17,19  select the digit
;sta $1742
lda #$20 ; blank
sta $1740
jsr wait

jmp loop

wait:
ldy #$ff
sty $1780
delay:
dec $1780
inc $1780
dec $1780
inc $1780
dec $1780
bne delay
rts
