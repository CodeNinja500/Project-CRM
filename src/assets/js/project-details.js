(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // import * as echarts from 'echarts';
  const { merge } = window._;

  // form config.js
  const echartSetOption = (chart, userOptions, getDefaultOptions) => {
    const themeController = document.body;
    // Merge user options with lodash
    chart.setOption(merge(getDefaultOptions(), userOptions));

    themeController.addEventListener(
      'clickControl',
      ({ detail: { control } }) => {
        if (control === 'phoenixTheme') {
          chart.setOption(window._.merge(getDefaultOptions(), userOptions));
        }
      }
    );
  };
  // -------------------end config.js--------------------

  const resizeEcharts = () => {
    const $echarts = document.querySelectorAll('[data-echart-responsive]');

    if ($echarts.length > 0) {
      $echarts.forEach(item => {
        const echartInstance = echarts.getInstanceByDom(item);
        echartInstance?.resize();
      });
    }
  };

  const navbarVerticalToggle = document.querySelector('.navbar-vertical-toggle');
  navbarVerticalToggle &&
    navbarVerticalToggle.addEventListener('navbar.vertical.toggle', e => {
      return resizeEcharts();
    });

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const completedTaskChartInit = () => {
    const { getColor, getData, getDates, resize } = window.phoenix.utils;

    const $totalSalesChart = document.querySelector(
      '.echart-completed-task-chart'
    );

    const dates = getDates(
      new Date('5/1/2022'),
      new Date('5/30/2022'),
      1000 * 60 * 60 * 24
    );

    const currentMonthData = [
      50, 115, 180, 180, 180, 150, 120, 120, 120, 120, 120, 240, 240, 240, 240,
      270, 300, 330, 360, 390, 340, 290, 310, 330, 350, 320, 290, 330, 370, 350
    ];

    console.log(currentMonthData.length);

    const prevMonthData = [
      130, 130, 130, 90, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 170,
      230, 230, 230, 270, 310, 270, 230, 260, 290, 320, 280, 280, 280
    ];
    console.log(prevMonthData.length);

    const tooltipFormatter = params => {
      const currentDate = window.dayjs(params[0].axisValue);
      const prevDate = window.dayjs(params[0].axisValue).subtract(1, 'month');

      const result = params.map((param, index) => ({
        value: param.value,
        date: index > 0 ? prevDate : currentDate,
        color: param.color
      }));

      let tooltipItem = ``;
      result.forEach((el, index) => {
        tooltipItem += `<h6 class="fs--1 text-700 ${
        index > 0 && 'mb-0'
      }"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      ${el.date.format('MMM DD')} : ${el.value}
    </h6>`;
      });
      return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
    };

    if ($totalSalesChart) {
      const userOptions = getData($totalSalesChart, 'echarts');
      const chart = window.echarts.init($totalSalesChart);

      const getDefaultOptions = () => ({
        color: [getColor('primary'), getColor('info')],
        tooltip: {
          trigger: 'axis',
          padding: 10,
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          },
          formatter: tooltipFormatter
        },
        xAxis: [
          {
            type: 'category',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 13,
              showMinLabel: true,
              showMaxLabel: false,
              color: getColor('gray-800'),
              align: 'left',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: getColor('gray-200')
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: getColor('gray-200')
              }
            },
            boundaryGap: false
          },
          {
            type: 'category',
            position: 'bottom',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 130,
              showMaxLabel: true,
              showMinLabel: false,
              color: getColor('gray-800'),
              align: 'right',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
          }
        ],
        yAxis: {
          position: 'right',
          axisPointer: { type: 'none' },
          axisTick: 'none',
          splitLine: {
            show: false
          },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: 'd',
            type: 'line',
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: currentMonthData,
            showSymbol: false,
            symbol: 'circle'
          },
          {
            name: 'e',
            type: 'line',
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: prevMonthData,
            // symbol: 'none',
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: getColor('info')
            },
            showSymbol: false,
            symbol: 'circle'
          }
        ],
        grid: {
          right: 2,
          left: 5,
          bottom: '20px',
          top: '2%',
          containLabel: false
        },
        animation: false
      });

      echartSetOption(chart, userOptions, getDefaultOptions);

      resize(() => {
        chart.resize();
      });
    }
  };

  // import * as echarts from 'echarts';

  const { echarts: echarts$1 } = window;

  /* -------------------------------------------------------------------------- */
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const topCouponsChartInit = () => {
    const { getData, getColor, resize } = window.phoenix.utils;
    const ECHART_TOP_COUPONS = '.echart-top-coupons';
    const $echartTopCoupons = document.querySelector(ECHART_TOP_COUPONS);

    if ($echartTopCoupons) {
      const userOptions = getData($echartTopCoupons, 'options');
      const chart = echarts$1.init($echartTopCoupons);

      const getDefaultOptions = () => ({
        color: [
          getColor('primary'),
          getColor('primary-200'),
          getColor('info-500')
        ],

        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${params.data.name}:</strong> ${params.percent}%`;
          }
        },
        legend: { show: false },
        series: [
          {
            name: '72%',
            type: 'pie',
            radius: ['100%', '87%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: false,
              itemStyle: {
                color: 'inherit'
              }
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: getColor('white')
            },
            label: {
              show: true,
              position: 'center',
              formatter: '{a}',
              fontSize: 23,
              color: getColor('dark')
            },
            data: [
              { value: 7200000, name: 'Percentage discount' },
              { value: 1800000, name: 'Fixed card discount' },
              { value: 1000000, name: 'Fixed product discount' }
            ]
          }
        ],
        grid: { containLabel: true }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);

      resize(() => {
        chart.resize();
      });
    }
  };

  const { docReady } = window.phoenix.utils;
  docReady(completedTaskChartInit);
  docReady(topCouponsChartInit);

}));
//# sourceMappingURL=project-details.js.map
