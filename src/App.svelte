<script>
  import Banner from './ui/Banner.svelte'
  import DirectLink from './ui/DirectLink.svelte'
  import Footer from './ui/Footer.svelte'

  let links = []
  ;(async () => {
    const response = await fetch(process.env.ACCESOS_DIRECTOS_URL)
    links = await response.json()
  })()
</script>

<main class="my-0 mx-auto relative max-w-4xl bg-transparent p-8 box-border z-10 pb-16 sm:pt-16">
  <Banner></Banner>
  <div class="flex-wrap flex items-center justify-evenly">
    {#each links as {Imagen, Titulo, Link}}
      <DirectLink chico width="40%" src={Imagen.url} href={Link} desc={Titulo} ></DirectLink>
    {/each}
  </div>
</main>
<Footer></Footer>


<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>