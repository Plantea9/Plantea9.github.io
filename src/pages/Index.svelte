<script>
  import Banner from '../ui/Banner.svelte'
  import DirectLink from '../ui/DirectLink.svelte'

  let links = []
  ;(async () => {
    const response = await fetch(process.env.ACCESOS_DIRECTOS_URL)
    links = await response.json()
  })()
</script>
<Banner></Banner>
<div class="flex-wrap flex items-center justify-evenly">
  {#each links as {Imagen, Titulo, Link}}
    <DirectLink chico width="40%" src={Imagen.url} href={Link} desc={Titulo} ></DirectLink>
  {/each}
</div>