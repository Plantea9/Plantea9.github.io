<script>
  import { navigate } from 'svelte-routing'
  import { render } from 'datocms-structured-text-to-html-string'
  import Loading from '../ui/Loading.svelte'
  import { query } from '../graphql'
  import { posts } from '../store'

  const options = {
    renderBlock({ record, adapter: { renderNode } }) {
      return renderNode('figure', {}, renderNode('img', { src: record.archivo.url }));
    },
    renderInlineRecord({ record, adapter: { renderNode } }) {
      return renderNode('a', { href: `/blog/${record.slug}` }, record.title);
    },
    renderLinkToRecord({ record, children, adapter: { renderNode } }) {
      return renderNode('a', { href: `/blog/${record.slug}` }, children);
    },
  }

  $: if (!$posts || $posts.length === 0) {
    query`query MyQuery {
      allPosts {
        titulo
        id
        autor {
          nombre
          foto {
            url
          }
        }
        _publishedAt
        contenido {
          value
          blocks {
            archivo {
              url
            }
            id
          }
          links {
            titulo
            id
          }
        }
      }
    }`.then(l => posts.set(l.allPosts))
  }

  function showDate (date) {
    const d = new Date(date)
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    return `${d.getDate()} de ${months[d.getMonth()]}, ${d.getFullYear()}`
  }

  function trimHtml(html, options) {
    options = options || {}
    const limit = options.limit || 100
    const preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true
    const wordBreak = (typeof options.wordBreak !== 'undefined') ? options.wordBreak : false
    const suffix = options.suffix || '...'
    const moreLink = options.moreLink || ''
    const moreText = options.moreText || '»'
    const preserveWhiteSpace = options.preserveWhiteSpace || false

    const arr = html.replace(/</g, "\n<")
      .replace(/>/g, ">\n")
      .replace(/\n\n/g, "\n")
      .replace(/^\n/g, "")
      .replace(/\n$/g, "")
      .split("\n")

    let sum = 0
    let row, cut, add
    let tagMatch
    let tagName
    let tagStack = []
    let more = false
    let rowCut

    for (let i = 0; i < arr.length; i++) {
      row = arr[i]
      // count multiple spaces as one character
      if(!preserveWhiteSpace) {
        rowCut = row.replace(/[ ]+/g, ' ')
      } else {
        rowCut = row
      }

      if (!row.length) {
        continue
      }

      const charArr = getCharArr(rowCut)
      if (row[0] !== '<') {
        if (sum >= limit) {
          row = ''
        } else if ((sum + charArr.length) >= limit) {
          cut = limit - sum
          if (charArr[cut - 1] === ' ') {
            while(cut) {
              cut -= 1
              if(charArr[cut - 1] !== ' '){
                break
              }
            }
          } else {
            add = charArr.slice(cut).indexOf(' ')
            // break on halh of word
            if(!wordBreak) {
              if (add !== -1) {
                cut += add
              } else {
                cut = row.length
              }
            }
          }

          row = charArr.slice(0, cut).join('') + suffix
          if (moreLink) {
            row += '<a href="' + moreLink + '" style="display:inline">' + moreText + '</a>';
          }

          sum = limit
          more = true;
        } else {
          sum += charArr.length;
        }
      } else if (!preserveTags) {
        row = ''
      } else if (sum >= limit) {
        tagMatch = row.match(/[a-zA-Z]+/)
        tagName = tagMatch ? tagMatch[0] : ''
        if (tagName) {
          if (row.substring(0, 2) !== '</') {
            tagStack.push(tagName)
            row = ''
          } else {
            while (tagStack[tagStack.length - 1] !== tagName && tagStack.length) {
              tagStack.pop()
            }
            if (tagStack.length) {
              row = ''
            }
            tagStack.pop()
          }
        } else {
          row = ''
        }
      }
      arr[i] = row
    }

    return {
      html: arr.join("\n").replace(/\n/g, ""),
      more: more
    }
  }

  // count symbols like one char
  function getCharArr (rowCut) {
    let charArr = []
    let subRow
    let match
    let char

    for (var i = 0; i < rowCut.length; i++) {
      subRow = rowCut.substring(i)
      match = subRow.match(/^&[a-z0-9#]+;/)

      if (match) {
        char = match[0]
        charArr.push(char)
        i += (char.length - 1)
      } else {
        charArr.push(rowCut[i])
      }
    }

    return charArr;
  }
</script>

{#if !$posts || $posts.length === 0}
  <Loading></Loading>
{:else}
  {#each $posts as post}
    <div class="blog relative pt-6 shadow-lg rounded-md bg-white mb-4">
      <h2 class="font-bold text-xl mb-4 px-4">{post.titulo}</h2>
      <div class="text-gray-500 mb-8 px-4">{@html trimHtml(render(post.contenido, options)).html}</div>
      <a on:click={e => navigate(`/blog/${post.id}`)} class="cursor-pointer absolute inset-x-0 w-20 rounded-xl bg-purple-900 text-gray-100 py-1 px-2 justify-center items-center mx-auto my-0 flex text-sm bottom-20">Leer más</a>
      <div class="flex flex-col px-4 pb-6 pt-4 bg-gradient-to-r from-purple-400 to-purple-300 rounded-b-md">
        <span class="text-white font-medium">
          <img class="avatar mr-2 w-6 inline-block h-6 rounded-full ring-2 ring-white" src="{post.autor.foto.url}" alt="{post.autor.nombre}">
          {post.autor.nombre}
        </span>
        <span class="text-gray-200">{showDate(post._publishedAt)}</span>
      </div>
    </div>
  {/each}
{/if}

<style>
  .avatar {
    width: 1.5rem !important;
  }
</style>