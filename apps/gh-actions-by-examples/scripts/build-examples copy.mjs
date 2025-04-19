// !/bin/bash

import { Pair, parse, parseDocument, Scalar, YAMLMap, YAMLSeq } from 'yaml';
import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

const folderPath = path.resolve('apps/gh-actions-by-examples/examples');
const files = fs.readdirSync(folderPath);
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

function main() {
  const filePath = path.resolve(folderPath, files[0]);
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = parseDocument(content);

  function logItem(item, level = 0) {
    const result = {
      comment: null,
      content: null,
      children: null,
    };

    if (item.value && item.value.commentBefore) {
      result.comment = item.value.commentBefore;
      // console.log(item.value.commentBefore);
    }
    if (!result.comment && item.key && item.key.commentBefore) {
      result.comment = item.key.commentBefore;
      // console.log(item.key.commentBefore);
    }

    if (item instanceof Scalar) {
      // console.log('\t'.repeat(level), item.value);
      result.content = item.value;
      return result;
    }

    if (item instanceof YAMLSeq) {
      result.content = item.items.map((i) => logItem(i, level + 1));
    }

    if (item instanceof YAMLMap) {
      result.content = item.items.map((i) => logItem(i, level + 1));
    }

    if (item instanceof Pair) {
      if (item.value instanceof Scalar) {
        // console.log('\t'.repeat(level), item.key.value, ':', item.value.value);
        result.content = `${item.key.value}: ${item.value.value}`;
      }

      if (item.value instanceof YAMLMap || item.value instanceof YAMLSeq) {
        // console.log('\t'.repeat(level), item.key.value, ':');
        result.content = item.key.value;
        result.children = item.value.items.map((i) => logItem(i, level + 1));
      }
    } else {
      // console.log(item);
    }

    return result;

    // if (item instanceof Scalar) {
    //   console.log(item);
    // }

    // console.log(item.key.value);

    // if (item.value && item.value.items) {
    //   console.log(item.value.items[0].value.items[0].value instanceof YAMLSeq);
    //   console.log(item.value.items[0].value.items[0].value instanceof Scalar);
    //   console.log(item.value.items[0].value.items[0] instanceof Pair);
    // } else {
    //   console.log(item.value.value, '\n\n');
    // }

    // if (item.value && item.value.items) {
    //   // console.log(`${item}:`);
    //   item.value.items.map((i) => logItem(i, level + 1));
    // } else {
    //   // console.log(`${item}:`, item.value.value);
    // }

    // if (item.value && item.value.items) {
    //   item.value.items.map((i) => logItem(i, level + 1));
    // }
  }

  const res = parsed.contents.items.map((item) => logItem(item));
  console.log(res);
  console.log('-'.repeat(50));

  // function returnContentUntilComment(res) {}

  function zipRes(res) {
    const result = [];

    for (const i of res) {
      const toAdd = {};
      toAdd.comment = i.comment;
      // console.log(i.comment);
      // console.log(i.content);

      if (i.children) {
        console.log('children');
        // console.log(i.children);
        // result.push({
        //   comment: i.comment,
        //   content: i.content,
        //   children: zipRes(i.children),
        // });
      }
    }

    return result;
  }

  console.log(zipRes(res));

  // parsed.contents.items.map((item) => console.log(item));

  // console.log(parsed.contents.items[2].value.items[0]);
}

main();
