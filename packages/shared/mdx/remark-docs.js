// What a docs page written in MDX needs beyond plain Markdown, done once at build time:
//
// - every `##` and `###` gets an id from its text ("Turning off a database" → turning-off-a-database),
//   so the contents rail and links can land on it. A heading that must keep an older address is
//   written as <H2 id="…">…</H2> instead, and its id is kept as given.
// - the page's H2s are exported as `sections`, [[id, title], …], for search.
// - a code fence's `title="…"` reaches the Code block (```dotenv title=".env").
// - the YAML frontmatter (remark-frontmatter finds it) is exported as `frontmatter`, for the page's
//   title, description and search keywords. Its values are plain strings.
import { parse } from 'yaml'

/** "SQLite (default)" → "sqlite-default". */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value
  return (node.children ?? []).map(textOf).join('')
}

function walk(node, visit) {
  visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

/** A JSON-like value (strings, numbers, booleans, arrays, plain objects) as an estree expression. */
function toEstree(value) {
  if (Array.isArray(value)) return { type: 'ArrayExpression', elements: value.map(toEstree) }
  if (value && typeof value === 'object') {
    return {
      type: 'ObjectExpression',
      properties: Object.entries(value).map(([key, v]) => ({
        type: 'Property',
        kind: 'init',
        method: false,
        shorthand: false,
        computed: false,
        key: { type: 'Literal', value: key, raw: JSON.stringify(key) },
        value: toEstree(v),
      })),
    }
  }
  return { type: 'Literal', value: value ?? null, raw: JSON.stringify(value ?? null) }
}

/** `export const <name> = <value>`, as the ESM node MDX compiles into the page. */
function exportConst(name, value) {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: toEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  }
}

export default function remarkDocs() {
  return (tree) => {
    const sections = []
    const used = new Map()
    const unique = (id) => {
      const n = used.get(id) ?? 0
      used.set(id, n + 1)
      return n ? `${id}-${n}` : id
    }

    walk(tree, (node) => {
      if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
        const title = textOf(node)
        const id = unique(slugify(title))
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
        if (node.depth === 2) sections.push([id, title])
      } else if (node.type === 'mdxJsxFlowElement' && (node.name === 'H2' || node.name === 'H3')) {
        const given = node.attributes.find((a) => a.name === 'id')?.value
        const title = textOf(node)
        const id = unique(typeof given === 'string' ? given : slugify(title))
        if (node.name === 'H2') sections.push([id, title])
      } else if (node.type === 'code' && node.meta) {
        const title = node.meta.match(/title="([^"]*)"/)?.[1]
        if (title) node.data = { ...node.data, hProperties: { ...node.data?.hProperties, 'data-title': title } }
      }
    })

    const yaml = tree.children.find((node) => node.type === 'yaml')
    const frontmatter = yaml ? (parse(yaml.value) ?? {}) : {}
    tree.children.unshift(exportConst('frontmatter', frontmatter), exportConst('sections', sections))
  }
}
