# HEX (xxd -i file.bin) to DCB converter (KIM-1 emulator)
prog = ''

with open('test.hex') as f:
    for line in f.read().replace('0x', '$').split('\n')[:-1]:
        prog += 'DCB ' + (line[:-1] if line[-1] == ',' else line) + '\n'

with open('out.dcb', 'w') as f:
    f.write(prog)
