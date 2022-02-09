<script>
  import Banner from '../ui/Banner.svelte'
  import Loading from '../ui/Loading.svelte'
  import DirectLink from '../ui/DirectLink.svelte'

  const token = process.env.DATOCMS_API_TOKEN
  fetch(
    'https://graphql.datocms.com/preview',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: '{ allPosts { titulo } }'
      }),
    }
  )
  .then(res => res.json())
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.log(error)
  })

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