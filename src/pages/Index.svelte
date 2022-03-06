<script>
  import Banner from '../ui/Banner.svelte'
  import Loading from '../ui/Loading.svelte'
  import DirectLink from '../ui/DirectLink.svelte'
  import { query } from '../graphql'
  import { links } from '../store'

  $: if (!$links) {
    query`query MyQuery {
        allAccesoDirectos {
          id
          imagen {
            url
          }
          link
          titulo
        }
      }
    `.then(l => links.set(l.allAccesoDirectos))
  }
</script>

{#if !$links}
  <Loading></Loading>
{:else}
  <Banner></Banner>
  <div class="flex-wrap flex items-center justify-evenly">
    {#each $links as {imagen, titulo, link}}
      <DirectLink chico width="40%" src={imagen.url} href={link} desc={titulo} ></DirectLink>
    {/each}
  </div>
{/if}