<script>
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import 'dayjs/locale/es'

  dayjs.locale('es')
  dayjs.extend(relativeTime)

  export let resource
  export let selected

  function download (resource) {
    const a = document.createElement('a')
    a.href = resource.link || resource.archivo.url
    a.download = true

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function showSize (rawSize) {
    if ((rawSize / 1024) < 1000) {
      return `${(rawSize / 1024).toFixed()} kb`
    } else {
      return `${(rawSize / 1024 / 1024).toFixed(2)} mb`
    }
  }
</script>

<div class="doc flex flex-wrap p-2" on:click class:selected="{selected}">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
  <span class="truncate cursor-pointer ml-4 hover:underline">{resource.titulo}</span>

  <button on:click={download(resource)} class="download-btn hover:cursor-pointer m-0 p-0 bg-transparent border-none hidden">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  </button>

  {#if selected}
    <div class="details p-4 flex items-center w-full relative">
      <button on:click={download(resource)} class="big-download-btn mr-8 ml-4 bg-purple-200 p-3 hover:bg-purple-300 hover:cursor-pointer m-0 bg-transparent border-none hidden md:block">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      </button>
      <div class="file-data mx-4">
        <span class="font-bold block">Última actualización:</span>
        <span class="block mb-4">{dayjs(resource._updatedAt).fromNow()}</span>
        <span class="font-bold">Formato:</span>
        <span class="mr-4">{resource.archivo ? resource.archivo.format.replace('.', '') : 'pdf'}</span>
        {#if resource.archivo}
          <span class="font-bold">Tamaño:</span>
          <span>{showSize(resource.archivo.size)}</span>
        {/if}
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