import main from './index'

describe('text', () => {
  it('text', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation()
    main()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toMatch('npigeon')
    spy.mockRestore()
  })
})
