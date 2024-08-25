# PartiTool CLI

**PartiTool** is a command-line interface (CLI) tool for managing disk formats across different operating systems. It supports listing external drives, checking disk formats, and formatting drives to various file systems.

## Table of Contents

- [PartiTool CLI](#partitool-cli)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Global Installation](#global-installation)
    - [Local Installation](#local-installation)
  - [Usage](#usage)
    - [Global CLI Commands](#global-cli-commands)
      - [`parti-tool list`](#parti-tool-list)
      - [`parti-tool check <drive>`](#parti-tool-check-drive)
      - [`parti-tool format <drive> <format>`](#parti-tool-format-drive-format)
    - [Command Details](#command-details)
      - [`list`](#list)
      - [`check <drive>`](#check-drive)
      - [`format <drive> <format>`](#format-drive-format)
  - [Supported Formats](#supported-formats)
    - [Windows](#windows)
    - [Linux](#linux)
    - [macOS](#macos)
  - [Supported Platforms](#supported-platforms)
  - [Testing](#testing)
    - [Windows](#windows-1)
    - [Linux](#linux-1)
    - [macOS](#macos-1)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

### Global Installation

To install PartiTool globally, run the following command:

```sh
yarn global add parti-tool
```

This will make the `parti-tool` command available globally on your system.

### Local Installation

To use PartiTool locally within a project, you can add it to your `devDependencies`:

```sh
yarn add --dev parti-tool
```

You can then use it through npm scripts or directly with `npx`:

```sh
npx parti-tool
```


## Usage

### Global CLI Commands

Once installed globally, you can use the `parti-tool` command from your terminal. Here are the available commands:

#### `parti-tool list`

List all external drives connected to the system.

**Example:**

```sh
parti-tool list
```

#### `parti-tool check <drive>`

Check the current file system format of the specified drive.

**Example:**

```sh
parti-tool check /dev/disk2
```


#### `parti-tool format <drive> <format>`

Format the specified drive to the given file system format.

**Example:**

```sh
parti-tool format /dev/disk2 FAT32
```


### Command Details

#### `list`

Lists all external drives connected to the system.

- **Windows**: Uses `wmic logicaldisk get caption, drivetype, filesystem`
- **Linux**: Uses `lsblk -o NAME,FSTYPE,MOUNTPOINT | grep /media`
- **macOS**: Uses `diskutil list`

#### `check <drive>`

Checks the file system format of the specified drive.

- **Windows**: Uses `fsutil fsinfo volumeinfo <drive>`
- **Linux**: Uses `lsblk -f <drive>`
- **macOS**: Uses `diskutil info <drive> | grep 'File System Personality'`

#### `format <drive> <format>`

Formats the specified drive to the given file system format.

- **Windows**: Uses `format <drive> /FS:<format> /Q /Y`
- **Linux**: Uses `mkfs.<format> <drive>`
- **macOS**:
  - Whole disk: Uses `diskutil eraseDisk <format> NEW_NAME <drive>`
  - Volume: Uses `diskutil eraseVolume <format> NEW_NAME <drive>`

## Supported Formats

### Windows

- **NTFS**
- **FAT32**
- **exFAT**

### Linux

- **ext4**
- **ext3**
- **ext2**
- **NTFS**
- **FAT32**
- **exFAT**

### macOS

- **APFS**
- **HFS+**
- **exFAT**
- **FAT32**
- **NTFS**

## Supported Platforms

- **Windows** (`win32`)
- **Linux** (`linux`)
- **macOS** (`darwin`)

## Testing

To test PartiTool across different platforms and formats, you can use the following commands:

### Windows

1. **List Drives**: 
    ```
    parti-tool list
    ```
2. **Check Format**:
    ```
    parti-tool check D:
    ```
3. **Format Drive**:
    ```
    parti-tool format D: NTFS
    ```

### Linux

1. **List Drives**: 
    ```
    parti-tool list
    ```
2. **Check Format**:
    ```
    parti-tool check /dev/sdX
    ```
3. **Format Drive**:
    ```
    parti-tool format /dev/sdX ext4
    ```

### macOS

1. **List Drives**: 
    ```
    parti-tool list
    ```
2. **Check Format**:
    ```
    parti-tool check /dev/disk2
    ```
3. **Format Drive**:
    ```
    parti-tool format /dev/disk2s1 FAT32
    ```

## Contributing

Contributions to PartiTool are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

PartiTool is licensed under the [MIT License](LICENSE).
