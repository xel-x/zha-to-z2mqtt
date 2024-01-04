<script lang="ts">
    import type {DataHandler, Field} from '@vincjo/datatables'
    export let handler: DataHandler
    export let orderBy: Field<any> = ""

    const identifier = orderBy?.toString()
    const sorted = handler.getSort()
</script>
<th on:click={() => orderBy && handler.sort(orderBy)} class:text-primary={$sorted.identifier === identifier} class:cursor-pointer={orderBy}>
    <div class="flex">
        <strong>
            <slot />
        </strong>
        <span class:asc={$sorted.direction === 'asc'} class:desc={$sorted.direction === 'desc'} />
    </div>
</th>