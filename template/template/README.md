
## iOS/Android 应用

### Macbook 安装

```bash
cd ios/
$ bundle install
$ bundle exec pod install
```

Macbook **`M1`** 安装

```bash
cd ios/
$ arch -arm64 bundle install
$ arch -arm64 bundle exec pod install
```

启动 React Native 服务

```bash
$ yarn start --reset-cache
```

## 目录说明

更新 3 个文件，快速升级 React Native

```bash
.
├── .gitignore
├── README.md
├── app         # iOS/Android 原生应用
│   ├── android
│   ├── app.json
│   ├── index.js
│   ├── ios
│   ├── metro.config.js
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── shared    # React Native 业务逻辑
    ├── README.md
    ├── package.json
    └── src
        └── App.js
```

### `app/index.js`

```diff
+ import App from '@app/shared';
- import App from './App';
```

### `app/metro.config.js`

```diff
+ const path = require('path');

+ const extraNodeModules = {
+   '@app/shared': path.resolve(__dirname, '../shared/src/App.js'),
+ }

module.exports = {
+  watchFolders: [
+    // watch for shared folder changes
+    path.resolve(__dirname, '../shared/src'),
+  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
+  resolver: {
+    // 在通过 node_modules 以及任何 nodeModulesPaths 进行标准查找后查询的包名称到目录的映射。 有关详细信息，请参阅模块解析。
+    extraNodeModules: new Proxy(extraNodeModules, {
+      get: (target, name) => {
+        if (Object.keys(target).includes(name) && typeof target[name] === 'string') {
+          return target[name]
+        }
+        return path.join(process.cwd(), `node_modules/${name}`)
+      },
+    }),
+  },
};
```

### `app/package.json`

与原生相关的包需要在 `app` 项目中安装

```diff
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.71.7",
+    "@app/shared": "1.0.0",
+    "@react-native-async-storage/async-storage": "~1.17.11",
+    "@react-native-community/masked-view": "~0.1.11",
+    "@react-navigation/bottom-tabs": "~6.3.2",
+    "@react-navigation/native": "~6.0.11",
+    "@react-navigation/stack": "~6.2.2",
+    "react-native-safe-area-context": "~4.3.1",
+    "react-native-reanimated": "3.1.0",
+    "@uiw/react-native": "^4.0.2",
+    "react-native-gesture-handler": "2.8.0",
+    "react-native-root-siblings":"4.1.1",
+    "react-native-svg": "13.9.0",
+    "react-native-device-info": "~10.0.2",
+    "react-native-screens": "~3.15.0"
  }
}
```
