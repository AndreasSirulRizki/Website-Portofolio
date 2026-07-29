with open(r"C:\Users\Administrator\Documents\Porthofolio 2\index.html", "rb") as f:
    raw = f.read()

idx = raw.find(b"Portfolio")
print("Raw bytes around title:", repr(raw[idx:idx+50]))

# Try decode as utf-8
try:
    text = raw.decode("utf-8")
    print("Decoded as utf-8 OK")
except Exception as e:
    print("UTF-8 failed:", e)
    text = raw.decode("latin-1")
    print("Decoded as latin-1")

# Show what the title looks like
import re
m = re.search(r'<title>.*?</title>', text)
if m:
    print("Title:", repr(m.group()))
