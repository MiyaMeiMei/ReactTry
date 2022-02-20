import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Piecharts() {
    
    
    const chartOptions = {
        credits:  {
            enabled: false
        },
        chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: '2014 某网站上各个浏览器的访问量占比'
		},
		tooltip: {
			headerFormat: '{series.name}<br>',
			pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					// 通过 format 或 formatter 来格式化数据标签显示
					//format: '值: {point.y} 占比 {point.percentage} %',
					formatter: function() {
						//this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
						return '<span style="color: ' + this.point.color + '"> 值：' + this.y + '，占比' + this.percentage + '%</span>';
					}
				},
				showInLegend: true  // 显示在图例中
			}
		},
		series: [{
			type: 'pie',
			name: '浏览器访问量占比',
			data: [
				['Firefox',   45.0],
				['IE',       26.8],
				['Chrome',   12.8],
				['Safari',    8.5],
				['Opera',     6.2],
				['其他',   0.7]
			]
		}]
            }


    return (
        <div>
            <HighchartsReact 
            highcharts={Highcharts}
            options={chartOptions}/>
        </div>
    );            
    
}



export default Piecharts;