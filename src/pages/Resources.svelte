<script>
  import Loading from '../ui/Loading.svelte'
  import TagInput from '../ui/TagInput.svelte'
  import Resource from '../ui/Resource.svelte'
  import { query } from '../graphql'
  import { resources } from '../store'

  let allResources = []
  let params = null
  let tags = []

  ;(() => {
    query`query MyQuery {
      allRecursos {
        link
        tipo
        titulo
        archivo {
          size
          url
          format
        }
        tags {
          nombre
        }
        _updatedAt
      }
    }`.then(l => {
      allResources = l.allRecursos
      resources.set(l.allRecursos)
    })
  })()

  $: params = new URLSearchParams(document.location.search.substring(1))
  $: if (params && params.has('tags')) {
    tags = params.get('tags').replace(/\+/g, ' ').replace(/%2C/g, ',').replace(/=/g, '').split(',')
    resources.set(allResources.filter(res => res.tags.map(tag => tag.nombre).some(tag => tags.includes(tag))))
  }

  let current

  function reloadTags (event) {
    const url = new URL(window.location)
    if (event.detail.tags && Array.isArray(event.detail.tags) && event.detail.tags.length > 0) {
      url.searchParams.set('tags', new URLSearchParams(event.detail.tags.join(',')))
    } else {
      url.searchParams.delete('tags')
    }

    if (event.detail.tags.length > 0) {
      resources.set(allResources.filter(res => res.tags.map(tag => tag.nombre).some(tag => event.detail.tags.includes(tag))))
    } else {
      resources.set(allResources)
    }
    window.history.pushState({}, '', url)
  }

  function selectDoc (resource) {
    current = resource.titulo
  }

  function handleKey (event) {
    if (event.key === 'ArrowUp') {
      let currentIndex = $resources.findIndex(res => res.titulo === current)
      if (currentIndex > 0) {
        current = $resources[currentIndex - 1].titulo
      }
    } else if (event.key === 'ArrowDown') {
      let currentIndex = $resources.findIndex(res => res.titulo === current)
      if (currentIndex < $resources.length - 1) {
        current = $resources[currentIndex + 1].titulo
      }
    }
  }
</script>

<svelte:window on:keydown={handleKey}/>

{#if !resources || $resources.length === 0}
  <Loading></Loading>
{:else}
  <div class="flex flex-col items-stretch max-w-4xl my-0 mx-auto">
    <TagInput on:update={reloadTags} {tags}></TagInput>

    {#each $resources as resource}
      <Resource on:click={selectDoc(resource)} {resource} selected={current === resource.titulo}></Resource>
    {/each}
  </div>
{/if}
