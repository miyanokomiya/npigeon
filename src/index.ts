#!/usr/bin/env node

import 'source-map-support/register'
import meow from 'meow'
import { getTags, getLatestTags, gainMajor, gainMinor, gainPatch } from './git'

const help = `
	Usage
	  $ npx npigeon <input>

	Options
	  --help  Show help
	  --version  Show version

	  --from-tag  Get latest version from tag (e.g. v1.2.3)
	  --major  Update major version
	  --minor  Update minor version
	  --patch  Update patch version
`

type Pipe<T> = {
  (): T
  <U>(f: (x: T) => U): Pipe<U>
}
const pipe: <T>(x: T) => Pipe<T> = <T>(x: T) => (<U>(f?: (x: T) => U) => (f ? pipe(f(x)) : x)) as Pipe<T>

function gainVersion(tag: string, flags: { major: boolean; minor: boolean; patch: boolean }): string {
  if (flags.major) return gainMajor(tag)
  if (flags.minor) return gainMinor(tag)
  if (flags.patch) return gainPatch(tag)
  return tag
}

export default async function main(): Promise<void> {
  const cli = meow(help, {
    flags: {
      fromTag: {
        type: 'boolean',
      },
      major: {
        type: 'boolean',
      },
      minor: {
        type: 'boolean',
      },
      patch: {
        type: 'boolean',
      },
    },
  })

  try {
    if (cli.flags.fromTag) {
      const tags = await getTags()
      pipe(tags)(getLatestTags)((tag) => gainVersion(tag, cli.flags))(console.log)
      return
    }

    cli.showHelp()
    return
  } catch (e) {
    console.error(e)
  }
}

if (process.env.NODE_ENV !== 'test') {
  main()
}
