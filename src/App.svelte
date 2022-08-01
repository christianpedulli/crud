<script>
  import { Contacts } from './stores.js';
  import Contact from './lib/components/Contact.svelte'

  load()
  function load(){
    fetch("http://localhost/contacts").then(e => e.json()).then(e=>{
      $Contacts =  [...e.data, ...$Contacts,]
    }).catch(_=>alert('Error Connecting To Server'))
  }
  

</script>
<main class="flex flex-col bg-stone-900 h-[100%] text-white mt-6 items-center gap-1 mb-5">
  <h1 class="text-2xl">OH CRUD!</h1>
  <h4 class="mb-3">A Create, Read, Update, Delete app.</h4>
  {#each $Contacts as contact}
    <Contact isnew={contact.isnew} name={contact.name || ''} email={contact.email || ''} phone={contact.phone} address={contact.address} _id={contact._id}></Contact>
  {/each}
</main>
<style>
  
</style>