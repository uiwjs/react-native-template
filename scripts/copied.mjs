import fs from 'fs';
import FS from 'fs-extra';
import path from 'path';

async function getPaths(from, regx, paths = []) {
  try {
    const pathStr = (await fs.promises.readdir(from)).map(item => path.join(from, item))
    .map(item => regx.test(item) ? false : item)
    .filter(Boolean);

    await Promise.all(pathStr.map(async (item) => {
      const stat = await fs.promises.stat(item);
      if (stat.isDirectory()) {
        paths.push({
          path: item,
          isDir: true,
        });
        return getPaths(item, regx, paths)
      }
      paths.push({
        path: item,
        isFile: true,
      })
    }));
  } catch (error) {
    console.error(error);
  }
  return paths;
}

async function copyDir(from, to, options = {}) {
  try {
    await FS.emptyDir(to);
    const pathArr = await getPaths(from, new RegExp('(/node_modules|/ios/Pods|Podfile\.lock)'));
    await Promise.all(pathArr.map(async (item) => {
      const toPath = item.path.replace(new RegExp(`^${from}`), to);
      if (item.isDir) {
        await FS.ensureDir(toPath);
      } else if (item.isFile) {
        let relativePath = toPath.replace(new RegExp(`^${to}${path.sep}`), '');
        if (/^\./.test(relativePath)) {
          relativePath = relativePath.replace(/^\./, '_');
        }
        await FS.copy(item.path, path.join(to, relativePath));
        console.log(` ✅ ${relativePath}`);
      } else {
        console.log(' ⁉️ ‼️ :toPath',item, item.path)
      }
    }));
  } catch (error) {
    console.error(error)
  }
}

copyDir(path.resolve(process.cwd(), 'HelloWorld'), path.resolve(process.cwd(), 'template/template'));