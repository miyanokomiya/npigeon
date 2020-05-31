#!/usr/bin/env node

import 'source-map-support/register'
// import * as clc from 'cli-color'
// import * as commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'

export default function main(): void {
  const sections = [
    {
      header: 'npigeon',
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
