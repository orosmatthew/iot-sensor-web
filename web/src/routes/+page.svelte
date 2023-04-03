<script lang="ts">
  import type { PageData } from './$types';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  import { onMount } from 'svelte';
  import type { TempData } from './api/temp/types';
    import type { Temp } from '@prisma/client';

  export let data: PageData;

  let tempData = data.tempData;

  $: latest = tempData.temp[tempData.temp.length - 1];


  async function fetchTemp(chart: Chart) {
    let res = await fetch('/api/temp/20', { method: 'GET' });
    tempData = (await res.json()) as TempData;
    chart.data.labels = tempData.temp.map((row) => row.createdAt);
    chart.data.datasets[0].data = tempData.temp.map((row) => row.temp);
    chart.update();
  }

  onMount(() => {
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
        labels: data.tempData.temp.map((row) => row.createdAt),
        datasets: [
          {
            label: 'Temperature (F)',
            data: data.tempData.temp.map((row) => row.temp)
          }
        ]
      }
    });
    window.addEventListener('resize', () => {
      chart.resize();
    });
    setInterval(fetchTemp, 10000, chart);
  });
</script>

<svelte:head>
  <title>Temperature</title>
</svelte:head>

<body class="container">
  <h1 class="mt-2 mb-5">Temperature Sensor</h1>
  <div class="row" style="font-size: 18px;">
    <h2>
      {#if latest}
      Latest: {latest.temp.toFixed(1)}°F at {new Date(latest.createdAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })}
      {/if}
    </h2>
  </div>
  <div class="row mt-2">
    <h2>Chart</h2>
    <div style="width: 100%"><canvas id="chart" /></div>
  </div></body
>
