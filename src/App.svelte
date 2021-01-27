<script>
  import { Router, link, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'
  import Footer from './ui/Footer.svelte'

  export let url = ''
</script>

<Router {url}>
  <div class="flex justify-between px-8 items-center py-6 md:justify-start md:space-x-10">
    <nav class="hidden md:flex space-x-10">
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" href="/" use:link>Inicio</a>
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" href="/resources" use:link>Recursos</a>
    </nav>
  </div>

  <main class="my-0 mx-auto relative max-w-4xl bg-transparent p-8 box-border z-10 pb-16 sm:pt-16">
    <Route path='/' component={Index}></Route>
    <Route path='/resources'>Recursos...</Route>
  </main>
</Router>

<Footer></Footer>

<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>