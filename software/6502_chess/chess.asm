;=================================
; -------------------------------
;  6502 chess program for KIM-1
;
;               by
;
;        Code Monkey King
;
; -------------------------------
;=================================
;  Upload at $0000, run at $0200
;=================================

;=================================
;    ($0000-$00C0) VARIABLES
;=================================
BOARD:                                                   ; 0x88 cgess board + PST
  DCB $16, $14, $15, $17, $13, $15, $14, $16,   $00, $00, $00, $00, $00, $00, $00, $00,
  DCB $12, $12, $12, $12, $12, $12, $12, $12,   $00, $00, $00, $00, $00, $00, $00, $00,
  DCB $00, $00, $00, $00, $00, $00, $00, $00,   $00, $00, $01, $01, $01, $01, $00, $00,
  DCB $00, $00, $00, $00, $00, $00, $00, $00,   $00, $00, $01, $02, $02, $01, $00, $00,
  DCB $00, $00, $00, $00, $00, $00, $00, $00,   $00, $00, $01, $02, $02, $01, $00, $00,
  DCB $00, $00, $00, $00, $00, $00, $00, $00,   $00, $00, $01, $01, $01, $01, $00, $00,
  DCB $09, $09, $09, $09, $09, $09, $09, $09,   $00, $00, $00, $00, $00, $00, $00, $00,
  DCB $0E, $0C, $0D, $0F, $0B, $0D, $0C, $0E,   $00, $00, $00, $00, $00, $00, $00, $00

OFFSETS:
  DCB $00, $0F,  $10, $11, $00,                            ; black pawns
  DCB $F1, $F0,  $EF, $00,                                 ; white pawns
  DCB $01, $10,  $FF, $F0, $00,                            ; rooks
  DCB $01, $10,  $FF, $F0, $0F, $F1, $11, $EF,  $00,       ; queens, kings and bishops
  DCB $0E, $F2,  $12, $EE, $1F, $E1, $21, $DF,  $00,       ; knights
  DCB $04, $00,  $0D, $16, $11, $08, $0D                   ; starting indexes

WEIGHTS:
  DCB $00, $00, $FD, $00, $F7, $F7, $F1, $E5, $00          ; ..pknbrq.
  DCB $03, $00, $00, $09, $09, $0F, $1B                    ; P.KBNRQ

MSCORE: DCB $00     ; $00B7                                ; Material score
PSCORE: DCB $00     ; $00B8                                ; Positional score
SCORE: DCB $00      ; $00B9                                ; Score returned by search
BESTSRC: DCB $00    ; $00BA                                ; Best from square
BESTDST: DCB $00    ; $00BB                                ; Best target square
SIDE: DCB $08       ; $00BC                                ; Side to move
OFFBOARD: DCB $88                                          ; Offboard constant
WHITE: DCB $08                                             ; White side bit
TSRC: DCB $00                                              ; TEMP_SRC temp storage
TDST: DCB $00                                              ; TEMP_DST temp storage

;=================================
;     ($00C1-$00E4) INIT
;=================================

EVAL_BRIDGE:       ;-----------------------------
  JMP EVALUATE     ;       Bridge to jump
                   ;
SEARCH:            ;-----------------------------
  PHA              ;     Store search depth
  TSX              ;-----------------------------
  TXA              ;
  SEC              ;    Init local variables
  SBC #$0A         ; (see stack map for details)
  TAX              ;
  TXS              ;-----------------------------
  LDA #$81         ;       Set BEST_SCORE
  PHA              ;        to -INFINITY
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;      Get search depth
  ADC #$0C         ; (see stack map for details)
  TAX              ;
  LDA $0100,X      ;-----------------------------
  CMP #$0          ;        On leaf node
  BEQ EVAL_BRIDGE  ;     evaluate position
  DEX              ;-----------------------------
  LDA #$00         ;     Set SRC_SQUARE to 0,
  STA $0100,X      ;     go to the next square
  JMP SQ_LOOP      ;-----------------------------

;=================================
;  ($00E5-$00FF) Fake RAM bytes
;=================================

DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00 
DCB $00, $00, $FF, $00, $00, $00, $00, $00, $00, $16, $00, $00, $01, $00, $00, $01

;=================================
;    ($0100-$01B0) EVALUATION
;=================================

EVALUATE:          ;-----------------------------
  LDA #$00         ;
  STA MSCORE       ;  Static position evaluation
  STA PSCORE       ;
  LDY #$0          ;-----------------------------
                   ;
BRD_LOOP:          ;-----------------------------
  TYA              ;
  BIT OFFBOARD     ;
  BNE SKIP_SQ      ;   Loop over board squares,
  TAY              ;  consider only those square
  LDA BOARD,Y      ;      occupied by pieces
  CMP #$00         ;
  BNE SCR          ;
  JMP SKIP_SQ      ;-----------------------------
                   ;
SCR:               ;-----------------------------
  AND #$0F         ;
  TAX              ;
  LDA MSCORE       ;  Calculate material score
  CLC              ;
  ADC WEIGHTS,X    ;
  STA MSCORE       ;-----------------------------
  LDA BOARD,Y      ;
  BIT WHITE        ;       Get piece color
  BEQ POS_B        ;-----------------------------
                   ;
POS_W:             ;-----------------------------
  TYA              ;
  CLC              ;
  ADC #$08         ;
  TAX              ;
  LDA PSCORE       ;      Add white PST score
  CLC              ;
  ADC BOARD,X      ;
  STA PSCORE       ;
  JMP SKIP_SQ      ;-----------------------------
                   ;
POS_B:             ;-----------------------------
  TYA              ;
  CLC              ;
  ADC #$08         ;
  TAX              ;   Subtract black PST score
  LDA PSCORE       ;
  SEC              ;
  SBC BOARD,X      ;
  STA PSCORE       ;-----------------------------
                   ;
SKIP_SQ:           ;-----------------------------
  TYA              ;
  CMP #$80         ;
  BEQ RET_EVAL     ;    Go to the next square
  TAY              ;
  INY              ;
  JMP BRD_LOOP     ;-----------------------------
                   ;
RET_EVAL:          ;-----------------------------
  TSX              ;
  INX              ;
  INX              ;    Store evaluation score
  LDA SIDE         ;  ot stack as a return value
  BIT WHITE        ;
  BEQ MINUS        ;-----------------------------
                   ;
PLUS:              ;-----------------------------
  LDA MSCORE       ;
  CLC              ;     Return positive score
  ADC PSCORE       ;           for white
  STA $0100,X      ;
  JMP END_EVAL     ;-----------------------------
                   ;
MINUS:             ;-----------------------------
  LDA #$00         ;
  SEC              ;    Return negative score
  SBC MSCORE       ;          for black
  SEC              ;
  SBC PSCORE       ;
  STA $0100,X      ;-----------------------------
                   ;
END_EVAL:          ;-----------------------------
  JMP RETURN       ;
                   ;
ENGINE_MOVE:       ;-----------------------------
  LDX BESTSRC      ;
  LDY BESTDST      ;
  LDA BOARD,X      ;  Make engine move on board
  STA BOARD,Y      ;
  LDA #$00         ;
  STA BOARD,X      ;-----------------------------
  LDA #$18         ;
  SEC              ;   Change the side to move
  SBC SIDE         ;
  STA SIDE         ;-----------------------------
                   ;
DISPLAY:           ;-----------------------------
  LDX BESTSRC      ;
  LDY BESTDST      ;
  LDA #$00         ;
  STX $FB          ;     Display engine move
  STY $FA          ;
  STA $F9          ;
  JSR $1F1F        ;
  JMP DISPLAY      ;-----------------------------

;=================================
;  ($01B1-$01FF) Fake RAM bytes
;=================================

DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00 
DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00 
DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00 
DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00 
DCB $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $39, $1F, $85, $1C

;=================================
;      ($0200-$03F5) SEARCH
;=================================
; --------------------------------
;            STACK MAP
; --------------------------------
; (SP + C): DEPTH
; (SP + B): SRC_SQUARE
; (SP + A): DST_SQUARE
; (SP + 9) : PIECE
; (SP + 8) : TYPE
; (SP + 7) : CAPTURED_PIECE
; (SP + 6) : DIRECTIONS
; (SP + 5) : STEP_VECTOR
; (SP + 4) : TEMP_SRC
; (SP + 3) : TEMP_DST
; (SP + 2) : RETURN_VALUE
; (SP + 1) : BEST_SCORE
; --------------------------------

START:             ;-----------------------------
  CLD              ;
  LDA #$03         ;       Search position
  JSR SEARCH       ;         with depth 3
  JMP ENGINE_MOVE  ;        (DEPTH: $0202)
                   ;
SQ_LOOP:           ;-----------------------------
  BIT OFFBOARD     ;    Skip offboard squares
  BNE SQ_BRIDGE    ;-----------------------------
  TAY              ;  
  LDA BOARD,Y      ;  Get piece at board square
  DEX              ;   and store it, skip if
  DEX              ;         wrong color
  STA $0100,X      ;         
  BIT SIDE         ;
  BEQ SQ_BRIDGE    ;-----------------------------
  AND #$07         ;     Extract piece type
  DEX              ;        and store it
  STA $0100,X      ;-----------------------------
  CLC              ;
  ADC #$1F         ;      Extract and store
  TAY              ;   directions offset for a 
  LDA OFFSETS,Y    ;    piece type to use as a
  DEX              ;  starting index to loop over
  DEX              ;
  STA $0100,X      ;-----------------------------
                   ;
OFFSET_LOOP:       ;-----------------------------
  TSX              ;
  TXA              ;   Extract direction offset
  CLC              ;       starting index
  ADC #$06         ;      and increment it
  TAX              ;
  INC $0100,X      ;-----------------------------
  LDA $0100,X      ;
  TAY              ;   Get next step vector of
  LDA OFFSETS,Y    ;   the offset and store it
  DEX              ;
  STA $0100,X      ;-----------------------------
  CMP #$00         ;  Break if no more offsets
  BEQ SQ_BRIDGE    ;-----------------------------
  TXA              ;
  CLC              ;
  ADC #$06         ;       Set up DST_SQAURE
  TAX              ;      equal to SRC_SQUARE
  LDA $0100,X      ;
  DEX              ;
  STA $0100,X      ;-----------------------------
  JMP SLIDE_LOOP   ;
                   ;-----------------------------
SQ_BRIDGE:         ;    Needed because of the
  JMP NEXT_SQUARE  ; branching range (-128 + 127)
                   ;-----------------------------
SLIDE_LOOP:        ;
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;      Load step vector
  ADC #$05         ;
  TAX              ;
  LDY $0100,X      ;-----------------------------
  TXA              ;
  CLC              ;
  ADC #$05         ;     Update DST_SQAURE by
  TAX              ;     adding the value of
  TYA              ;       STEP_VECTOR to it
  CLC              ;
  ADC $0100,X      ;
  STA $0100,X      ;-----------------------------
  BIT OFFBOARD     ; Break if hit the board edge
  BNE OFF_BRIDGE   ;-----------------------------
  TAY              ;
  TSX              ;
  TXA              ;
  CLC              ;  Store CAPTURED_PIECE from
  ADC #$07         ;      BOARD[DST_SQUARE]
  TAX              ;
  TYA              ;
  LDA BOARD,Y      ;
  STA $0100,X      ;-----------------------------
  BIT SIDE         ;  Don't capture own pieces
  BNE OFF_BRIDGE   ;
  INX              ;-----------------------------
  LDA $0100,X      ;
  SEC              ;   If piece type is a pawn
  CMP #$03         ;      verify pawn moves
  BCC IS_PAWN      ;
  JMP CHECK_KING   ;-----------------------------
                   ;-----------------------------
OFF_BRIDGE:        ;
  JMP NEXT_OFFSET  ;    Needed because of the
                   ; branching range (-128 + 127)
IS_PAWN:           ;
  DEX              ;-----------------------------
  LDA $0100,X      ;     Load captured piece
  TAY              ;-----------------------------
  DEX              ;
  DEX              ;
  LDA $0100,X      ;  Distinguish between push
  AND #$07         ;    and capture offsets
  CMP #$00         ;
  BEQ PAWN_PUSH    ;
  BNE PAWN_CAPTURE ;-----------------------------
                   ;
PAWN_PUSH:         ;-----------------------------
  TYA              ;
  CMP #$00         ;  Push pawn if empty square
  BNE OFF_BRIDGE   ;           is ahead
  JMP CHECK_KING   ;-----------------------------
                   ;
PAWN_CAPTURE:      ;
  TYA              ;-----------------------------
  CMP #$00         ;   Capture if piece if any
  BEQ OFF_BRIDGE   ;-----------------------------
                   ;
CHECK_KING:        ;
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;
  ADC #$07         ;
  TAX              ;      Is king captured?
  LDA $0100,X      ;
  AND #$07         ;
  CMP #$03         ;
  BEQ IS_KING      ;
  JMP MAKE_MOVE    ;-----------------------------
                   ;
IS_KING:           ;-----------------------------
  TSX              ;
  INX              ;
  INX              ; Return +INF on king capture
  LDA #$7F         ;
  STA $0100,X      ;
  JMP RETURN       ;-----------------------------
                   ;
MAKE_MOVE:         ;-----------------------------
  TSX              ;
  TXA              ;
  CLC              ;
  ADC #$0A         ;
  TAX              ;
  LDY $0100,X      ;  BOARD[DST_SQUARE] = PIECE
  DEX              ;  BOARD[SRC_SQUARE] = 0x00
  LDA $0100,X      ;
  STA BOARD,Y      ;
  INX              ;
  INX              ;
  LDY $0100,X      ;
  LDA #$00         ;
  STA BOARD,Y      ;-----------------------------
  LDA #$18         ;
  SEC              ;   Change the side to move
  SBC SIDE         ;
  STA SIDE         ;-----------------------------
                   ;
RECURSION:         ;-----------------------------
  TSX              ;
  TXA              ;
  CLC              ;      Get search depth
  ADC #$0C         ; (see stack map for details)
  TAX              ;
  LDA $0100,X      ;
  SEC              ;-----------------------------
  SBC #$01         ;     Search recursively
  JSR SEARCH       ;-----------------------------
  TSX              ;
  TXA              ;
  SEC              ;
  SBC #$0C         ;         Negate score
  TAX              ;
  LDA #$00         ;
  SEC              ;
  SBC $0100,X      ;
  STA SCORE        ;-----------------------------
                   ;
TAKE_BACK:         ;-----------------------------
  TSX              ;
  TXA              ;
  CLC              ;
  ADC #$0A         ;
  TAX              ;
  LDY $0100,X      ;
  DEX              ;
  DEX              ;  BOARD[DST_SQUARE] = CAP_P*
  DEX              ;  BOARD[SRC_SQUARE] = PIECE  
  LDA $0100,X      ;
  STA BOARD,Y      ;  *CAP_P is CAPTURED_PIECE
  INX              ;  
  INX              ;
  INX              ;
  INX              ;
  LDY $0100,X      ;
  DEX              ;
  DEX              ;
  LDA $0100,X      ;
  STA BOARD,Y      ;-----------------------------
  LDA #$18         ;
  SEC              ;   Change the side to move
  SBC SIDE         ;
  STA SIDE         ;-----------------------------
                   ;
COMPARE_SCORE:     ;-----------------------------
  TSX              ;
  INX              ;
  LDA $0100,X      ; Signed comparison of score
  SEC              ;        and best score
  SBC SCORE        ;
  BVC DONE_CMP     ;
  EOR #$80         ;-----------------------------
                   ;
DONE_CMP:          ;-----------------------------
  BMI UPDATE_SCORE ;
  JMP CONT         ; Update score if better move
                   ;
UPDATE_SCORE:      ;-----------------------------
  LDA SCORE        ;
  STA $0100,X      ;
  TSX              ;
  TXA              ;
  CLC              ;
  ADC #$0B         ;
  TAX              ;
  LDA $0100,X      ;
  STA TSRC         ;      BEST_SCORE = SCORE
  DEX              ;      TEMP_SRC = SRC_SQUARE
  LDA $0100,X      ;      TEMP_DST = DST_SQUARE
  STA TDST         ;
  TSX              ;
  INX              ;
  INX              ;
  INX              ;
  LDA TDST         ;
  STA $0100,X      ;
  INX              ;
  LDA TSRC         ;
  STA $0100,X      ;-----------------------------
                   ;
CONT:              ;-----------------------------
  TSX              ;
  TXA              ;
  CLC              ;   Stop sliding on capture
  ADC #$07         ;
  TAX              ;
  LDA $0100,X      ;
  TAY              ;-----------------------------
  INX              ;
  LDA $0100,X      ;   Handle double pawn pushes   
  SEC              ;
  CMP #$03         ;
  BCC IS_DOUBLE    ;-----------------------------
  SEC              ;   Skip sliding for leapers   
  CMP #$05         ;
  BCC NEXT_OFFSET  ;-----------------------------
                   ;
END_SLIDE:         ;-----------------------------
  TYA              ;
  CMP #$00         ;  Slide to the next square
  BNE NEXT_OFFSET  ;
  JMP SLIDE_LOOP   ;-----------------------------
                   ;
NEXT_OFFSET:       ;   Go to the next offset
  JMP OFFSET_LOOP  ;-----------------------------
                   ;
IS_DOUBLE:         ;
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;
  ADC #$0A         ;
  TAX              ;
  LDA $0100,X      ;
  AND #$70         ;
  CLC              ;  Slide one extra square if
  ADC SIDE         ; the pawn is on 2nd/7th rank
  ADC SIDE         ;
  ADC SIDE         ;
  ADC SIDE         ;
  ADC SIDE         ;
  ADC SIDE         ;
  CMP #$80         ;
  BEQ END_SLIDE    ;
  JMP NEXT_OFFSET  ;-----------------------------
                   ;
NEXT_SQUARE:       ;
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;
  ADC #$0B         ;
  TAX              ;      Go to next square
  INC $0100,X      ;
  LDA $0100,X      ; 
  CMP #$80         ;
  BNE REP_SQ       ;
  BEQ RETURN_BEST  ;----------------------------
                   ;
REP_SQ:            ;----------------------------
  JMP SQ_LOOP      ;
                   ;
RETURN_BEST:       ;----------------------------
  TSX              ;
  INX              ;
  LDA $0100,X      ;       Store best score
  INX              ;       as return value
  STA $0100,X      ;
  TSX              ;----------------------------
  INX              ;
  INX              ;
  INX              ;
  LDA $0100,X      ;     Associate best score
  STA BESTDST      ;        with best move
  INX              ;
  LDA $0100,X      ;
  STA BESTSRC      ;
                   ;
RETURN:            ;
  TSX              ;-----------------------------
  TXA              ;
  CLC              ;   Free up local variables
  ADC #$0C         ; (see stack map for details)
  TAX              ;          and return
  TXS              ;
  RTS              ;-----------------------------
