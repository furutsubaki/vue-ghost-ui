import fs from 'fs';

const filePaths = fs
    .readdirSync('./src/components', { recursive: true })
    .filter((path) => /.vue$/.test(path));

let content = '';
filePaths.forEach((path) => {
    // ファイル読み込み
    content = makeIndexContent(path, content);
    fs.writeFileSync('./src/components/index.ts', content);
});

// ファイル一覧からexportの文を作る
function makeIndexContent(path, content) {
    const name = path.match(/([^/]*)\./)[1];
    content += `export * as Mi${name} from '@/components/${path}'\n`;
    return content;
}
