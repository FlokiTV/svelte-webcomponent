<script>
  import "./style.css";
  import Second from "./second.svelte";
  export let id;
  export let doCount;
  export let count;
  let inputBinding;
  const _count = () => {
    count = doCount();
  };
  function change() {
    inputBinding.value = "testing" + Math.round(Math.random() * 100);
  }
</script>

<div class="p-2 test">
  Count: {count}
  <h1 class="teste">teste: {id}</h1>
  <input
    class="border"
    type="text"
    name="testingInput"
    bind:this={inputBinding}
  />
</div>

<div class="p-2 secondStyle">
  <button on:click={_count} class="btn">COUNT</button>
  <button on:click={change} class="btn">Click this buttons!</button>
  <Second />
</div>
