// !/bin/bash

import fs from 'fs';
import path from 'path';

const folderPath = path.resolve('apps/gh-actions-by-examples/examples');
const outputFolderPath = path.resolve(
  'apps/gh-actions-by-examples/src/examples'
);
const locales = fs.readdirSync(folderPath);

const COMMENT_REGEX = /#\s?/;

function main() {
  for (const locale of locales) {
    const finalOutputPath = path.resolve(outputFolderPath, locale);
    const files = fs
      .readdirSync(path.resolve(folderPath, locale))
      .filter((file) => file.endsWith('.yaml'));

    for (const file of files) {
      const filePath = path.resolve(folderPath, locale, file);
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

      if (!fs.existsSync(finalOutputPath)) {
        fs.mkdirSync(finalOutputPath);
      }

      fs.writeFileSync(
        path.resolve(finalOutputPath, file.replace('.yaml', '.json')),
        JSON.stringify(contentMap, null, 2)
      );
    }
  }
}

main();
