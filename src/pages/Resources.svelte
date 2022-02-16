<script>
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import 'dayjs/locale/es'
  import Loading from '../ui/Loading.svelte'
  import TagInput from '../ui/TagInput.svelte'
  import { query } from '../graphql'
  import { resources } from '../store'

  let allResources = []
  let params = null
  let tags = []

  dayjs.locale('es')
  dayjs.extend(relativeTime)

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

  function showSize (rawSize) {
    if ((rawSize / 1024) < 1000) {
      return `${(rawSize / 1024).toFixed()} kb`
    } else {
      return `${(rawSize / 1024 / 1024).toFixed(2)} mb`
    }
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

{#if $resources.length === 0}
  <Loading></Loading>
{:else}
  <div class="flex flex-col items-stretch max-w-4xl my-0 mx-auto">
    <TagInput on:update={reloadTags} {tags}></TagInput>

    {#each $resources as resource}
    <div class="doc flex flex-wrap p-2" on:click={selectDoc(resource)} class:selected="{current === resource.titulo}">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
      <span class="truncate cursor-pointer ml-4 hover:underline">{resource.titulo}</span>

      <button on:click={download(resource)} class="download-btn hover:cursor-pointer m-0 p-0 bg-transparent border-none hidden">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      </button>

      {#if current === resource.titulo}
        <div class="details p-4 flex items-center w-full relative">
          <button on:click={download(resource)} class="big-download-btn mr-8 ml-4 bg-purple-200 p-3 hover:bg-purple-300 hover:cursor-pointer m-0 bg-transparent border-none hidden md:block">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
          <div class="file-data mx-4">
            <span class="font-bold block">Última actualización:</span>
            <span class="block mb-4">{dayjs(resource._updatedAt).fromNow()}</span>
            <span class="font-bold">Formato:</span>
            <span class="mr-4">{resource.archivo.format.replace('.', '')}</span>
            <span class="font-bold">Tamaño:</span>
            <span>{showSize(resource.archivo.size)}</span>
          </div>
          <div class="file-data self-start md:w-5/12">
            <span class="font-bold block">Tags:</span>
            {#each resource.tags as tag}
              <div class="bg-indigo-100 shadow-sm inline-flex items-center text-sm rounded mt-2 mr-1">
                <span class="ml-2 mr-1 leading-relaxed truncate w-auto">{tag.nombre}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    {/each}
  </div>
{/if}

<style>
  .doc > span {
    width: calc(90% - 48px);
    max-width: calc(90% - 24px);
  }
  .doc:hover,
  .doc.selected {
    background-color: var(--bg-2);
  }
  .doc.selected .download-btn {
    display: block;
  }
  .download-btn:hover {
    color: var(--text-2);
  }
  @media (min-width: 768px) { 
    .doc span {
      width: 90%;
    }
    .doc.selected .download-btn {
      display: none;
    }
    .doc:hover:not(.selected) .download-btn {
      display: block;
    }
  }
</style>
