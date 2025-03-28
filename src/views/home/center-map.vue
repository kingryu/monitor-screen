
<template>
  <div class="centermap">
    <div class="maptitle">
      <span class="titletext">{{ title }}</span>
    </div>
    <div class="mapwrap">
        <div class="back" @click="getData('china')" v-if="code !== 'china'">返回</div>
        <div 
          class="chart"
          ref="chartRef"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { GETNOBASE } from "@/api";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import * as echarts from 'echarts';

import type { MapdataType } from "./center.map";

const chartRef = ref();
const myChart = ref();
const option = ref({});
const code = ref("china"); //china 代表中国 其他地市是行政编码

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图",
  }
);

const dataSetHandle = async (regionCode: string) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] = element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  console.log('cityCenter', cityCenter)
  const list2:object[] = []
  Object.keys(cityCenter).forEach((item) => {
    mapData.push({
      name: item,
      value: cityCenter[item].concat(0),
    });
    list2.push({
      name: item,
      value: Math.round(Math.random()*1100),
    });
  });
  await nextTick();
  option.value = optionHandle(regionCode, list2, mapData);
  myChart.value.setOption(option.value);
};

const getData = async (regionCode: string) => {
   if(regionCode === 'china') {
     dataSetHandle('china');
     return; 
    }
    dataSetHandle(regionCode);
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data);
      code.value = regionCode;
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};
onMounted(() => {
  if (chartRef.value) {
    myChart.value = echarts.init(chartRef.value);
    getData(code.value);

    myChart.value.on('click', mapClick);
    window.addEventListener('resize', () => {
      myChart.value.resize();
    });
  }
});

onUnmounted(() => {
  if (myChart.value) {
    myChart.value.dispose();
  }
  window.removeEventListener('resize', () => {
    myChart.value.resize();
  });
});

const mapClick = (params: any) => {
  console.log(params);
  let xzqData = regionCodes[params.name];
  if (xzqData) {
    getData(xzqData.adcode);
  } else {
    console.log("暂无下级地市");
    getData('china')
  }
};
</script>
<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .back {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 30px;
      letter-spacing: 6px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
  .chart{
    width:100%;
    height:100%;
  }
}
</style>
