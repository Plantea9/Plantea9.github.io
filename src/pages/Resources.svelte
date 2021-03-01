<script>
  import Loading from '../ui/Loading.svelte'

  let resources = []
  let params = null
  let tags = []
  let loading = true
  ;(async () => {
    const response = await fetch(process.env.RECURSOS_URL)
    resources = await response.json()
    if (response.ok) {
      loading = false
    }
  })()

  $: params = new URLSearchParams(document.location.search.substring(1))
  $: if (params && params.has('tags')) {
    tags = params.get('tags').split(',')
    resources = resources.filter(res => res.tags.map(tag => tag.nombre).some(tag => tags.includes(tag)))
  }

  let current
  function download (resource) {

  }
</script>

{#if loading}
  <Loading></Loading>
{:else}
  <div class="flex flex-col items-stretch max-w-4xl my-0 mx-auto">
    <div class="search">
      <div class="search-input search-input rounded-lg flex items-center h-10 mb-6 px-4">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input class="focus:outline-none bg-transparent ml-4" type="search">
      </div>
    </div>

    {#each resources as resource}
    <div class="doc flex p-2" class:selected="{current === resource.nombre}">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
      <span class="cursor-pointer ml-4 hover:underline">{resource.nombre}</span>

      <button on:click={download(resource)} class="download-btn hover:cursor-pointer m-0 p-0 bg-transparent border-none hidden">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      </button>
    </div>
    {/each}
  </div>
{/if}

<style>
  .doc span {
    width: 90%;
  }
  .doc:hover,
  .doc.selected {
    background-color: var(--bg-2);
  }
  .doc:hover .download-btn,
  .doc.selected .download-btn {
    display: block;
  }
  .download-btn:hover {
    color: var(--text-2);
  }
  .search-input {
    background-color: var(--white-2);
  }
</style>
