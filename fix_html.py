with open(r"C:\Users\Administrator\Documents\Porthofolio 2\index.html", "rb") as f:
    raw = f.read()

# Decode sebagai latin-1 supaya bisa lihat karakter yang rusak
text = raw.decode("latin-1")

# Perbaiki karakter yang rusak (double-encoded UTF-8 dibaca sebagai latin-1)
fixes = [
    ("\u00e2\u0080\u0094", "\u2014"),   # â€" -> —
    ("\u00c2\u00a9",       "\u00a9"),   # Â© -> ©
    ("\u00e2\u0099\u00a5", "\u2665"),   # â™¥ -> ♥
    ("\u00e2\u009c\u00a6", "\u2726"),   # âœ¦ -> ✦
    ("\u00c2\u00a0",       " "),        # Â  -> space
    ("\u00c3\u00a9",       "\u00e9"),   # é
]

for bad, good in fixes:
    text = text.replace(bad, good)

with open(r"C:\Users\Administrator\Documents\Porthofolio 2\index.html", "w", encoding="utf-8") as f:
    f.write(text)

print("Selesai!")
