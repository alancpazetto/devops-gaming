// !/bin/bash

import { Pair, parse, parseDocument, Scalar, YAMLMap, YAMLSeq } from 'yaml';
import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

const folderPath = path.resolve('apps/gh-actions-by-examples/examples');
const files = fs
  .readdirSync(folderPath)
  .filter((file) => file.endsWith('.yaml'));
// const contents = files.map((file) => path.resolve(folderPath, file));
// .map((file) => extractCommentBlocks(file));
// .map((file) => fs.readFileSync(file, 'utf-8'))
// .map((file) => parseDocument(file));

// console.log(await Promise.all(contents));

// async function extractCommentBlocks(filePath) {
//   const content = await readFile(filePath, 'utf-8');
//   const lines = content.split('\n');

//   const result = [];
//   let currentComment = null;
//   let currentBlock = [];

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i].trim();

//     if (line.startsWith('#')) {
//       if (currentComment && currentBlock.length > 0) {
//         result.push({
//           comment: currentComment,
//           content: currentBlock.join('\n'),
//         });
//         currentBlock = [];
//       }

//       currentComment = line.replace(/^#\s?/, '').trim();
//     } else if (line === '') {
//       continue;
//     } else {
//       currentBlock.push(lines[i]); // mantém indentação original
//     }
//   }

//   if (currentComment && currentBlock.length > 0) {
//     result.push({
//       comment: currentComment,
//       content: currentBlock.join('\n'),
//     });
//   }

//   return result;
// }

const COMMENT_REGEX = /#\s?/;

function main() {
  const filePath = path.resolve(folderPath, files[0]);
  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split('\n');
  let inComment = false;
  let currentIndex = -1;
  const contentMap = [];
  console.log(content);
  for (const line of lines) {
    if (line.trim() === '') {
      continue;
    }

    if (line.match(COMMENT_REGEX)) {
      const comment = line.trim().replace(COMMENT_REGEX, '');

      if (inComment) {
        contentMap[currentIndex].comment += `\n${comment}`;
        continue;
      }

      currentIndex += 1;
      contentMap.push({
        comment,
        content: '',
      });
      inComment = true;
      continue;
    }

    if (currentIndex === -1) {
      currentIndex += 1;
      contentMap.push({
        comment: '',
        content: '',
      });
    }

    if (contentMap[currentIndex].content === '') {
      contentMap[currentIndex].content += line;
    } else {
      contentMap[currentIndex].content += `\n${line}`;
    }
    inComment = false;
  }

  // console.log(contentMap);

  fs.writeFileSync(
    filePath.replace('.yaml', '.json'),
    JSON.stringify(contentMap, null, 2)
  );
}

main();
