;
; Prints 'HELLO' on KIM-1 display
;

define SAD $1740                ; character to print encoded to 7 segment code
define SBD $1742                ; LED segment to print character to (1-6)

START:  LDX #$00                ; init character offset
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
; 0200: a2 00 a0 09 8c 42 17 bd 17 02 8d 40 17 e8 c8 c8 
; 0210: c0 13 f0 ec 4c 04 02 76 79 38 38 bf 00 
