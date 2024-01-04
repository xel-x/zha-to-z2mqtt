<script lang="ts">
    import YAML from 'yaml';
    import {type DeviceData, DevicesData} from "../devices-data";
    import DevicesTable from "./DevicesTable.svelte";

    let devicesData: DeviceData[];
    let formatError = false;

    let storedYml = localStorage.getItem('device-data.yml');

    if(storedYml) {
        generate(storedYml);
        storedYml = null;
    }
    function paste() {
        navigator.clipboard.readText().then(data => generate(data));
    }

    function generate(data: string) {
        const dataObj: unknown = YAML.parse(data);
        formatError = false;
        try {
            devicesData = DevicesData.parse(dataObj).devices.map(device => ({...device, nwk_hex: `0x${device.nwk.toString(16).padStart(4, '0')}`, ieee: `0x${device.ieee.replace(/:/g, '')}`}));
            localStorage.setItem('device-data.yml', data);
        } catch (e) {
            console.error(e);
            formatError = true;
        }
    }
</script>

<div class="prose">
    <ol>
        <li>Installiere <a href="https://github.com/mdeweerd/zha-toolkit" target="_blank">ZHA-Toolkit</a></li>
        <li>Ruf die Entwicklertools/Dienste Seite auf und wähle "zha_toolkit:
            Get/Export Device Information" - oder nimm die <a href="https://my.home-assistant.io/redirect/developer_call_service/?service=zha_toolkit.zha_devices">Abkürzung</a></li>
        <li>Klick auf "Dienst aufrufen"</li>
        <li>Scroll nach ganz unten und klick "In Zwischenablage kopieren"</li>
        <li>Klick hier: <button class="btn btn-outline btn-secondary" on:click={paste}>aus Zwischenablage übernehmen <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h2m1.5 0H6V2m0 0a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h4a1 1 0 0 1 1 1M6 2H2a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h4m7-13v4H9m10-3v11a.969.969 0 0 1-.933 1H9.933A.97.97 0 0 1 9 18V9l3-3h6.067A.969.969 0 0 1 19 7Z"/>
        </svg></button></li>
    </ol>
</div>
{#if formatError}
    <div class="mt-8">
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Fehler: unerwartetes/ungültiges Format. Bitte stell sicher, dass es sich um die korrekte und vollständige Datei handelt.</span>
        </div>
    </div>
{/if}
{#if devicesData}
<DevicesTable data={devicesData}></DevicesTable>
{/if}