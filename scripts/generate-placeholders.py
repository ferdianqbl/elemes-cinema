import os
from PIL import Image, ImageDraw, ImageFont

public_dir = os.path.join(os.path.dirname(__file__), "..", "public")
os.makedirs(public_dir, exist_ok=True)

def create_poster():
    width, height = 500, 750
    img = Image.new("RGBA", (width, height), color=(7, 9, 14, 255))
    draw = ImageDraw.Draw(img)

    # Subtle gradient or background glow
    for y in range(height):
        # subtle top-to-bottom dark gradient
        ratio = y / height
        r = int(14 * (1 - ratio) + 2 * ratio)
        g = int(18 * (1 - ratio) + 3 * ratio)
        b = int(27 * (1 - ratio) + 5 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Hairline cyan-tinted border
    draw.rounded_rectangle([(16, 16), (width - 16, height - 16)], radius=8, outline=(0, 229, 255, 60), width=2)

    # Inner circular icon
    center_x, center_y = width // 2, height // 2 - 40
    radius = 56
    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=(14, 18, 27, 255), outline=(0, 229, 255, 120), width=2)

    # Film slate icon
    box_w, box_h = 44, 32
    draw.rectangle([(center_x - box_w//2, center_y - box_h//2), (center_x + box_w//2, center_y + box_h//2)], outline=(0, 229, 255, 255), width=2)
    # Triangle play icon in center
    draw.polygon([(center_x - 6, center_y - 8), (center_x + 8, center_y), (center_x - 6, center_y + 8)], fill=(0, 229, 255, 255))

    # Text
    draw.text((center_x, center_y + 90), "ELEMES CINEMA", fill=(255, 255, 255, 255), anchor="mm")
    draw.text((center_x, center_y + 120), "POSTER UNAVAILABLE", fill=(148, 163, 184, 255), anchor="mm")
    draw.text((center_x, center_y + 145), "ARCHIVE PREVIEW", fill=(56, 189, 248, 200), anchor="mm")

    out_path = os.path.join(public_dir, "placeholder-poster.png")
    img.save(out_path, "PNG")
    print(f"Generated {out_path}")

def create_backdrop():
    width, height = 1280, 720
    img = Image.new("RGBA", (width, height), color=(4, 6, 10, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(14 * (1 - ratio) + 2 * ratio)
        g = int(18 * (1 - ratio) + 3 * ratio)
        b = int(27 * (1 - ratio) + 5 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    draw.rounded_rectangle([(24, 24), (width - 24, height - 24)], radius=8, outline=(255, 255, 255, 20), width=2)

    center_x, center_y = width // 2, height // 2 - 30
    radius = 64
    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=(14, 18, 27, 255), outline=(0, 229, 255, 140), width=2)

    # Projector camera icon
    draw.rectangle([(center_x - 28, center_y - 18), (center_x + 12, center_y + 18)], outline=(0, 229, 255, 255), width=2)
    draw.polygon([(center_x + 12, center_y - 10), (center_x + 28, center_y - 20), (center_x + 28, center_y + 20), (center_x + 12, center_y + 10)], outline=(0, 229, 255, 255), fill=(7, 9, 14, 255))
    draw.ellipse([(center_x - 14, center_y - 6), (center_x - 2, center_y + 6)], outline=(56, 189, 248, 255), width=2)

    draw.text((center_x, center_y + 100), "ELEMES CINEMA", fill=(255, 255, 255, 255), anchor="mm")
    draw.text((center_x, center_y + 130), "CINEMATIC BACKDROP UNAVAILABLE", fill=(148, 163, 184, 255), anchor="mm")

    out_path = os.path.join(public_dir, "placeholder-backdrop.png")
    img.save(out_path, "PNG")
    print(f"Generated {out_path}")

def create_avatar():
    width, height = 400, 500
    img = Image.new("RGBA", (width, height), color=(7, 9, 14, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(14 * (1 - ratio) + 2 * ratio)
        g = int(18 * (1 - ratio) + 3 * ratio)
        b = int(27 * (1 - ratio) + 5 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    draw.rounded_rectangle([(16, 16), (width - 16, height - 16)], radius=8, outline=(255, 255, 255, 20), width=2)

    center_x, center_y = width // 2, height // 2 - 30
    radius = 54
    draw.ellipse([(center_x - radius, center_y - radius), (center_x + radius, center_y + radius)], fill=(14, 18, 27, 255), outline=(0, 229, 255, 140), width=2)

    # Portrait silhouette
    draw.ellipse([(center_x - 18, center_y - 32), (center_x + 18, center_y + 4)], fill=(0, 229, 255, 255))
    draw.chord([(center_x - 30, center_y - 4), (center_x + 30, center_y + 44)], start=0, end=180, fill=(0, 229, 255, 255))

    draw.text((center_x, center_y + 85), "ELEMES CINEMA", fill=(255, 255, 255, 255), anchor="mm")
    draw.text((center_x, center_y + 110), "PROFILE PHOTO UNAVAILABLE", fill=(148, 163, 184, 255), anchor="mm")

    out_path = os.path.join(public_dir, "placeholder-avatar.png")
    img.save(out_path, "PNG")
    print(f"Generated {out_path}")

if __name__ == "__main__":
    create_poster()
    create_backdrop()
    create_avatar()
