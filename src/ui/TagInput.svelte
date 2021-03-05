<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let tags = []

  let currentTag = ''

  function handleEnter ({ key }) {
    if (key === 'Enter' && currentTag) {
      if (tags.indexOf(currentTag) < 0) {
        tags = [...tags, currentTag]
        dispatch('update', { tags })
      }
      currentTag = ''
    }
  }

  function removeTag (tag) {
    tags = tags.filter(t => t !== tag)
    dispatch('update', { tags })
  }
</script>

<div class="search mb-4">
  <div class="search-input search-input rounded-lg flex items-center h-10 px-4">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <input bind:value={currentTag} on:keyup={handleEnter} class="focus:outline-none bg-transparent ml-4" type="text">
  </div>

  {#each tags as tag}
    <div class="bg-indigo-100 inline-flex items-center text-sm rounded mt-2 mr-1">
      <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs">{tag}</span>
      <button on:click={removeTag(tag)} type="button" class="w-6 h-8 inline-block align-middle text-gray-500 hover:text-gray-600 focus:outline-none">
        <svg class="w-6 h-6 fill-current mx-auto" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"></path></svg>
      </button>
    </div>
  {/each}
</div>

<style>
  .search-input {
    background-color: var(--white-2);
  }
</style>