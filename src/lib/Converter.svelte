<script lang="ts">
    import { ZHABackup } from "../zha-backup";
    import YAML from 'yaml'
    import Copy from "./Copy.svelte";

    let files: FileList;
    let result: string = '';
    let formatError = false;
    $: if(files && files[0]) {
        files[0].text().then(data => convert(data));
    }

    let storedYml = localStorage.getItem('backup.json');

    if(storedYml) {
        convert(storedYml);
        storedYml = null;
    }

    function copy() {
        navigator.clipboard.writeText(result);
    }

    function paste() {
        navigator.clipboard.readText().then(data => convert(data));
    }

    function convert(data: string) {
        result = '';
        let resultData: {
            advanced: {
                channel: number,
                network_key: number[],
                pan_id: number,
                ext_pan_id: number[],
            }
        } | null;
        try {
            let backupData = ZHABackup.parse(JSON.parse(data));
            localStorage.setItem('backup.json', data);
            formatError = false;
            resultData = {
                advanced: {
                    channel: backupData.network_info.channel,
                    network_key: backupData.network_info.network_key.key.split(':').map(value => parseInt(value, 16)),
                    pan_id: parseInt(backupData.network_info.pan_id, 16),
                    ext_pan_id: backupData.network_info.extended_pan_id.split(':').map(value => parseInt(value, 16)),
                }
            }
            result = YAML.stringify(resultData)
        } catch (e) {
            formatError = true;
        }
    }
</script>
<h1 class="text-5xl font-bold pb-8">ZHA Backup zu Zigbee2MQTT Config</h1>
<h2 class="text-2xl font-bold pb-4">ZHA-Backup</h2>
<input id="file" class="hidden" type="file" accept="application/json" bind:files />
<label for="file" class="btn btn-outline btn-secondary">hochladen <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
</svg></label>
oder
<button class="btn btn-outline btn-secondary" on:click={paste}>aus Zwischenablage übernehmen <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h2m1.5 0H6V2m0 0a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h4a1 1 0 0 1 1 1M6 2H2a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h4m7-13v4H9m10-3v11a.969.969 0 0 1-.933 1H9.933A.97.97 0 0 1 9 18V9l3-3h6.067A.969.969 0 0 1 19 7Z"/>
</svg></button>

{#if formatError}
    <div class="mt-8">
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Fehler: unerwartetes/ungültiges Format. Bitte stell sicher, dass es sich um die korrekte und vollständige Datei handelt.</span>
        </div>
    </div>
{/if}
{#if result}
    <div class="mt-8">
        <h2 class="text-2xl font-bold pb-4">Zigbee2MQTT:</h2>
        <div class="w-full prose">
            <button class="btn btn-outline btn-sm btn-secondary" on:click={copy}>Kopieren <Copy></Copy></button>
            <pre class="max-h-96 overflow-auto select-all"><code>{result}</code></pre>
        </div>
    </div>
{/if}