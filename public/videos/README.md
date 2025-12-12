Place your video files in this folder for the site to serve them directly.

Recommended filenames and formats (provide at least two variants for best compatibility):
- hero.webm  (preferred modern WebM/AV1 or VP9)
- hero.mp4   (H.264 fallback)

How to use:
- Add the files above to `public/videos/`.
- The About page will automatically use `hero` as the default `srcBase` for the player.

Notes:
- Keep file sizes reasonable for web (encode at moderate bitrate, e.g. 1-2Mbps for 720p).
- Provide a light-weight poster image in `public/images/` and reference it as `poster`.
- If you prefer external hosting (YouTube/Vimeo), update the About page to use an iframe instead.

If you want, I can add a script to transcode/resize images locally (requires ffmpeg).