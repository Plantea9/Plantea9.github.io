<script>
  import { link } from 'svelte-routing'
  import { fly } from 'svelte/transition'

  let visible = false
  export let links = []

  function open(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    visible = true
    document.body.addEventListener('click', () => {
      visible = false;
    }, { once: true })
  }
</script>
<div class="flex relative justify-between px-8 items-center py-6 md:justify-start md:space-x-10">
  <nav class="hidden md:flex space-x-10">
    {#each links as {href, name}}
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" {href} use:link>{name}</a>
    {/each}
  </nav>
  <div class="-mr-2 -my-2 md:hidden absolute right-4">
    <button on:click={open} type="button" class="burger-btn rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span class="sr-only">Open menu</span>
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</div>
{#if visible}
  <div transition:fly class="absolute top-0 z-20 inset-x-0 p-2 transition transform origin-top-right md:hidden">
    <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
      <div class="pt-5 pb-6 px-5">
        <div class="flex items-center justify-between">
          <div class="-mr-2">
            <button on:click={e => visible = false} type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" x-description="Heroicon name: outline/x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <nav class="grid gap-y-8">
            {#each links as { href, name }}
              <a use:link on:click={e => visible = false} {href} class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                <span class="ml-3 text-base font-medium text-gray-900">
                  {name}
                </span>
              </a>
            {/each}
          </nav>
        </div>
      </div>
    </div>
  </div>
{/if}