<script lang="ts">
  interface Props {
    data: {
      title: string;
    };
  }

  let { data }: Props = $props();
</script>

<main class="flex grow flex-col md:pr-12">
  <div class="mx-auto w-full grow md:border-r md:border-kumo-hairline">
    <article class="mx-auto max-w-3xl px-6 py-16">
      <p class="mb-3 font-mono text-sm text-kumo-subtle">kumo-svelte</p>
      <h1 class="text-4xl font-semibold tracking-tight text-kumo-default">{data.title}</h1>
      <p class="mt-4 text-base text-kumo-subtle">
        This route is wired into the faithful Kumo docs shell and is ready for the corresponding upstream page port.
      </p>
    </article>
  </div>
</main>
