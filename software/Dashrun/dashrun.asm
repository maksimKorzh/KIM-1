;
;       Dash running across the display
;   timer testing program by Dominic Bumbaca
;

define SAD $1740   ; character to print encoded to 7 segment code
define SBD $1742   ; LED segment to print character to (1-6)

start:
 LDA #$7F          ; set directional
 STA $1741         ;    register  
 LDX #$09          ;initialize SBD as $09 left most digit
 STX SBD           ;initialize SBD as $09 left most digit

begin:
 lda #$00          ; power off segment
 sta SAD
 
 stx SBD           ; select the digit 09,0b,0d,0f,11,13
 inx               ; inc by 2
 inx
 
 lda #$01          ; load up the custom 7-segment character
 sta SAD

 CPX #$15
 BNE lessthan15    ;once the digit gets past $13 go back to $09
 LDX #$09

lessthan15:

 jsr delay
 jmp begin

delay:
 lda #$ff          ; delay subroutine
 sta $1707

wait:
 bit $1707
 bpl wait
 rts
