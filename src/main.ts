#!/usr/bin/env node
import { setOutput } from '@actions/core';

const enableDebug: boolean = /true/i.test(process.env.INPUT_ENABLE_DEBUG || '');

function initLogs(): void {
  console.info = (msg: string, data: any) => console.log(`::info::${msg}`, JSON.stringify(data));
  console.error = (msg: string, data: any) => console.log(`::error::${msg}`, JSON.stringify(data));
  console.debug = (msg: string, data: any) => {
    if (enableDebug) {
      console.log(`::eebug::${msg}`, JSON.stringify(data));
    }
  };
  console.warn = (msg: string, data: any) => console.log(`::warning::${msg}`, JSON.stringify(data));
  console.log('Github Action CoP: GitHub Action demo for CoP.');
}

const handleErrors = ({ step, error }: { step: string; error: any }) => {
  console.error(`Error: An error occured during ${step} with the following error.`, { error });
  process.exit(1);
};

function parseArgs(): {
  test: string;
} {
  const test: string = (process.env.INPUT_TEST || '').trim();
  if (!test) {
    handleErrors({ step: 'Init phasee', error: 'You must specify the test argument' });
  }

  return {
    test,
  };
}

function init(): void {
  initLogs();
  const { test } = parseArgs();

  console.group('Github Action arguments:');
  console.log('                        Test: ', test);
  console.log('            Is Debug enabled: ', enableDebug);
  console.groupEnd();

  setOutput('TEST_OUTPUT', `${test}-after-deployement`);
}

init();
