<script>
  import { posts } from '../store'
  import { query } from '../graphql'
  import { render } from 'datocms-structured-text-to-html-string'

  export let id

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

  let post
  $: if (id && !post) {
    post = $posts.find(p => p.id === id)
    if (!post) {
      query`query MyQuery {
        allPosts(filter: {id: {eq: "${id}"}}) {
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
      }`.then(l => {
        post = l.allPosts[0]
      })
    }
  }
</script>

{#if post && post.contenido}
  <div class="post">
    <h1>{post.titulo}</h1>
    {@html render(post.contenido, options)}
  </div>
{/if}
