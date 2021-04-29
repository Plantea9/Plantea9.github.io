<script>
  import Banner from '../ui/Banner.svelte'
  import Loading from '../ui/Loading.svelte'
  import DirectLink from '../ui/DirectLink.svelte'

  let links = []
  let loading = true
  ;(async () => {
    const response = await fetch(process.env.ACCESOS_DIRECTOS_URL)
    links = await response.json()
    if (response.ok) {
      loading = false
    }
  })()
</script>

{#if loading}
  <Loading></Loading>
{:else}
  <Banner></Banner>
  <div class="flex-wrap flex items-center justify-evenly">
    {#each links as {Imagen, Titulo, Link}}
      <DirectLink chico width="40%" src={Imagen.formats.small.url} href={Link} desc={Titulo} ></DirectLink>
    {/each}
  </div>
{/if}