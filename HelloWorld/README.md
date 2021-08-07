HelloWorld
---

React Native UIW Template

## Development

```bash
cd ios/ && pod install && cd ../

# Mocker API
npm run api

# Run the app with iOS.
npm run ios
```

**⚠️⚠️ MacBook Pro with a M1 ⚠️⚠️**

```bash
# Install ffi
sudo arch -x86_64 gem install ffi

# Clear pods.
pod deintegrate
# pod rm Podfile.lock
arch -x86_64 pod install
# Re-install pods
arch -x86_64 pod install --repo-update --verbose
```

## Main Directory Structure

```
.
├── mocker                            # mocker data
├── android                           # native android code
├── ios                               # native ios code
├── src                               # code directory
│   ├── components                    # react components
│   ├── models                        # The models brings together state, reducers, async actions & action creators in one place
│   ├── pages                         # route pages
│   ├── routes                        # route configuration
│   ├── services                      # api request
│   ├── utils                         # public method
│   ├── App.js                        # route entery page
│   ├── config.js                     # app configuration
│   └── global.js                     # Store some global objects for easy calling
├── .eslintrc                         # eslint configuration
├── index.js                          # app entry file
└── package.json                      # This document is all you need to know about what’s required in your package.json file.
```