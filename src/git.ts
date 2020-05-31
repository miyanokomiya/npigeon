import { execSync } from 'child_process'

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

function validTag(tag: string): boolean {
  return /v[0-9]+.[0-9].[0-9]/.test(tag)
}

function sortTags(tags: string[]): string[] {
  return tags
    .map((tag) => ({
      tag,
      val: tag
        .replace(/v/, '')
        .split('.')
        .map((v) => parseInt(v)),
    }))
    .sort((a, b) => {
      if (a.val[0] > b.val[0]) return 1
      if (a.val[0] < b.val[0]) return -1
      // same major
      if (a.val[1] > b.val[1]) return 1
      if (a.val[1] < b.val[1]) return -1
      // same major, minor
      if (a.val[2] > b.val[2]) return 1
      if (a.val[2] < b.val[2]) return -1
      // same major, minor, patch
      return 0
    })
    .map((info) => info.tag)
}
