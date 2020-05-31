#!/usr/bin/env node

import 'source-map-support/register'
import meow from 'meow'
import { getTags, getLatestTags } from './git'

const help = `
	Usage
	  $ npx npigeon <input>

	Options
	  --help  Show help
	  --version  Show version
	  --from-tag  Show latest tag version
`

export default async function main(): Promise<void> {
  const cli = meow(help, {
    flags: {
      fromTag: {
        type: 'boolean',
      },
    },
  })

  if (cli.flags.fromTag) {
    try {
      const tags = await getTags()
      console.log(getLatestTags(tags))
    } catch (e) {
      console.error(e)
    }
  } else {
    cli.showHelp()
  }
}

if (process.env.NODE_ENV !== 'test') {
  main()
}
