;
; Prints 'HELLO' on KIM-1 display
;

define SAD $1740                ; character to print encoded to 7 segment code
define SBD $1742                ; LED segment to print character to (1-6)

START:  LDA #$7F                ; set directional
        STA $1741               ;    register
        LDX #$00                ; init character offset
        LDY #$09                ; init segment offset

PRINT:  STY SBD                 ; set up segment to write character to
        LDA HELLO,X             ; load next character
        STA SAD                 ; output character
        INX                     ; increment character offset
        INY                     ; increment segment offset
        INY                     ; increment segment offset
        CPY #$13                ; no more characters to print?
        BEQ START               ; if so then print 'HELLO' again
        JMP PRINT               ; otherwise print next character

HELLO:  DCB $76, $79, $38       ; 'H', 'E', 'L'
        DCB $38, $BF, $00       ; 'L', 'O', ' ' (last one is not used)

;
; HEXDUMP
;
; 0200: a9 7f 8d 41 17 a2 00 a0 09 8c 42 17 bd 1c 02 8d 
; 0210: 40 17 e8 c8 c8 c0 13 f0 e7 4c 09 02 76 79 38 38 
; 0220: bf 00 
