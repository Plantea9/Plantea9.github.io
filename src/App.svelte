<script>
  import { Router, link, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'
  import Resources from './pages/Resources.svelte'
  import Blog from './pages/Blog.svelte'
  import Footer from './ui/Footer.svelte'

  export let url = ''
</script>

<Router {url}>
  <div class="flex justify-between px-8 items-center py-6 md:justify-start md:space-x-10">
    <nav class="hidden md:flex space-x-10">
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" href="/" use:link>Inicio</a>
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" href="/resources" use:link>Recursos</a>
      <a class="text-base font-medium text-gray-500 hover:text-gray-900" href="/blog" use:link>Blog</a>
    </nav>
  </div>

  <main class="my-0 mx-auto relative max-w-4xl bg-transparent p-8 box-border z-10 pb-16 sm:pt-16">
    <Route path='/' component={Index}></Route>
    <Route path='/resources' component={Resources}></Route>
    <Route path='/blog' component={Blog}></Route>
  </main>
</Router>

<Footer></Footer>

<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>

<style>
  main {
    min-height: calc(100vh - 232px);
  }
  @media only screen and (max-width : 768px) {
    main {
      min-height: calc(100vh - 208px);
    }
  }
</style>