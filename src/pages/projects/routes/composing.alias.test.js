const fs = require('fs')
const path = require('path')

const listSrc = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')
const detailSrc = fs.readFileSync(path.join(__dirname, 'detail.js'), 'utf8')
const tabSrc = fs.readFileSync(
  path.join(
    __dirname,
    '../containers/Applications/CRDAppDetail/routes.js'
  ),
  'utf8'
)

describe('V4 Wujie composing aliases', () => {
  it('keeps applications/composing list and adds /composing', () => {
    expect(listSrc).toContain('`${PATH}/applications/composing`')
    expect(listSrc).toContain('`${PATH}/composing`')
  })

  it('keeps applications/composing detail and adds /composing/:name', () => {
    expect(detailSrc).toContain('`${PATH}/applications/composing/:name`')
    expect(detailSrc).toContain('`${PATH}/composing/:name`')
  })

  it('registers composed-app detail tabs under both prefixes', () => {
    expect(tabSrc).toContain(
      '/:workspace/clusters/:cluster/projects/:namespace/applications/composing/:name'
    )
    expect(tabSrc).toContain(
      '/:workspace/clusters/:cluster/projects/:namespace/composing/:name'
    )
  })
})
