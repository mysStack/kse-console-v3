import { SERVICE_COLUMN_WIDTHS, serviceColumnWidthTotal } from './layout'

describe('service table layout', () => {
  it('reserves space for selection and row actions', () => {
    expect(serviceColumnWidthTotal()).toBeLessThanOrEqual(90)
    expect(SERVICE_COLUMN_WIDTHS.creation).toBe('14%')
  })
})
