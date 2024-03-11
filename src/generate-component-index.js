import fs from 'fs';

// ファイルパスからimport文を生成
const makeImportContent = (path, importContent) => {
    const name = path.match(/([^/]*)\./)[1];
    importContent += `import Mi${name} from '@/components/${path}';\n`;
    return importContent;
};

// ファイルパスからexport文を生成
const makeExportContent = (path, exportContent) => {
    const name = path.match(/([^/]*)\./)[1];
    exportContent += `    Mi${name},\n`;
    return exportContent;
};

// ファイルパスからinterface項目を生成
const makeInterfaceItemContent = (path, interfaceItemsContent) => {
    const name = path.match(/([^/]*)\./)[1];
    interfaceItemsContent += `        Mi${name}: typeof Mi${name};\n`;
    return interfaceItemsContent;
};

const filePaths = fs
    .readdirSync('./src/components', { recursive: true })
    .filter((path) => /.vue$/.test(path));

let importContent = '';
let exportContent = '';
let interfaceItemsContent = '';

filePaths.forEach((path) => {
    // コード生成
    importContent = makeImportContent(path, importContent);
    exportContent = makeExportContent(path, exportContent);
    interfaceItemsContent = makeInterfaceItemContent(path, interfaceItemsContent);
});

const content = `${importContent}
export {
${exportContent}
}

declare module 'vue' {
    interface GlobalComponents {
${interfaceItemsContent}
    }
}`;

// 書き込み
fs.writeFileSync('./src/components/index.ts', content);
