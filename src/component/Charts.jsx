import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown'

drilldown(Highcharts)

function getChartOption({dispatch, state={}, chartType, issueTypeChart}){

	const {resolutionChart, title} = state
	// let resolutionChart = null;
	// let title = null;

	// if(chartType==='Pie'){
	// 	resolutionChart = state.resolutionChart;
	// 	title = state.title;
	// 	// {resolutionChart, title} = state;
	// }
	
	// const {chartType} = props;
	// const {dispatch, state, chartType} = props;
	// const {resolutionChart, title} = state;

	const handleDrilldown = e => {
		dispatch({
			type: 'UPDATE_TABLE_DATA',
			e,
		})
	}
   
	const handleDrillup = e => {
		dispatch({
			type: 'UPDATE_TABLE_DATA',
			e,
		})
	}

	const pieCharts = {
        credits:  {
            enabled: false
        },
        chart: {
			type: 'pie',
			events: {
				drilldown: handleDrilldown.bind(this),
				drillup: handleDrillup.bind(this)
			}
		},
		title: {
			text: title
		},
		tooltip: {
			// headerFormat: '{series.name}<br>',
			pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '{point.name}: {point.percentage:.1f}%'
					// 通过 format 或 formatter 来格式化数据标签显示
					//format: '值: {point.y} 占比 {point.percentage} %',
					// formatter: function() {
					// 	//this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
					// 	return '<span style="color: ' + this.point.color + '"> ：' + this.y + '，占比' + this.percentage + '%</span>';
					// }
				},
				showInLegend: true  // 显示在图例中
			}
		},
		series: [
			{
					colorByPoint: true,
					data: resolutionChart
			}
		],
		drilldown: {
				series: [
						{
								name: "Chrome",
								id: "Chrome",
								data: [
										[
												"v65.0",
												0.1
										],
										[
												"v64.0",
												1.3
										],
										[
												"v63.0",
												53.02
										],
										[
												"v62.0",
												1.4
										],
										[
												"v61.0",
												0.88
										],
										[
												"v60.0",
												0.56
										],
										[
												"v59.0",
												0.45
										],
										[
												"v58.0",
												0.49
										],
										[
												"v57.0",
												0.32
										],
										[
												"v56.0",
												0.29
										],
										[
												"v55.0",
												0.79
										],
										[
												"v54.0",
												0.18
										],
										[
												"v51.0",
												0.13
										],
										[
												"v49.0",
												2.16
										],
										[
												"v48.0",
												0.13
										],
										[
												"v47.0",
												0.11
										],
										[
												"v43.0",
												0.17
										],
										[
												"v29.0",
												0.26
										]
								]
						},
						{
								name: "Firefox",
								id: "Firefox",
								data: [
										[
												"v58.0",
												1.02
										],
										[
												"v57.0",
												7.36
										],
										[
												"v56.0",
												0.35
										],
										[
												"v55.0",
												0.11
										],
										[
												"v54.0",
												0.1
										],
										[
												"v52.0",
												0.95
										],
										[
												"v51.0",
												0.15
										],
										[
												"v50.0",
												0.1
										],
										[
												"v48.0",
												0.31
										],
										[
												"v47.0",
												0.12
										]
								]
						},
						{
								name: "Internet Explorer",
								id: "Internet Explorer",
								data: [
										[
												"v11.0",
												6.2
										],
										[
												"v10.0",
												0.29
										],
										[
												"v9.0",
												0.27
										],
										[
												"v8.0",
												0.47
										]
								]
						},
						{
								name: "Safari",
								id: "Safari",
								data: [
										[
												"v11.0",
												3.39
										],
										[
												"v10.1",
												0.96
										],
										[
												"v10.0",
												0.36
										],
										[
												"v9.1",
												0.54
										],
										[
												"v9.0",
												0.13
										],
										[
												"v5.1",
												0.2
										]
								]
						},
						{
								name: "Edge",
								id: "Edge",
								data: [
										[
												"v16",
												2.6
										],
										[
												"v15",
												0.92
										],
										[
												"v14",
												0.4
										],
										[
												"v13",
												0.1
										]
								]
						},
						{
								name: "Opera",
								id: "Opera",
								data: [
										[
												"v50.0",
												0.96
										],
										[
												"v49.0",
												0.82
										],
										[
												"v12.1",
												0.14
										]
								]
						}
				]
            }
		}

	const gridBar = {
		chart: {
			type: 'bar'
		},
		title: {
			text: 'Historic World Population by Region'
		},
		xAxis: {
			categories: ['Prod Issue', 'Bug', 'Story', 'Task', 'Not Fixed'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				// text: 'Population (millions)',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			// valueSuffix: ' millions'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'left'
			// verticalAlign: 'top',
			// x: -40,
			// y: 80,
			// floating: true,
			// borderWidth: 1,
			// backgroundColor:
			// 	Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			// shadow: true
		},
		credits: {
			enabled: false
		},
		series: issueTypeChart
	};

	switch (chartType) {
		case 'Pie':
		  return pieCharts
		case 'GridBar': {
		  return gridBar
		}
		default:
		  break
	  }
}

function Charts(props) {

	// const {chartType} = state;
	const {dispatch, state, chartType, issueTypeChart} = props;
	console.log(chartType);
	console.log(issueTypeChart);
	
    const chartOptions = getChartOption({dispatch, state, chartType, issueTypeChart});


    return (
        <div>
            <HighchartsReact 
            highcharts={Highcharts}
            options={chartOptions}/>
        </div>
    );            
    
}



export default Charts;