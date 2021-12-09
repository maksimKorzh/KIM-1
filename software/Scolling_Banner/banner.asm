;-------------------------------------------------------------------;
;
;                      SCROLLING BANNER PROGRAM
;                         by Code Monkey King
;
;-------------------------------------------------------------------;
define SAD   $1740          ; character to output
define SBD   $1742          ; segment to output data
define PADD  $1741          ; 6530 RIOT data direction
define DSP   $0000          ; user display buffer
define LEN   $12            ; user display buffer length
define INDIR $00            ; string display offset
;-------------------------------------------------------------------;
INIT:        LDX #$00       ; init message character offset
             LDY #$06       ; init display buffer offset
INITLP:      LDA MESSAGE,X  ; load next character in message
             CMP #$FF       ; is it terminating character?
             BEQ MAIN       ; if so then start main loop
             STA DSP,Y      ; otherwise put character to DSP buffer
             INX            ; adjust character offset
             INY            ; adjust display buffer offset
             JMP INITLP     ; repeat until message is initialized
;-------------------------------------------------------------------;
MAIN:        JSR LIGHT      ; display 6 digits, scroll message
             JSR DELAY      ; wait a bit
             JMP MAIN       ; loop forever
;-------------------------------------------------------------------;
LIGHT:       LDY #$00       ; init indirect offset
             LDA #$7F       ; set data
             STA PADD       ; direction register
             LDX #$09       ; start printing from left most digit
LIGHTLP:     LDA (INDIR),Y  ; load next character to display
             STX SBD        ; set up segment to display
             STA SAD        ; output character
             INX            ; increment segment
             INX            ; to display next character
             INY            ; increment indirect offset
             CPY #$06       ; all 6 characters displayed?
             BCC LIGHTLP    ; if not repeat loop
             INC INDIR      ; otherwise shift display window
             LDA INDIR      ; get display window offset address
             CMP #LEN       ; display window shifted to the end?
             BEQ RESET      ; if so reset it
RETURN:      RTS            ; otherwise return from subroutine
RESET:       LDA #$00       ; reset display
             STA INDIR      ; window offset
             JMP RETURN     ; jump to return from subroutine
;-------------------------------------------------------------------;
DELAY:       LDA #$ff       ; delay constant
             STA $1707      ; use 1024T delay
WAIT:        BIT $1707      ; timer stopped?
             BPL WAIT       ; if not wait until timer is stopped
             RTS            ; otherwise return from subroutine
;-------------------------------------------------------------------;
MESSAGE:     DCB $F6, $79, $38, $38, $3F, $00
             DCB $6E, $5C, $78, $9C, $7C, $79, $FF
;-------------------------------------------------------------------;
