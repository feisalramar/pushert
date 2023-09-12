#!/usr/bin/env node

import { program } from "commander";
import Pusher from "pusher";
import PusherClient from "pusher-client";

import loadConfig from "./loadConfiguration.js";
import getUserInput from "./getUserInput.js";
import saveConfig from "./saveConfiguration.js";

Pusher.logToConsole = true;

program.version("1.1.1").description("Pusher CLI for testing Pusher Channels");

program
  .command("config")
  .description("Configure Pusher credentials")
  .action(async () => {
    const id = await getUserInput("Enter your Application ID: ");
    const apiKey = await getUserInput("Enter your Pusher API Key: ");
    const apiSecret = await getUserInput("Enter your Pusher API Secret: ");

    const cluster = (await getUserInput("Cluster eg. ap2 [ap2]: ")) || "ap2";
    const tls = (await getUserInput("Enable TLS? (y/n) [Y]: ")) || "y";

    const config = {
      key: apiKey,
      secret: apiSecret,
      id,
      cluster,
      tls: tls === "y" ? true : false,
    };

    saveConfig(config);
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

    const pusher = new Pusher({
      appId: config.id,
      key: config.key,
      secret: config.secret,
      cluster: config.cluster,
      useTLS: config.tls,
    });

    const getData = (str) => {   
        try {
            const json = JSON.parse(str);
            return json;
         }catch (e) {
            return str;
         }
    }

    await pusher.trigger(channel, event, getData(message) || {});

    console.log(`Message published to ${channel} - Event: ${event}`);
  });

program
  .command("subscribe <channel> <event>")
  .description("Subscribe to a Pusher channel and event")
  .action(async (channel, event) => {
    const config = loadConfig();
    if (!config) {
      console.error(
        'Please run "pusher config" to configure your Pusher credentials first.'
      );
      return;
    }

    const pusher = new PusherClient(config.key, {
      cluster: config.cluster,
      useTLS: config.tls,
    });

    const channelInstance = await pusher.subscribe(channel);

    channelInstance.bind(event, (data) => {
      console.log(`Received event '${event}' on channel '${channel}':`, data);
    });

    console.log(`Subscribed to ${channel} - Event: ${event}`);
  });

program.parse(process.argv);
