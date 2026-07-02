import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import ffmpegStatic from 'ffmpeg-static';

const videoPath = 'D:\\db\\Burger_dipped_in_sauce_explosion_202607022351.mp4';
const outputDir = path.join(process.cwd(), 'public', 'frames-sauce');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extract frames at 30fps and crop top-right/bottom-right watermarks by scaling slightly.
const cropFilter = 'crop=iw*0.9:ih*0.9:iw*0.05:ih*0.05';

console.log('Extracting frames for sauce explosion with ffmpeg...');

const args = [
  '-i', videoPath,
  '-vf', `fps=30,${cropFilter}`,
  '-qscale:v', '2',
  path.join(outputDir, 'frame_%04d.jpg')
];

execFile(ffmpegStatic, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error extracting frames:', error);
    return;
  }
  console.log('Frames extracted successfully to public/frames-sauce!');
});
