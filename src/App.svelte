<script lang="ts">
    import Converter from "./lib/Converter.svelte";
    import Devices from "./lib/Devices.svelte";

    function clearLocalStorage() {
        localStorage.clear();
    }
</script>

<main class="mx-auto px-4 pt-8">
    <div class="collapse collapse-arrow bg-base-200 border-b-secondary border-b">
        <input type="radio" name="accordion" checked="checked" />
        <div class="collapse-title text-xl font-medium bg-base-300">
            Was, warum, wie?
        </div>
        <div class="collapse-content">
            <div class="prose">
                <h2>ZHA zu Zigbee2MQTT Migrationshilfe</h2>
                <p>Diese Anwendung soll es dir erleichtern, von ZHA zu Zigbee2MQTT zu wechseln.</p>
                <p>Sie entstand auf Grundlage eines <a target="_blank" href="https://www.youtube.com/watch?v=B8bgC1CM8fY">YouTube Videos von simon42</a>, das das prinzielle Vorgehen gut beschreibt.</p>
                <p>In erster Linie wollte ich das Erstellen von zig Screenshots und die Suche nach dem richten Gerät anhand von Screenshots vermeiden, aber die Umwandung der Konfiguration aus dem Backup zur Config für Zigbee2MQTT ließ sich ohne viel Aufwand automatisieren.</p>
                <p>Ich übernehme keine Haftung, falls durch die Nutzung irgendwelche Nachteile enstehen.</p>
                <p>Um dieses Tool in vollem Umfang nutzen zu können, muss eine Custom Component namens zha_toolkit installiert werden. Natürlich ist es etwas ärgerlich, dieses Toolkit zu installieren, wenn man gerade von ZHA weg möchte. Es macht diesen Prozess in meinen Augen jedoch um ein vielfaches einfacher und schneller.</p>
                <p>
                    Dateien und Daten, die du auf dieser Seite eingibst werden NICHT hochgeladen, sie werden nur innerhalb deines Browsers verarbeitet und gespeichert.
                    Wenn du Daten eingetragen hast und die Seite neu lädst, bleiben die Ergebnisse erhalten, dafür verwendet die Seite den lokalen Speicher deines Browsers.
                    Wenn du z.B. nicht an deinem eigenen Rechner sitzt und die Daten gerne löschen möchtest, kannst du das mit folgendem Button tun. Die aktuell dargestellten Daten werden dabei <strong>nicht</strong> zurückgesetzt. Wenn du die Seite danach aber neu lädst, werden sie nicht erneut dargestellt.
                </p>
            </div>
            <button class="btn btn-secondary btn-outline my-8" on:click={clearLocalStorage}>Lokale Daten zurücksetzen <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg></button>
        </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 border-b-secondary border-b">
        <input type="radio" name="accordion" />
        <div class="collapse-title text-xl font-medium bg-base-300">
            Backup zu Zigbee2MQTT-Config
        </div>
        <div class="collapse-content">
            <Converter></Converter>
        </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 border-b-secondary border-b">
        <input type="radio" name="accordion" />
        <div class="collapse-title text-xl font-medium bg-base-300">
            Zigbee Geräte Übersicht
        </div>
        <div class="collapse-content">
            <Devices></Devices>
        </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 border-b-secondary border-b">
        <input type="radio" name="accordion" />
        <div class="collapse-title text-xl font-medium bg-base-300">
            Daten löschen
        </div>
        <div class="collapse-content">
            <div class="prose">
                <p>Solltest du deine Daten aus diesem Browser löschen wollen, kannst du folgenden Button verwenden:</p>
            </div>
            <button class="btn btn-secondary btn-outline my-8" on:click={clearLocalStorage}>Lokale Daten zurücksetzen <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg></button>
            <div class="prose">
                <p>Achtung: Die Daten die oben aktuell dargestellt werden, sind davon nicht betroffen. Aber wenn du die Seite verlässt und sie erneut aufrufst, werden die Daten nicht erneut dargestellt.</p>
            </div>
        </div>
    </div>
</main>
