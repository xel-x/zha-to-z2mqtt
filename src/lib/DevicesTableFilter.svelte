<script lang="ts">
    import type {DataHandler, Field} from '@vincjo/datatables'
    export let handler: DataHandler
    export let filterBy: Field<any> = ""
    let value = ''
</script>
<th>
    <input
        type="text"
        placeholder="Filter"
        class="input input-bordered input-xs"
        bind:value
        on:input={() => handler.filter(value, filterBy)}
    />
</th>