import codecs

with open(r'C:\Users\Administrator\Documents\Porthofolio 2\index.html', 'rb') as f:
    raw = f.read()

# Decode as latin-1 dulu lalu encode ulang sebagai utf-8
try:
    text = raw.decode('utf-8')
except:
    text = raw.decode('latin-1')

fixes = [
    ('\u00e2\u0080\u0094', '\u2014'),
    ('\u00c2\u00a9', '\u00a9'),
    ('\u00e2\u0099\u00a5', '\u2665'),
    ('\u00e2\u009c\u00a6', '\u2726'),
]
for bad, good in fixes:
    text = text.replace(bad, good)

with open(r'C:\Users\Administrator\Documents\Porthofolio 2\index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done')
