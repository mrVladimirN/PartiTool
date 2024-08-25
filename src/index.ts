import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const listFormats = async () => {
    try {
        const { platform } = process;
        let formats: string[];

        if (platform === 'darwin') {
            // macOS
            formats = ['APFS', 'HFS+', 'exFAT', 'FAT32', 'NTFS'];
        } else if (platform === 'win32') {
            // Windows
            formats = ['NTFS', 'FAT32', 'exFAT'];
        } else if (platform === 'linux') {
            // Linux
            formats = ['ext4', 'ext3', 'ext2', 'NTFS', 'FAT32', 'exFAT'];
        } else {
            throw new Error('Unsupported OS');
        }

        return formats.join(', ');
    } catch (error) {
        throw new Error(`Failed to list formats: ${(error as Error).message}`);
    }
};

export async function listExternalDrives(): Promise<string> {
    const { platform } = process;
    let command: string;

    if (platform === 'win32') {
        command = 'wmic logicaldisk get caption, drivetype, filesystem';
    } else if (platform === 'linux') {
        command = 'lsblk -o NAME,FSTYPE,MOUNTPOINT | grep /media';
    } else if (platform === 'darwin') {
        command = 'diskutil list';
    } else {
        throw new Error('Unsupported platform');
    }

    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
        throw new Error(stderr);
    }
    return stdout;
}

export async function checkDiskFormat(drive: string): Promise<string> {
    const { platform } = process;
    let command: string;

    if (platform === 'win32') {
        command = `fsutil fsinfo volumeinfo ${drive}`;
    } else if (platform === 'linux') {
        command = `lsblk -f ${drive}`;
    } else if (platform === 'darwin') {
        command = `diskutil info ${drive} | grep 'File System Personality'`;
    } else {
        throw new Error('Unsupported platform');
    }

    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
        throw new Error(stderr);
    }
    return stdout;
}

export async function formatDisk(drive: string, format: string): Promise<string> {
    const { platform } = process;
    let command: string;

    if (platform === 'win32') {
        command = `format ${drive} /FS:${format} /Q /Y`;
    } else if (platform === 'linux') {
        command = `mkfs.${format} ${drive}`;
    } else if (platform === 'darwin') {
        command = `diskutil eraseDisk ${format} NEW_NAME ${drive}`;
    } else {
        throw new Error('Unsupported platform');
    }

    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
        throw new Error(stderr);
    }
    return stdout;
}
