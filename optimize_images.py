
import os
from PIL import Image

def optimize_images(source_dir, dest_dir, max_width=1600):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            source_path = os.path.join(source_dir, filename)
            
            # Change extension to .webp
            name, _ = os.path.splitext(filename)
            dest_filename = f"{name}.webp"
            dest_path = os.path.join(dest_dir, dest_filename)

            try:
                with Image.open(source_path) as img:
                    # Calculate new height to maintain aspect ratio
                    width, height = img.size
                    if width > max_width:
                        new_height = int((max_width / width) * height)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    
                    # Save as WebP
                    img.save(dest_path, "WEBP", quality=80)
                    print(f"Optimized: {filename} -> {dest_filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    source_directory = r"c:\Users\Mr_Komlan\.gemini\antigravity\scratch\OFITNESS\images\Project_3"
    dest_directory = r"c:\Users\Mr_Komlan\.gemini\antigravity\scratch\OFITNESS\images\Project_3_Optimized"
    optimize_images(source_directory, dest_directory)
