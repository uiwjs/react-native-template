# React Native UIW Template

React Native template for [@uiw/react-native](https://github.com/uiwjs/react-native-uiw). 

## Features

- Elegant usage directly within the [React Native CLI](https://github.com/react-native-community/cli)
- Consistent with the default React Native template
- Minimal additional dependencies

## Usage

⚠️ This template only works with the new CLI. 

### Note on the legacy CLI

⚠️ There seems to be quite some confusion about the legacy CLI [@react-native-community/react-native-template-typescript/#80](https://github.com/react-native-community/react-native-template-typescript/issues/80). This template only works with the new CLI. Make sure you have uninstalled the legacy `react-native-cli` first (`npm uninstall -g react-native-cli`), for the below command to work. 

```bash
npm uninstall -g react-native-cli
```

Further information can be found here: https://github.com/react-native-community/cli#about

**`react-native@0.61.0` or higher**

```sh
npx react-native init MyApp --template react-native-template-uiw
```

If you wish to not use `npx`, you can also install the new CLI globally (`npm i -g @react-native-community/cli` or `yarn global add @react-native-community/cli`).

```bash
react-native init MyApp --template react-native-template-uiw
```

```bash
# This will initialize new project using template from TEMPLATE_NAME package
npx react-native init ProjectName --template ${TEMPLATE_NAME}

# This will initialize new project using init command from react-native@VERSION but will use TEMPLATE_NAME custom template
npx react-native@${VERSION} init ProjectName --template ${TEMPLATE_NAME}
```

## Contributing

Contributions are very welcome. Please check out the [contributing document](CONTRIBUTING.md).

## License

This project is [MIT](LICENSE) licensed.
