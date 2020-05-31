#!/usr/bin/env node

import 'source-map-support/register'
// import * as clc from 'cli-color'
// import * as commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'

async function main() {
  const sections = [
    {
      header: 'A typical app',
      content: 'Generates something {italic very} important.',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'input',
          typeLabel: '{underline file}',
          description: 'The input to process.',
        },
        {
          name: 'help',
          description: 'Print this usage guide.',
        },
      ],
    },
  ]
  const usage = commandLineUsage(sections)
  console.log(usage)
}

main()
