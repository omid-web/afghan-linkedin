<template>

<main class="bg-indigo-900 relative overflow-hidden h-screen">
    <div class="inset-0 bg-black opacity-25 absolute">
    </div>
    <div class="container mx-auto h-screen md:pt-0 px-6 z-10 flex items-center justify-between">
        <div class="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative">
            <div class="w-full mb-16 md:mb-8 text-center lg:text-left">
                <h1 class="font-light font-sans text-center lg:text-left text-5xl lg:text-8xl mt-12 md:mt-0 text-white">
                    Sorry, this page isn&#x27;t available
                </h1>
              <div class="pt-8">
                <a href="#" class="bg-white hover:bg-gray-300 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10">
                  Go back home
              </a>
              </div>
            </div>
            <div class="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
                <img src="src/assets/ruined building.jpeg"/>
            </div>
        </div>
    </div>
</main>

</template>

<script>
export default {
  name: '404-page',
};
</script>

<route lang="yaml">
meta:
  layout: '404'
</route>
