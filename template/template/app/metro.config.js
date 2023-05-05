/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const path = require('path');

 const extraNodeModules = {
   '@app/shared': path.resolve(__dirname, '../shared/src/App.js'),
 }
 
 module.exports = {
   watchFolders: [
     // watch for shared folder changes
     path.resolve(__dirname, '../shared/src'),
   ],
   transformer: {
     getTransformOptions: async () => ({
       transform: {
         experimentalImportSupport: false,
         inlineRequires: true,
       },
     }),
   },
   resolver: {
     // 在通过 node_modules 以及任何 nodeModulesPaths 进行标准查找后查询的包名称到目录的映射。 有关详细信息，请参阅模块解析。
     extraNodeModules: new Proxy(extraNodeModules, {
       get: (target, name) => {
         if (Object.keys(target).includes(name) && typeof target[name] === 'string') {
           return target[name]
         }
         return path.join(process.cwd(), `node_modules/${name}`)
       },
     }),
   },
 };
 