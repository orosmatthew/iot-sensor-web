<script lang="ts">
  import type { PageData } from './$types';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(async () => {
    Chart.defaults.borderColor = '#777777';
    Chart.defaults.color = '#E1E1E1';
    let chart = new Chart(document.getElementById('chart') as HTMLCanvasElement, {
      type: 'line',
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second'
            }
          }
        }
      },
      data: {
        labels: data.distance.map((row) => row.createdAt),
        datasets: [
          {
            label: 'Distance (cm)',
            data: data.distance.map((row) => row.cm)
          }
        ]
      }
    });
    window.addEventListener('resize', () => {
      chart.resize();
    });
  });
</script>

<body class="container">
  <h1 class="mt-2 mb-5">Distance Sensor</h1>
  <div class="row">
    <div class="col-lg-6">
      <h2>Data</h2>
      <ul>
        {#each data.distance as distanceData}
          <li>{distanceData.createdAt}: {distanceData.cm}</li>
        {/each}
      </ul>
    </div>
    <div class="col-lg-6">
      <h2>Chart</h2>
      <div style="width: 100%"><canvas id="chart" /></div>
    </div>
  </div>
</body>
