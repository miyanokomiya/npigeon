import main from './index'

describe('index', () => {
  it.skip('main', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation()
    await main()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toMatch('Usage')
    spy.mockRestore()
  })
})
