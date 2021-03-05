<script>
  import Loading from '../ui/Loading.svelte'
  import TagInput from '../ui/TagInput.svelte'

  let resources = []
  let allResources = []
  let params = null
  let tags = []
  let loading = true
  ;(async () => {
    const response = await fetch(process.env.RECURSOS_URL)
    allResources = await response.json()
    if (resources.length === 0) {
      resources = allResources
    }
    if (response.ok) {
      loading = false
    }
  })()

  $: params = new URLSearchParams(document.location.search.substring(1))
  $: if (params && params.has('tags')) {
    tags = params.get('tags').replace(/\+/g, ' ').replace(/%2C/g, ',').replace(/=/g, '').split(',')
    resources = allResources.filter(res => res.tags.map(tag => tag.nombre).some(tag => tags.includes(tag)))
  }

  let current
  function download (resource) {
    const a = document.createElement('a')
    a.href = resource.archivo.url
    a.download = true
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function reloadTags (event) {
    const url = new URL(window.location)
    if (event.detail.tags && Array.isArray(event.detail.tags) && event.detail.tags.length > 0) {
      url.searchParams.set('tags', new URLSearchParams(event.detail.tags.join(',')))
    } else {
      url.searchParams.delete('tags')
    }
    // tags = event.detail.tags
    if (event.detail.tags.length > 0) {
      resources = allResources.filter(res => res.tags.map(tag => tag.nombre).some(tag => event.detail.tags.includes(tag)))
    } else {
      resources = allResources
    }
    window.history.pushState({}, '', url)
  }
</script>

{#if loading}
  <Loading></Loading>
{:else}
  <div class="flex flex-col items-stretch max-w-4xl my-0 mx-auto">
    <TagInput on:update={reloadTags} {tags}></TagInput>

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
</style>
