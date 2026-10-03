// Keep space for the table selection and row-action columns added by ListPage.
export const SERVICE_COLUMN_WIDTHS = {
  name: '18%',
  type: '14%',
  app: '13%',
  internal: '14%',
  external: '17%',
  creation: '14%',
}

export const serviceColumnWidthTotal = () =>
  Object.values(SERVICE_COLUMN_WIDTHS).reduce(
    (total, width) => total + Number.parseInt(width, 10),
    0
  )
