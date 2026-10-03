// Keep space for the table selection and row-action columns added by ListPage.
export const SERVICE_COLUMN_WIDTHS = {
  name: '20%',
  type: '13%',
  app: '12%',
  internal: '14%',
  external: '17%',
  creation: '14%',
}

export const serviceColumnWidthTotal = () =>
  Object.values(SERVICE_COLUMN_WIDTHS).reduce(
    (total, width) => total + Number.parseInt(width, 10),
    0
  )
