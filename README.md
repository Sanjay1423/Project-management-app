# Paperflite Native Application

Paperflite React native application for IOS and Android platforms

---

## Table of Contents

1. [Project OverView](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
    - [IOS Setup](#ios-setup)
    - [Android Setup](#android-setup)
4. [Project Structure](#project-structure)

## Project OverView

Paperflite is a React Native mobile application designed to work seamlessly on both iOS and Android platforms. The app allows users to manage and access Paperflite features directly from their mobile devices.


## Prerequisites

Before setting up the project, ensure that you have the following tools installed:


1. **Node.js**: Download and install [Node.js](https://nodejs.org/en/download/source-code). You can check if Node.js is installed by running:

```bash
node -v
```

2. **Watchman**: Install Watchman, which is used to watch changes in the filesystem:

```bash
brew install watchman
```

3. **React Native CLI**: Install React Native CLI globally

```bash
npm install -g react-native-cli
```

4. **CocoaPods** (for iOS setup): Install CocoaPods for managing iOS dependencies:

```bash
sudo gem install cocoapods
```

5. **Xcode**: Install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store, and ensure the Xcode command line tools are installed:

```bash
xcode-select --install
```

6. **Android Studio**: Download and install [Android Studio](https://developer.android.com/studio). Ensure the Android SDK and Android Virtual Device (AVD) are set up properly.


## Installation

To set up and install the Paperflite React Native application,


#### Step 1: Clone the Repository

```bash
https://github.com/paperflite-marketing/pf-native-devices.git

cd pf-native-devices
```

#### Step 2: Install Dependencies
Install the required Node.js packages:


```bash
npm install
```

### IOS Setup

To run the iOS app:

1. Navigate to the ==ios== directory and install CocoaPods dependencies:

```bash
cd ios
pod install

```

2. Open the project in Xcode:

```bash
open ios/Paperflite.xcworkspace
```

3.  In Xcode, select a target device (If not download the simulators)

4. Run the project in Xcode or using the command

```bash
npx react-native run-ios
```

### Android Setup

To run the Android app:

1. Open Android Studio and set up an Android Emulator through the AVD Manager.


```bash
npx react-native run-android
```

## Project Structure

Overview of Paperflite native project Structure

```
Paperflite
│
├── android             
├── ios                 
├── src                 
│   ├── components      
│   ├── screens         
│   ├── navigation      
│   ├── assets          
│   └── services        
├── App.js                    
└── package.json    
```
