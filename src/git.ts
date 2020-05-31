import { execSync } from 'child_process'

type Version = {
  major: number
  minor: number
  patch: number
}

export async function getTags(): Promise<string[]> {
  const result = await execSync('git tag')
  return result
    .toString()
    .split('\n')
    .filter((tag) => validTag(tag))
}

export function getLatestTags(tags: string[]): string {
  const latest = sortTags(tags.filter((tag) => validTag(tag))).pop()
  return latest || 'v0.0.1'
}

export function gainPatch(tag: string): string {
  const current = parseVersion(tag)
  return toTag({
    ...current,
    patch: current.patch + 1,
  })
}

function parseVersion(tag: string): Version {
  const values = tag
    .replace(/v/, '')
    .split('.')
    .map((v) => parseInt(v))
  return {
    major: values[0],
    minor: values[1],
    patch: values[2],
  }
}

function toTag(version: Version): string {
  return `v${version.major}.${version.minor}.${version.patch}`
}

function validTag(tag: string): boolean {
  return /v[0-9]+.[0-9].[0-9]/.test(tag)
}

function sortTags(tags: string[]): string[] {
  return tags
    .map((tag) => parseVersion(tag))
    .sort((a, b) => {
      if (a.major > b.major) return 1
      if (a.major < b.major) return -1
      // same major
      if (a.minor > b.minor) return 1
      if (a.minor < b.minor) return -1
      // same major, minor
      if (a.patch > b.patch) return 1
      if (a.patch < b.patch) return -1
      // same major, minor, patch
      return 0
    })
    .map((v) => toTag(v))
}
