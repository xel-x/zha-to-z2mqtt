<script lang="ts">
    import { DataHandler }  from '@vincjo/datatables'
    import type {DeviceData} from "../devices-data";
    import DevicesTableTh from "./DevicesTableTh.svelte";
    import DevicesTableFilter from "./DevicesTableFilter.svelte";
    import Copy from "./Copy.svelte";
    export let data: DeviceData[];


    function copy(data: string) {
        navigator.clipboard.writeText(data);
    }

    const handler = new DataHandler(data, {  })
    const rows = handler.getRows()
</script>

<div class="overflow-x-auto max-h-[50vh]">
    <table class="table table-zebra border-separate border-spacing-0">
        <!-- head -->
        <thead class="sticky [inset-block-start:0] bg-neutral">
        <tr>
            <DevicesTableTh {handler} orderBy="ieee">ieee</DevicesTableTh>
            <DevicesTableTh {handler} orderBy="nwk_hex">nwk</DevicesTableTh>
            <DevicesTableTh {handler} orderBy="user_given_name">Lokaler Name</DevicesTableTh>
            <DevicesTableTh {handler} orderBy="area_id">Bereich</DevicesTableTh>
            <DevicesTableTh {handler} orderBy="manufacturer">Hersteller</DevicesTableTh>
            <DevicesTableTh {handler} orderBy="model">Modell</DevicesTableTh>
            <th>Entitäten</th>
        </tr>
        <tr>
            <DevicesTableFilter {handler} filterBy="ieee"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="nwk_hex"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="user_given_name"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="area_id"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="manufacturer"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="model"></DevicesTableFilter>
            <DevicesTableFilter {handler} filterBy="entities"></DevicesTableFilter>
        </tr>
        </thead>
        <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.ieee}</td>
                <td>{row.nwk_hex}</td>
                <td>{row.user_given_name}</td>
                <td>{row.area_id ?? '--'}</td>
                <td>{row.manufacturer}</td>
                <td>{row.model}</td>
                <td>
                    <ul>
                    {#each row.entities as entity}
                        <li><span class="text-secondary select-all">{entity.entity_id.split('.', 2)[0]}</span>.<span class="text-accent select-all">{entity.entity_id.split('.', 2)[1]}</span> <button class="btn btn-circle btn-xs" on:click={() => copy(entity.entity_id.split('.', 2)[1])}><Copy></Copy></button></li>
                    {/each}
                    </ul>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>