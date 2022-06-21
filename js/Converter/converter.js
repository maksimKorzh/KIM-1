function openConverter() {
  var w = window.open('', 'KIM-1 format converter', 'width=1036,height=515,resizable=no,scrollbars=no,toolbar=no,location=no,menubar=no,status=no');
  var html = '';
  
  html += '<html>';
  html +=   '<body>';
  html +=     '<title>KIM-1 format converter</title>';
  html +=     '<div>';
  html +=       '<button onclick="ptf2dcb();" style="width: 499px; margin: 5px; font-family: monospace;">Paper tape to DCB dump</button>';
  html +=       '<button onclick="hex2ptf();" style="width: 245px; margin: 5px; font-family: monospace;">HEX dump to paper tape</button>';
  html +=       '<button onclick="hex2dcb();" style="width: 245px; margin: 5px; font-family: monospace;">HEX 0x00 to DCB $00</button>';
  html +=     '</div>';
  html +=     '<div>';
  html +=       '<textarea id="sourceFormat" spellcheck="false" placeholder="Paste source format here..." rows="30" style="width: 499px; margin: 5px"></textarea>';
  html +=       '<textarea id="targetFormat" spellcheck="false" placeholder="Get target format from here..." rows="30" style="width: 499px; margin: 5px"></textarea>';
  html +=     '</div>';
  html +=   '<script src="js/Converter/converter.js"></script>';
  html +=   '</body>';
  html += '</html>';
  
  w.document.write(html);
  w.document.close();
}

function ptf2dcb() {
  // hook up text areas
  let ptf = document.getElementById('sourceFormat');
  let hex = document.getElementById('targetFormat');
  
  // temp variables
  let origin = '';
  let bytes = '';
  let targetFormat = '';
  
  // get rid of trailing characters
  let sourceFormat = ptf.value.trim();
  
  // split paper tape into lines
  let lines = sourceFormat.split('\n')
  
  // extract origin
  for (let i = 3; i < 7; i++) origin += sourceFormat[i];
  
  // extract bytes
  for (let i = 0; i < lines.length - 1; i++) {
    let currentLine = lines[i].slice(7, -4);
    let appendLine = 'dcb $';
    for (let c = 0; c < currentLine.length; c++) {
      appendLine += currentLine[c];
      if ((c % 2) != 0 && c != currentLine.length - 1) appendLine += ', $';
    } targetFormat += appendLine + '\n';
  }
  
  // output result format
  hex.value = '; Origin: ' + origin + '\n\n' + targetFormat;
}

function hex2ptf() {
  // hook up text areas
  let hex = document.getElementById('sourceFormat');
  let dcb = document.getElementById('targetFormat');

  // temp variables
  targetFormat = ''
  
  // get rid of trailing characters
  sourceFormat = hex.value.trim();
  
  // split hex dump into lines
  let lines = sourceFormat.split('\n')
  
  // convert hex dump to paper tape
  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i].split(' ');
    let appendLine = ''
    let bytenum = 0;
    let checksum = 0;
    for (let c = 1; c < currentLine.length; c++) {
      if (currentLine[c] == ' ') continue;
      if (currentLine[c] == ':') continue;
      if (currentLine[c] == '') continue;
      appendLine += currentLine[c].toUpperCase();
      checksum += parseInt(currentLine[c], 16);
      bytenum++;
    }
    let bytes = bytenum;
    let addrHigh = parseInt(currentLine[0].slice(0, -3), 16);
    let addrLow = parseInt(currentLine[0].slice(2, -1), 16);
    checksum += (addrHigh + addrLow + bytes);
    targetFormat += ';' + bytenum.toString(16).toUpperCase().padStart(2, '0') + currentLine[0].slice(0, -1) + appendLine + checksum.toString(16).toUpperCase().padStart(4, '0') + '\r\n';
  }
  
  // number of lines transmitted
  let linesNumber = ';00' + lines.length.toString(16).toUpperCase().padStart(4, '0') + lines.length.toString(16).toUpperCase().padStart(4, '0');
    
  // output result format
  dcb.value = targetFormat + linesNumber + '\r\n';
}

function hex2dcb() {
// hook up text areas
  let hex = document.getElementById('sourceFormat');
  let dcb = document.getElementById('targetFormat');
  
  // temp variables
  let origin = '';
  let bytes = '';
  let targetFormat = '';
  
  // get rid of trailing characters
  let sourceFormat = hex.value.trim();
  
  // split paper tape into lines
  let lines = sourceFormat.split('\n')
  
  // extract bytes
  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i];
    let appendLine = currentLine.split(',')
    for (let i = 0; i < appendLine.length; i++) appendLine[i] = appendLine[i].replace('0x', '$')
    appendLine = currentLine.slice(-1) == ',' ? appendLine.join(',').slice(0, -1) : appendLine.join(',');
    targetFormat += 'DCB ' + appendLine + '\n';
  }
  
  // output result format
  dcb.value = targetFormat;
}









