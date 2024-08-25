#!/usr/bin/env node

import { Command } from 'commander';
import {
  listExternalDrives, checkDiskFormat, formatDisk, listFormats
} from '.';

const program = new Command();

program
  .version('1.0.0')
  .description('Disk Manager CLI');

program
  .command('list')
  .description('List external drives')
  .action(async () => {
    try {
      const output = await listExternalDrives();
      console.log(output);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  });

program
  .command('check')
  .description('Check the format of a drive')
  .argument('<drive>', 'Drive to check (e.g., D:, /dev/sdX, /dev/diskX)')
  .action(async (drive) => {
    try {
      const output = await checkDiskFormat(drive);
      console.log(`Current format: ${output}`);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  });

program
  .command('format')
  .description('Format a drive to a specified format')
  .argument('<drive>', 'Drive to format (e.g., D:, /dev/sdX, /dev/diskX)')
  .argument('<format>', 'File system format (e.g., FAT32, NTFS, ext4)')
  .action(async (drive, format) => {
    try {
      const output = await formatDisk(drive, format);
      console.log(`Formatting result: ${output}`);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  });

program
  .command('list-formats')
  .description('List all available formats based on the current operating system')
  .action(async () => {
    try {
      const formats = await listFormats();
      console.log(`Available formats: ${formats}`);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  });

program.parse(process.argv);
