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

<main class="main">
  <Banner></Banner>
  <div class="direct-links">
    {#each links as {Imagen, Titulo, Link}}
      <DirectLink chico width="40%" src={Imagen.url} href={Link} desc={Titulo} ></DirectLink>
    {/each}
  </div>
</main>
<Footer></Footer>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: transparent;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 10;
    padding-bottom: 4rem;
  }
  .direct-links {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    main {
      padding-top: 4rem;
    }
  }
</style>