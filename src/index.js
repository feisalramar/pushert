#!/usr/bin/env node

import { program } from "commander";
import pusher from "pusher";

import loadConfig from "./loadConfiguration.js";
import getUserInput from "./getUserInput.js";
import saveConfig from "./saveConfiguration.js";

program.version("1.0.0").description("Pusher CLI for testing Pusher Channels");

program
  .command("config")
  .description("Configure Pusher credentials")
  .action(async () => {
    const id = await getUserInput("Enter your Application ID: ");
    const apiKey = await getUserInput("Enter your Pusher API Key: ");
    const apiSecret = await getUserInput("Enter your Pusher API Secret: ");

    const cluster =
      (await getUserInput("Cluster eg. eu-west-1: ")) || "eu-west-1";
    const tls = (await getUserInput("Enable TLS? (y/n): ")) || "y";

    const config = { key: apiKey, secret: apiSecret, id, cluster, tls };
    saveConfig(config);
  });

program
  .command("channel <channel>")
  .description("Configure Pusher default channel")
  .action(async () => {
    const config = loadConfig();
    const channel = await getUserInput("channel name: ");
    saveConfig({ ...config, channel });
  });

program
  .command("publish <channel> <event> <message>")
  .description("Publish a message to a Pusher channel")
  .action(async (channel, event, message) => {
    const config = loadConfig();
    if (!config) {
      console.error(
        'Please run "pusher config" to configure your Pusher credentials first.'
      );
      return;
    }

    const pusherClient = new pusher({
      appId: config.appId,
      key: config.apiKey,
      secret: config.apiSecret,
      cluster: config.cluster,
    });

    pusherClient.trigger(channel, event, JSON.parse(message));
    console.log(`Message published to ${channel} - Event: ${event}`);
  });

program
  .command("subscribe <channel> <event>")
  .description("Subscribe to a Pusher channel and event")
  .action((channel, event) => {
    const config = loadConfig();
    if (!config) {
      console.error(
        'Please run "pusher config" to configure your Pusher credentials first.'
      );
      return;
    }

    const pusherClient = new pusher({
      appId: config.appId,
      key: config.apiKey,
      secret: config.apiSecret,
      cluster: config.cluster,
    });

    const channelInstance = pusherClient.subscribe(channel);
    channelInstance.bind(event, (data) => {
      console.log(`Received event '${event}' on channel '${channel}':`, data);
    });

    console.log(`Subscribed to ${channel} - Event: ${event}`);
  });

program.parse(process.argv);
