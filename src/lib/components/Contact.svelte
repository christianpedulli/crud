<script>
// @ts-nocheck
  import { Contacts } from '../../stores'
  export let name, email, phone, address, _id, isnew;
  let message = "";
  //let saved = {name, email}

  async function change(key, value, input){
    if (isnew){
      let data = await fetch(`http://localhost/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify({
          [key]: value
        })
      }).then(e=>e.json()).then(e=>e.data)
      
      $Contacts.pop()
      $Contacts = [...$Contacts, data, { isnew: true } ]
      isnew = false
      message = `saved contact...`;
      await sleep(2000);
      message = ""
      return;
    }
    //if (value === '') return input.value = saved[key]
    fetch(`http://localhost/contacts/${_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        [key]: value
      })
    }).then(e=>e.json()).then(async e=>{
      console.log(e)
      if (e.success){
        message = `saved ${key}...`;
        await sleep(2000);
        message = ""
      } else {
        message = `error saving ${key}...`;
        input.value = saved[key]
        await sleep(2000);
        message = ""
      }
    }).catch(async error => {
      message = `error saving ${key}...`;
      input.value = saved[key]
      await sleep(2000);
      message = ""
    })
  }

  async function deleteCon(){
    fetch(`http://localhost/contacts/${_id}`, { method: 'Delete'}).then(e=>e.json()).then(async e=>{
      //alert('deleted')
      $Contacts = [ ...$Contacts.filter(con => con._id !== _id)]
    })
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
</script>

<div class="flex bg-white text-stone-900 {isnew ? "" : "rounded-r-[999px]"} rounded justify-between w-[70%]">
  <div class="flex flex-col m-2">
    <input on:change={event => change('name', name, event.target)} placeholder="full name" bind:value={name}>
    <input on:change={event => change('email', email, event.target)} placeholder="email address" type="email" bind:value={email} class="text-gray-400">
    <input on:change={event => change('phone', phone, event.target)} placeholder="phone number" type="tel" bind:value={phone} class="text-gray-400">
    <input on:change={event => change('address', address, event.target)} placeholder="home address" bind:value={address} class="text-gray-400">
  </div>
  <div class="flex items-center gap-4">
    <!-- <button disabled={edited ? false : true} class="bg-green-900 w-[70px] h-[100%] hover:bg-green-700 text-white flex align-center justify-center items-center disabled:bg-gray-300 disabled:text-gray-400">
      <h1 class="text-[15px]">Save</h1>
    </button> -->
    <h1>{message}</h1>
    <button on:click={deleteCon} class=" {isnew ? "hidden" : "rounded-r"} bg-red-900 w-[70px] h-[100%] hover:bg-red-700 text-white flex align-center justify-center items-center">
      <h1 class="text-[15px]">Delete</h1>
    </button>
  </div>
</div>

<style></style>