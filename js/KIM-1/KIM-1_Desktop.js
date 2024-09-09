function openEmulator() {
  var w = window.open('', 'null', 'width=680,height=426,resizable=no,scrollbars=no,toolbar=no,location=no,menubar=no,status=no');
  var html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="css/style_old_school.css" rel="stylesheet" type="text/css" />
        <script src="js/7-segment-display/p5.min.js"></script>
        <script src="js/7-segment-display/p5.dom.min.js"></script>
        <title>Online KIM-1 emulator</title>
        <link rel="stylesheet" type="text/css" href="">
        <meta charset="utf-8">  
      </head>
      <body style="background-color: black;">
        <!--Emulator -->
        <div>
          <canvas class="screen" width="160" height="160" hidden></canvas>
          <input  id="SST" type="checkbox" onchange="single_step ^= 1" style="position: absolute; width: 60px; height: 60px; left: 176px; top: 61px; background-color: black; color: #bbb; ont-size: 25px; cursor: pointer;"/>
          <button id="GO" onmousedown="keypad(0x13);" onmouseup="lightdown(); char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 64px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">GO</button>
          <button id="ST" onmousedown="stop();"       onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 64px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">ST</button>
          <button id="RS" onmousedown="reset();"      onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 64px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">RS</button>
          <button id="AD" onmousedown="keypad(0x10);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 124px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">AD</button>
          <button id="DA" onmousedown="keypad(0x11);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 124px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">DA</button>
          <button id="PC" onmousedown="keypad(0x14);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 124px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">PC</button>
          <button id="+"  onmousedown="keypad(0x12);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 180px; top: 124px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">+</button>
          <button id="C"  onmousedown="keypad(0x0c);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 184px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">C</button>
          <button id="D"  onmousedown="keypad(0x0d);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 184px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">D</button>
          <button id="E"  onmousedown="keypad(0x0e);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 184px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">E</button>
          <button id="F"  onmousedown="keypad(0x0f);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 180px; top: 184px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">F</button>
          <button id="8"  onmousedown="keypad(0x08);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 244px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">8</button>
          <button id="9"  onmousedown="keypad(0x09);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 244px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">9</button>
          <button id="A"  onmousedown="keypad(0x0a);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 244px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">A</button>
          <button id="B"  onmousedown="keypad(0x0b);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 180px; top: 244px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">B</button>
          <button id="4"  onmousedown="keypad(0x04);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 304px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">4</button>
          <button id="5"  onmousedown="keypad(0x05);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 304px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">5</button>
          <button id="6"  onmousedown="keypad(0x06);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 304px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">6</button>
          <button id="7"  onmousedown="keypad(0x07);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 180px; top: 304px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">7</button>
          <button id="0"  onmousedown="keypad(0x00);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 0px; top: 364px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">0</button>
          <button id="1"  onmousedown="keypad(0x01);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 60px; top: 364px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">1</button>
          <button id="2"  onmousedown="keypad(0x02);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 120px; top: 364px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">2</button>
          <button id="3"  onmousedown="keypad(0x03);" onmouseup="char_pending = 0x15;" style="position: absolute; width: 60px; height: 60px; left: 180px; top: 364px; background-color: black; color: #bbb; font-size: 25px; cursor: pointer;">3</button>
          <div id="serial_monitor" onclick="serial_mode ^= 1; reset(); document.activeElement.blur(); turnOffLED();" style="position: absolute; top: 64px; left: 240px; width: 428px; height: 349px; border: 1px solid grey; background-color: #000000; color: #00FF00; padding: 5px; overflow-y: hidden; word-wrap: break-word; font-family: monospace; font-size: 19px;"></div>
          <input id="load" type="button" value="IMPORT PAPER TAPE" class="buttons" style="font-size: 18px; position: absolute; left: 240px; top: 0px; width: 440px; height: 32px;"/>
          <input id="save" type="button" value="EXPORT PAPER TAPE" class="buttons" style="font-size: 18px; position: absolute; left: 240px; top: 32px; width: 440px; height: 32px;"/>
          <input id="toggleDisplayMode" type="checkbox" style="display: none; position: relative; top: 5px; margin: 0px; margin-left: 7px; padding: 0px; width: 19px; height: 19px;"/>
        </div>

        <script src="js/7-segment-display/Segment.js"></script>
        <script src="js/7-segment-display/SegmentDisplay.js"></script>
        <script src="js/6502_CPU/6502.dev.js"></script>
        <script src="js/KIM-1/KIM-1.js"></script>
        <script src="js/ASM/jquery.min.js"></script>
        <script>
          // save program
          $('#save').on('click', function() {
            let from = parseInt(prompt("Enter start address:"));
            let to = parseInt(prompt("Enter end address:"));
            let numRecord = 0;
            let ptp = '';
            for (let addr = from; addr <= to; addr += 24) {
              numRecord++;
              let record = '';
              let addrStr = addr.toString(16).padStart(4, '0').toUpperCase();
              let bytes = RAM.slice(addr, addr+24);
              record += ';18' + addrStr;
              let checksum = 0x18 + parseInt(addrStr.slice(0,2), 16) + parseInt(addrStr.slice(2,4), 16);
              for (let i = 0; i < bytes.length; i++) {
                let byte = bytes[i].toString(16).padStart(2, '0').toUpperCase();
                record += byte;
                checksum += bytes[i];
              }
              checksum = checksum.toString(16).padStart(4, '0').toUpperCase();
              record += checksum + '\\r\\n';
              ptp += record;
            }
            summary = numRecord.toString(16).padStart(4, '0').toUpperCase();
            summaryCheckSum = (parseInt(summary.slice(0,2), 16) + parseInt(summary.slice(2,4), 16)).toString(16).padStart(4, '0').toUpperCase();
            ptp += ';00' + summary + summaryCheckSum;
            const blob = new Blob([ptp], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'KIM-1.PTP';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          });

          // load program
          $('#load').on('click', function() {
            let memory = [];
            let ptp = prompt('Paste your PTP here...').split('\\n');
            let start = parseInt(ptp[0].slice(3,7), 16);
            for (let i = 0; i < ptp.length-1; i++) {
              let bytes = ptp[i].slice(7, 55);
              for (let j = 0; j < bytes.length; j+=2) {
                let byte = parseInt(bytes[j] + bytes[j+1], 16);
                memory.push(byte);
              }
            }
            for (let i = start; i < memory.length+start; i++) RAM[i] = parseInt(memory[i-start]);
            alert('Your paper tape has been uploaded to memory at 0x' + start.toString(16).padStart(4, '0').toUpperCase());
          });
          
          // display size
          DISPLAY_WIDTH = 240;
          DISPLAY_HEIGHT = 64;
          DISPLAY_TRANSFORM_WIDTH = 2.5;
          DISPLAY_TRANSFORM_HEIGHT = 2.66;
          SEGMENT_WIDTH = 5;
          SEGMENT_HEIGHT = 12;
          SEGMENT_THICK = 4;
          SEGMENT_OFFSET = 11;
          
          // init display
          function setup() {
            let cnv = createCanvas(DISPLAY_WIDTH, DISPLAY_HEIGHT);
            cnv.position(0, 0);
            frameRate(60);
            ssd1 = new SegmentDisplay("7"); ssd1.update();
            ssd2 = new SegmentDisplay("7"); ssd2.update();
            ssd3 = new SegmentDisplay("7"); ssd3.update();
            ssd4 = new SegmentDisplay("7"); ssd4.update();
            ssd5 = new SegmentDisplay("7"); ssd5.update();
            ssd6 = new SegmentDisplay("7"); ssd6.update();
          }
          
          // update display
          function draw() {
            background(25);
            ssd1.update();
            ssd2.update();
            ssd3.update();
            ssd4.update();
            ssd5.update();
            ssd6.update();
          }
          
          // hack to light down LEDs before running a program        
          function lightdown() {
            ssd1.displayDigit(0); ssd1.update();
            ssd2.displayDigit(0); ssd2.update();
            ssd3.displayDigit(0); ssd3.update();
            ssd4.displayDigit(0); ssd4.update();
            ssd5.displayDigit(0); ssd5.update();
            ssd6.displayDigit(0); ssd6.update();
          }
          
          function keypad(key) { char_pending = key; }
          function resetCPU() { cpu.reset(); cpu.log(); }
          function stepCPU() { cpu.step(); cpu.log(); }
        </script>
      </body>
    </html-->
  `;
  w.document.write(html);
  w.document.close()
  w.focus();
}
