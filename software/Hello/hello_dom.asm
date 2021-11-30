lda #$ff
sta $1741 ;set data direction
lda #$ff
sta $1743 ;set data direction
lda #9 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$76
sta $1740

lda #11 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$79 ; H
sta $1740

lda #13 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$38 ; E
sta $1740

lda #15 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$38 ; L
sta $1740

lda #17 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$bf ; L
sta $1740

lda #19 ; 9,11,13,15,17,19  select the digit
sta $1742
lda #$00 ; O
sta $1740

jmp $0200
