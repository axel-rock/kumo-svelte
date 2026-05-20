<script lang="ts">
  import { Table } from 'kumo-svelte';

  const rows = [
    { subject: 'Kumo v1.0.0 released', from: 'Visal In', date: '5 seconds ago' },
    { subject: 'New Job Offer', from: 'Cloudflare', date: '10 minutes ago' }
  ];
</script>

<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Subject</Table.Head>
      <Table.Head>From</Table.Head>
      <Table.Head>Date</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each rows as row}
      <Table.Row>
        <Table.Cell>{row.subject}</Table.Cell>
        <Table.Cell>{row.from}</Table.Cell>
        <Table.Cell>{row.date}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table>
