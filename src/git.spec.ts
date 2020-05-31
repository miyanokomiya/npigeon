import * as target from './git'

describe('git', () => {
  describe('getTags', () => {
    it('get tags from git', async () => {
      const res = await target.getTags()
      expect(res).toEqual([])
    })
  })

  describe('getLatestTags', () => {
    describe('no tags', () => {
      it('get v0.0.1', () => {
        expect(target.getLatestTags([])).toEqual('v0.0.1')
      })
    })
    describe('with tags', () => {
      it('get latest tag', () => {
        expect(target.getLatestTags(['v4.2.1', 'v2.2.1', 'v3.2.1'])).toEqual('v4.2.1')
        expect(target.getLatestTags(['v0.0.1', 'v0.3.1', 'v0.2.1'])).toEqual('v0.3.1')
        expect(target.getLatestTags(['v0.0.2', 'v0.0.5', 'v0.0.3'])).toEqual('v0.0.5')

        expect(target.getLatestTags(['v0.0.12', 'v0.0.5', 'v0.0.3'])).toEqual('v0.0.12')
        expect(target.getLatestTags(['v0.0.12', 'v0.1.5', 'v0.0.3'])).toEqual('v0.1.5')
        expect(target.getLatestTags(['v0.0.12', 'v0.1.1', 'v0.0.3'])).toEqual('v0.1.1')
      })
    })
  })

  describe('gainPatch', () => {
    it('gain patch', () => {
      expect(target.gainPatch('v1.2.3')).toEqual('v1.2.4')
    })
  })
})
