import * as program from 'commander';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as pusher from 'pusher';

import CONFIG_FILE_NAME from './utils/constants';

program
  .version('1.0.0')
  .description('Pusher CLI for testing Pusher Channels')

program
  .command('config')
  .description('Configure Pusher credentials')
  .action(async () => {
    const apiKey = await getUserInput('Enter your Pusher API Key: ');
    const apiSecret = await getUserInput('Enter your Pusher API Secret: ');

    const config = { apiKey, apiSecret };
    saveConfig(config);
  });